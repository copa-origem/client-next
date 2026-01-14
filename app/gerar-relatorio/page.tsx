"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ArrowLeft, FileText, Download, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner" // ou a lib de toast que você usa

import { useSocket } from '@/hooks/useSocket';
import { useAuth } from "@/hooks/useAuth"

export default function GerarRelatorioPage() {
  const router = useRouter()
  
  // Estados de Auth e Socket
  const { user } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  
  // Estados da UI
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [problematicas, setProblematicas] = useState<any[]>([])

  // Estados do Filtro (Simplificado num objeto só)
  const [filters, setFilters] = useState({
    status: "",
    categoryId: "", // ID da categoria (UUID)
    startDate: "",
    endDate: ""
  })
  
  // Estado auxiliar só pra controlar o Select visual de nomes
  const [selectedCategoryName, setSelectedCategoryName] = useState("")

  // 1. Pegar Token JWT
  useEffect(() => {
    if (user) {
      user.getIdToken().then((t) => setToken(t));
    }
  }, [user]);

  const socket = useSocket(token);

  // 2. Escutar Socket
  useEffect(() => {
    if (!socket) return;

    socket.on('report_ready', (data: any) => {
      console.log('📩 Relatório pronto recebido:', data);
      setIsLoading(false);
      setPdfUrl(data.downloadUrl);
      toast.success("Relatório pronto para download!");
    });

    return () => {
      socket.off('report_ready');
    };
  }, [socket]);

  // 3. Buscar Problemáticas quando mudar a Categoria
  useEffect(() => {
    if (!selectedCategoryName) return;

    const fetchCategoryData = async () => {
      try {
        // Assume que sua API busca pelo nome, ex: /categories/Infraestrutura Urbana
        // EncodeURIComponent garante que espaços não quebrem a URL
        const res = await fetch(`https://api.alertacidadaoapi.com/categories/${encodeURIComponent(selectedCategoryName)}`)
        
        if (!res.ok) throw new Error("Falha ao buscar categoria");
        
        const categoryData = await res.json(); 
        // O retorno depende da sua API. Assumindo que retorna um objeto ou array.
        // Se retornar array, pega o primeiro.
        const category = Array.isArray(categoryData) ? categoryData[0] : categoryData;

        if (category) {
          // Atualiza o filtro com o ID real da categoria (UUID)
          setFilters(prev => ({ ...prev, categoryId: category.id }));
          
          // Popula o segundo select
          if (category.issueTypes) {
            setProblematicas(category.issueTypes);
          }
        }

      } catch (error) {
        console.error("Erro ao buscar dados da categoria:", error);
      }
    }

    fetchCategoryData();
  }, [selectedCategoryName]);

  // 4. Enviar Pedido
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // Impede recarregar a página
    
    if (!token) {
      toast.error("Você precisa estar logado.");
      return;
    }

    try {
      setIsLoading(true);
      setPdfUrl(null); // Limpa PDF anterior

      // Limpa campos vazios antes de enviar
      const filtersToSend = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "")
      );

      const response = await fetch('https://api.alertacidadaoapi.com/reports/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ filters: filtersToSend }) // Corrigido typo stringfy
      });

      if (response.ok) {
        toast.info('Solicitação enviada! Aguardando processamento...', { duration: 5000 });
      } else {
        toast.error('Erro ao solicitar relatório');
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error('Erro de conexão com o servidor');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b bg-card px-4 py-4">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Gerar Relatório</h1>
            <p className="text-sm text-muted-foreground">Configure os filtros e gere seu relatório</p>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-6">
        <div className="mx-auto max-w-2xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filtros do Relatório</CardTitle>
              <CardDescription>Selecione os critérios para filtrar as ocorrências.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* 1. STATUS */}
                <div className="space-y-2">
                  <Label htmlFor="status">Status da Ocorrência</Label>
                  <Select 
                    value={filters.status} 
                    onValueChange={(val) => {
                      const novoStatus = val === "ALL" ? "" : val;
                      setFilters({...filters, status: novoStatus});                  
                    }}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Todos os status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">Todos</SelectItem>
                      <SelectItem value="OPEN">Abertos</SelectItem>
                      <SelectItem value="SOLVED">Resolvidos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 2. CATEGORIA (SETORES) */}
                <div className="space-y-2">
                  <Label>Setor Impactado</Label>
                  <Select 
                    value={selectedCategoryName} 
                    onValueChange={(val) => setSelectedCategoryName(val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o setor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Espaços Públicos">Espaços Públicos</SelectItem>
                      <SelectItem value="Infraestrutura Urbana">Infraestrutura Urbana</SelectItem>
                      <SelectItem value="Mobilidade e Transporte">Mobilidade e Transporte</SelectItem>
                      <SelectItem value="Saneamento e Meio Ambiente">Saneamento e Meio Ambiente</SelectItem>
                      <SelectItem value="Segurança e Cidadania">Segurança e Cidadania</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 3. PROBLEMÁTICAS (Opcional - só mostra se tiver issues carregadas) */}
                {/* Nota: Seu backend atual filtra por Categoria ID, mas se quiser filtrar por IssueType específico teria que ajustar o back.
                    Vou deixar aqui apenas visual ou se quiser expandir o filtro depois. */}
                {problematicas.length > 0 && (
                   <div className="p-2 bg-muted rounded text-xs text-muted-foreground">
                      {problematicas.length} tipos de problemas encontrados nesta categoria.
                      (O relatório filtrará por toda a categoria).
                   </div>
                )}

                {/* 4. DATAS */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Data Início</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={filters.startDate}
                      onChange={(e) => {
                      const dataInicio = e.target.value === "ALL" ? "" : e.target.value;
                      setFilters({...filters, startDate: dataInicio}); 
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">Data Fim</Label>
                    <Input 
                      id="endDate" 
                      type="date" 
                      value={filters.endDate} 
                      onChange={(e) => {
                        const endDateNew = e.target.value === "ALL" ? "" : e.target.value;
                        setFilters({...filters, endDate: endDateNew}); 
                      }} 
                    />
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processando no Servidor...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-5 w-5" />
                      Solicitar Relatório
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* PREVIEW DO PDF */}
          {pdfUrl && (
            <Card className="animate-in fade-in slide-in-from-bottom-4">
              <CardHeader>
                <CardTitle className="text-green-600 flex items-center gap-2">
                   Sucesso!
                </CardTitle>
                <CardDescription>Seu relatório foi gerado e está pronto.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-[8.5/11] w-full overflow-hidden rounded-lg border bg-muted shadow-sm">
                  <iframe src={pdfUrl} className="h-full w-full" title="Preview" />
                </div>
                <Button asChild size="lg" className="w-full bg-green-600 hover:bg-green-700">
                  <a href={pdfUrl} download="relatorio_banger.pdf">
                    <Download className="mr-2 h-5 w-5" />
                    Baixar Arquivo Agora
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}