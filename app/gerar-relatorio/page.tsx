"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, FileText, Download, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function GerarRelatorioPage() {
  const router = useRouter()
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [status, setStatus] = useState("")
  const [categoria, setCategoria] = useState("")
  const [dataInicio, setDataInicio] = useState("")
  const [dataFim, setDataFim] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!status) {
      alert("Por favor, selecione um status")
      return
    }

    console.log("[v0] Generating report with filters:", { status, categoria, dataInicio, dataFim })
    setIsLoading(true)

    try {
      const response = await fetch("/reports/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          categoria,
          dataInicio,
          dataFim,
        }),
      })

      const data = await response.json()

      if (data.pdfUrl) {
        setPdfUrl(data.pdfUrl)
      }
    } catch (error) {
      console.error("[v0] Error generating report:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header with back button */}
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
          {/* Filters Form */}
          <Card>
            <CardHeader>
              <CardTitle>Filtros do Relatório</CardTitle>
              <CardDescription>Selecione os critérios para gerar o relatório de ocorrências</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Status Filter */}
                <div className="space-y-2">
                  <Label htmlFor="status">Status da Ocorrência *</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="abertos">Abertos</SelectItem>
                      <SelectItem value="resolvidos">Resolvidos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Category Filter */}
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria (opcional)</Label>
                  <Select value={categoria} onValueChange={setCategoria}>
                    <SelectTrigger id="categoria">
                      <SelectValue placeholder="Todas as categorias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todas</SelectItem>
                      <SelectItem value="buraco-via">Buraco na via</SelectItem>
                      <SelectItem value="iluminacao">Iluminação pública</SelectItem>
                      <SelectItem value="lixo">Acúmulo de lixo</SelectItem>
                      <SelectItem value="calcada">Calçada danificada</SelectItem>
                      <SelectItem value="sinalizacao">Sinalização</SelectItem>
                      <SelectItem value="vazamento">Vazamento</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Range */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="dataInicio">Data Início (opcional)</Label>
                    <Input
                      id="dataInicio"
                      type="date"
                      value={dataInicio}
                      onChange={(e) => setDataInicio(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dataFim">Data Fim (opcional)</Label>
                    <Input id="dataFim" type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Gerando Relatório...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-5 w-5" />
                      Gerar Relatório
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* PDF Preview/Download Section */}
          {pdfUrl && (
            <Card>
              <CardHeader>
                <CardTitle>Relatório Gerado</CardTitle>
                <CardDescription>Seu relatório está pronto para download</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* PDF Preview */}
                <div className="aspect-[8.5/11] w-full overflow-hidden rounded-lg border bg-muted">
                  <iframe src={pdfUrl} className="h-full w-full" title="Preview do Relatório" />
                </div>

                {/* Download Button */}
                <Button asChild size="lg" className="w-full">
                  <a href={pdfUrl} download="relatorio-ocorrencias.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-5 w-5" />
                    Baixar Relatório PDF
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
