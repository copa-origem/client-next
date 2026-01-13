import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle, FileText, HelpCircle, Info } from "lucide-react"

export function ActionButtons() {
  return (
    <div className="mt-8 flex w-full max-w-md flex-col gap-4">
      <Button variant="outline" size="lg" className="h-14 text-base font-semibold bg-transparent" asChild>
        <Link href="/conheca-o-projeto">
          <Info className="mr-2 h-5 w-5" />
          Conheça o Projeto
        </Link>
      </Button>

      <Button size="lg" className="h-20 text-lg font-bold tracking-tight" asChild>
        <Link href="/nova-denuncia">
          <AlertCircle className="mr-2 h-5 w-5" />
          Registrar Nova Denúncia
        </Link>
      </Button>

      <Button variant="outline" size="lg" className="h-14 text-base font-semibold bg-transparent" asChild>
        <Link href="/gerar-relatorio">
          <FileText className="mr-2 h-5 w-5" />
          Gerar Relatório
        </Link>
      </Button>

      <Button variant="outline" size="lg" className="h-14 text-base font-semibold bg-transparent" asChild>
        <Link href="/ajuda">
          <HelpCircle className="mr-2 h-5 w-5" />
          Ajuda
        </Link>
      </Button>
    </div>
  )
}
