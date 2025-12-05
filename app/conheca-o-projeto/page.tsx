import { ArrowLeft, MapPin, Users, Building2, Target, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutProjectPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="ml-4 text-lg font-semibold">Conheça o Projeto</h1>
        </div>
      </header>

      <main className="flex-1 pb-6">
        {/* Hero Section */}
        <section className="bg-primary/10 px-4 py-12 text-center">
          <div className="container mx-auto max-w-3xl">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-primary/20 p-6">
                <MapPin className="h-16 w-16 text-primary" />
              </div>
            </div>
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-balance">Melhorando nossa cidade, juntos</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              Uma plataforma colaborativa para reportar e resolver problemas urbanos na sua comunidade
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="px-4 py-12">
          <div className="container mx-auto max-w-3xl">
            <div className="mb-8 flex items-center gap-3">
              <Target className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-bold">Nossa Missão</h3>
            </div>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              Capacitar cidadãos a identificar, reportar e resolver problemas urbanos através de uma plataforma
              acessível e colaborativa. Acreditamos que cada morador pode fazer a diferença na melhoria da nossa cidade
              e comunidade.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="bg-muted/30 px-4 py-12">
          <div className="container mx-auto max-w-4xl">
            <h3 className="mb-8 text-center text-2xl font-bold">Como Funciona</h3>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h4 className="mb-2 font-semibold">Reporte Facilmente</h4>
                <p className="text-sm text-muted-foreground">
                  Registre problemas urbanos com fotos, localização exata e descrição detalhada
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h4 className="mb-2 font-semibold">Engajamento Comunitário</h4>
                <p className="text-sm text-muted-foreground">
                  Veja o que outros estão reportando no seu bairro e apoie as denúncias
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <h4 className="mb-2 font-semibold">Impacto Real</h4>
                <p className="text-sm text-muted-foreground">
                  Seus reportes chegam às autoridades competentes para resolução dos problemas
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What You Can Report */}
        <section className="px-4 py-12">
          <div className="container mx-auto max-w-3xl">
            <h3 className="mb-8 text-center text-2xl font-bold">O Que Você Pode Reportar</h3>
            <div className="space-y-4">
              {[
                "Calçadas quebradas ou em mau estado",
                "Entulho ou lixo abandonado nas ruas",
                "Iluminação pública deficiente ou quebrada",
                "Buracos nas vias e asfalto danificado",
                "Vazamentos de água ou esgoto",
                "Pichações e depredação de patrimônio público",
                "Árvores caídas ou em risco de queda",
                "Falta de sinalização de trânsito",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary/10 px-4 py-12">
          <div className="container mx-auto max-w-2xl text-center">
            <h3 className="mb-4 text-2xl font-bold">Pronto para fazer a diferença?</h3>
            <p className="mb-6 text-muted-foreground">Junte-se à nossa comunidade e ajude a melhorar a cidade</p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/registro">Criar Conta</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/explorar">Explorar Ocorrências</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
