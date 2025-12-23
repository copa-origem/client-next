"use client"

import { FileText, MapPin, Calendar, Trash2, Edit, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BottomNav } from "@/components/bottom-nav"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

import { useAuth } from "../../hooks/useAuth"; 

export default function MyReportsPage() {
  const [reports, setReports] = useState([])
  const { user } = useAuth()
  const hasReports = reports.length > 0
  const router = useRouter()

  function handleClickDetails(lat, lng) {
    router.push(`/explorar?lat=${lat}&lng=${lng}`)
  }

  console.log(user);

  useEffect(() => {
    if (!user) return

    const fetchProblems = async () => {
      try {
          const res = await fetch(`/api/problems/my-problems`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${user.accessToken}`,
            },
          }
          );
          const data = await res.json();
          setReports(data);
      } catch (error) {
          console.error("Erro ao buscar problemas:", error);
      }
    };

    fetchProblems();
  }, [user]);

  const handleDelete = async (id: number) => {
    try {
      console.log(id);
      const res = await fetch(`/api/problems/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.accessToken}`,
        },
      })

      alert("Problema deletado com sucesso!")
      setReports(reports.filter((report) => report.id !== id))
    } catch (error) {
      console.error("Erro ao deletadar problema:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em Análise":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20"
      case "Resolvido":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
      case "Pendente":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
        <div className="container mx-auto flex h-16 items-center px-4">
          <h1 className="text-lg font-semibold">Minhas Ocorrências</h1>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 pb-24">
        <div className="container mx-auto max-w-4xl">
          {!user ? (
            // Not logged in state
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
              <FileText className="mb-4 h-16 w-16 text-muted-foreground" />
              <h2 className="mb-2 text-2xl font-bold">Faça login para ver suas ocorrências</h2>
              <p className="mb-6 text-muted-foreground">
                Você precisa estar logado para acessar suas denúncias registradas
              </p>
              <div className="flex gap-3">
                <Button asChild>
                  <Link href="/entrar">Fazer Login</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/registro">Criar Conta</Link>
                </Button>
              </div>
            </div>
          ) : !hasReports ? (
            // No reports state
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
              <FileText className="mb-4 h-16 w-16 text-muted-foreground" />
              <h2 className="mb-2 text-2xl font-bold">Nenhuma ocorrência registrada</h2>
              <p className="mb-6 text-muted-foreground">
                Você ainda não registrou nenhuma denúncia. Comece agora a fazer a diferença!
              </p>
              <Button size="lg" asChild>
                <Link href="/nova-denuncia">Registrar Primeira Denúncia</Link>
              </Button>
            </div>
          ) : (
            // Has reports state
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {reports.length} {reports.length === 1 ? "ocorrência registrada" : "ocorrências registradas"}
                </p>
                <Button asChild>
                  <Link href="/nova-denuncia">
                    <FileText className="mr-2 h-4 w-4" />
                    Nova Denúncia
                  </Link>
                </Button>
              </div>

              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/3">
                        <img
                          src={report.imageUrl || "/placeholder.svg"}
                          alt={report.title}
                          className="h-48 w-full object-cover sm:h-full"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="mb-3 flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="mb-1 text-lg font-semibold">{report.title}</h3>
                            <Badge variant="outline" className={getStatusColor(report.status)}>
                              {report.description}
                            </Badge>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(report.id)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span>{report.issueType.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>lng {report.longitude} | lat{report.latitude}</span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <Button onClick={() => handleClickDetails(report.latitude, report.longitude)} variant="outline" size="sm">
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
