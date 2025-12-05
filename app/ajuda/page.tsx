import { ArrowLeft, FileText, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

export default function HelpPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="ml-4 text-lg font-semibold">Ajuda</h1>
        </div>
      </header>

      <main className="flex-1 px-4 py-8 pb-24">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold">Como usar a aplicação</h2>
            <p className="text-muted-foreground">Guia passo a passo para reportar ocorrências ambientais</p>
          </div>

          {/* Step by Step Guide */}
          <div className="mb-12 space-y-6">
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold">Crie sua conta</h3>
              </div>
              <div className="ml-13 space-y-2 text-muted-foreground">
                <p>• Clique em "Criar Conta" na página inicial</p>
                <p>• Preencha seus dados: nome, e-mail e senha</p>
                <p>• Confirme seu e-mail para ativar a conta</p>
              </div>
              <div className="ml-13 mt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/registro">
                    <User className="mr-2 h-4 w-4" />
                    Ir para Registro
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-primary/20 bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold">Registre uma ocorrência</h3>
              </div>
              <div className="ml-13 space-y-2 text-muted-foreground">
                <p>• Clique no botão "Registrar Nova Denúncia"</p>
                <p>• Selecione o tipo de ocorrência (poluição, desmatamento, etc.)</p>
                <p>• Adicione fotos para documentar o problema</p>
                <p>• Descreva detalhadamente o que você observou</p>
                <p>• Marque a localização no mapa</p>
                <p>• Envie seu reporte para revisão</p>
              </div>
              <div className="ml-13 mt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/nova-denuncia">
                    <FileText className="mr-2 h-4 w-4" />
                    Registrar Denúncia
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-primary/20 bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold">Explore outras ocorrências</h3>
              </div>
              <div className="ml-13 space-y-2 text-muted-foreground">
                <p>• Use a aba "Explorar" para ver reportes da comunidade</p>
                <p>• Filtre por tipo de ocorrência ou localização</p>
                <p>• Veja detalhes, fotos e localização no mapa</p>
                <p>• Acompanhe o status de resolução</p>
              </div>
              <div className="ml-13 mt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/explorar">
                    <Search className="mr-2 h-4 w-4" />
                    Explorar Agora
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-primary/20 bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  4
                </div>
                <h3 className="text-xl font-semibold">Acompanhe suas denúncias</h3>
              </div>
              <div className="ml-13 space-y-2 text-muted-foreground">
                <p>• Acesse "Minhas Ocorrências" para ver seus reportes</p>
                <p>• Acompanhe o status de cada denúncia</p>
                <p>• Receba notificações sobre atualizações</p>
                <p>• Edite ou adicione informações quando necessário</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-8">
            <h3 className="mb-6 text-2xl font-bold">Perguntas Frequentes</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Preciso criar uma conta para reportar?</AccordionTrigger>
                <AccordionContent>
                  Sim, é necessário criar uma conta para registrar denúncias. Isso ajuda a manter a qualidade dos
                  reportes e permite que você acompanhe o status de suas denúncias.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Quanto tempo leva para uma denúncia ser analisada?</AccordionTrigger>
                <AccordionContent>
                  As denúncias são revisadas em até 48 horas pela nossa equipe de moderação. Casos urgentes podem ser
                  priorizados.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Posso fazer reportes anônimos?</AccordionTrigger>
                <AccordionContent>
                  Seus dados pessoais não são compartilhados publicamente, mas é necessário estar cadastrado para
                  garantir a veracidade das informações.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Como adiciono fotos ao meu reporte?</AccordionTrigger>
                <AccordionContent>
                  Durante o processo de registro de denúncia, você pode clicar no botão de câmera para tirar uma foto
                  diretamente ou fazer upload de imagens do seu dispositivo.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>O que acontece após eu fazer um reporte?</AccordionTrigger>
                <AccordionContent>
                  Após a revisão, sua denúncia é publicada na plataforma e enviada às autoridades competentes. Você
                  receberá atualizações sobre o progresso da resolução.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Contact Support */}
          <div className="rounded-lg border border-border bg-muted/50 p-6 text-center">
            <h3 className="mb-2 text-xl font-semibold">Ainda precisa de ajuda?</h3>
            <p className="mb-4 text-muted-foreground">
              Entre em contato com nossa equipe de suporte para assistência adicional
            </p>
            <Button>Contatar Suporte</Button>
          </div>
        </div>
      </main>
    </div>
  )
}
