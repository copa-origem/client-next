# 📢 [Alerta Cidadão]

![Next.js Badge](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Status Badge](https://img.shields.io/badge/STATUS-ONLINE-brightgreen?style=for-the-badge)

> Uma plataforma de denúncia cidadã para conectar a comunidade e o poder público, facilitando o reporte de irregularidades urbanas.

---

## 🔗 Acesse o Projeto

🟢 **Aplicação no ar:** [https://client-next-beta.vercel.app/](https://client-next-beta.vercel.app/)

---

## 📱 O Projeto

O Alerta Cidadão nasceu da necessidade de simplificar a comunicação entre os moradores e a prefeitura. Muitas vezes, um buraco na rua, falta de iluminação ou acúmulo de lixo demoram a ser resolvidos por falta de um canal ágil de notificação.

Com esta aplicação, o usuário pode:
1.  **Registrar** uma ocorrência em tempo real.
2.  **Anexar fotos** da irregularidade.
3.  **Localizar** o problema no mapa (Geolocalização).
4.  **Acompanhar** o status da denúncia.

## 📸 Screenshots

| Mobile - Home | Mobile - Nova Denúncia | Desktop - Mapa |
|:---:|:---:|:---:|
| ![Home](./public/home_mobile.jpeg) | ![Form](./public/form_mobile.jpeg) | ![Map](./public/map.jpg) |

## 🛠️ Tecnologias Utilizadas

O front-end foi construído focando em **performance** e **SEO**, utilizando o poder do ecossistema React.

- **[Next.js](https://nextjs.org/)** - Framework React para produção (SSR/SSG).
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para maior segurança no código.
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilização utilitária e responsiva.
- **[Google Maps API]** - Para visualização dos pontos no mapa. 
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento performático de formulários.
- **[Zod](https://zod.dev/)** - Validação de dados (schema validation).
- **[Fetch]** - Comunicação com a API.

## ⚙️ Funcionalidades Técnicas

- [x] **Server-Side Rendering (SSR):** Carregamento rápido das denúncias recentes.
- [x] **Responsividade:** Layout totalmente adaptável para celulares e tablets.
- [x] **Integração com API:** Consumo de endpoints RESTful para envio e leitura de dados.

## 🚀 Como rodar localmente

Se você deseja contribuir ou testar o código na sua máquina:

1. Clone o repositório:
```bash
git clone https://github.com/copa-origem/client-next.git
```

2. Instale as dependências:
```bash
cd client-next
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:  
Crie um arquivo .env.local na raiz do projeto e adicione as chaves necessárias, que são as de um console do firebase de um projeto.
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_API_KEY=
NEXT_PUBLIC_AUTH_DOMAIN=
NEXT_PUBLIC_PROJECT_ID=
NEXT_PUBLIC_STORAGE_BUCKET=
NEXT_PUBLIC_MESSAGING_SENDER_ID=
NEXT_PUBLIC_APP_ID=
```

4. Rode o servidor de desenvolvimento:
```bash
npm run dev
```

Abra http://localhost:3000 no seu navegador.

## 🤝 Contribuição
Este é um projeto de código aberto com foco em Civic Tech. Sugestões e Pull Requests são muito bem-vindos para ajudarmos a criar cidades melhores
1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (git checkout -b feature/incrivelFeature)
3. Faça o Commit (git commit -m 'Add some IncrivelFeature')
4. Faça o Push (git push origin feature/IncrivelFeature)
5. Abra um Pull Request

## 🏗️ Arquitetura e Backend

O Front-end (este repositório) consome uma API RESTful desenvolvida em Node.js.

Atualmente, o backend utiliza **Express**, focado na agilidade de entrega do MVP (Produto Mínimo Viável).
> 🚧 **Roadmap:** Está planejada a migração da API para **NestJS** visando maior escalabilidade e padronização arquitetural (Design Patterns e Injeção de Dependência).

🔗 **Acesse o repositório da API:** [[Link da api](https://github.com/copa-origem/api-consumo)]

<p align="center">
Feito com 💜 por <a href="https://www.linkedin.com/in/rafael-rangel1/" target="_blank">Rafael Silva Rangel</a> visando uma cidade melhor.
</p>

<p align="center">
Feito com 💜 por Daniel Mendonça das Virgens visando uma cidade melhor.
</p>

<p align="center">
Feito com 💜 por Rafhael Andrade visando uma cidade melhor.
</p>