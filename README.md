# Portfolio - Breno Oliveira

Portfolio pessoal construído com React, Vite e Tailwind CSS. O site apresenta perfil profissional, redes sociais, tecnologias, experiência, projetos públicos do GitHub, um terminal interativo e um formulário de contato.

O visual segue o hub [obrenin-hub](https://github.com/BrenoOl1veira/obrenin-hub): fundo escuro com grade de pontos, acento laranja, fonte em pixel (Silkscreen), sombras deslocadas e o bichinho em pixel andando no topo. Os tokens de cor ficam em `tailwind.config.js` e em `:root` no `src/index.css`.

## Requisitos

- Node.js 20.19+ ou 22.12+ (exigido pelo Vite 8)
- npm 9 ou superior

## Executar localmente

```bash
npm install
npm run dev
```

Para validar antes de publicar:

```bash
npm run lint
npm run build
npm run preview
```

## Estrutura do projeto

```text
src/
  assets/       Imagens, ícones e arquivos estáticos importados pelo React
  components/   Seções visuais da página, bichinho (Critter), terminal e ícones em pixel
  config/       Dados públicos do proprietário, redes sociais e integrações
  constants/    Conteúdo estático (tecnologias, experiência, ícones em pixel e fallbacks)
  hoc/          Wrapper compartilhado que cria as âncoras das seções
  i18n/         Provider de idioma e textos em inglês/português
  services/     Acesso e adaptação de respostas de serviços externos
  utils/        Utilitário do currículo
```

### Redes sociais

As redes (TikTok, YouTube, Instagram, LinkedIn, GitHub) ficam em `portfolioConfig.social`, e o e-mail em `portfolioConfig.email`. Elas aparecem na seção "Me segue", no rodapé e no comando `links` do terminal. Para adicionar uma rede, inclua-a em `social` e desenhe um ícone 9x9 com a mesma chave em `pixelIcons` (`src/constants/index.js`).

## Pontos de manutenção

### Dados do proprietário

Edite `src/config/portfolio.js` para alterar nome, e-mail, perfis sociais, usuário do GitHub ou a origem dos currículos. Não duplique esses dados em componentes.

### Projetos do GitHub

`src/services/github.js` busca os repositórios públicos não derivados do usuário configurado. O serviço normaliza a resposta da API para o formato usado pela interface e prioriza repositórios por estrelas, forks e atualização. Em caso de indisponibilidade da API, o site exibe os itens de fallback em `src/constants/index.js`.

Para associar uma imagem ou tags específicas a um repositório, adicione ou edite sua entrada em `projectOverrides` no mesmo arquivo. A chave deve ser exatamente o nome do repositório no GitHub.

### Idiomas e conteúdo

Todos os textos de interface ficam em `src/i18n/translations.js`. Para adicionar um idioma, crie uma entrada com a mesma estrutura de `en-US`, depois atualize o seletor de idiomas em `src/components/Navbar.jsx`.

Experiências, tecnologias e projetos de fallback ficam em `src/constants/index.js`; atualize esse conteúdo sem misturar lógica de interface.

### Formulário de contato

Sem configuração, o formulário abre o cliente de e-mail do visitante e continua funcional. Para enviar diretamente pelo EmailJS, copie `.env.example` para `.env.local` e preencha os identificadores públicos:

```text
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

O arquivo `.env.local` não deve ser versionado. Variáveis `VITE_*` são públicas no bundle do navegador, portanto não use chaves privadas ou credenciais sensíveis.

### Currículo

O botão de currículo busca o arquivo LaTeX no repositório e branch definidos em `portfolioConfig.resume`, então solicita a compilação do PDF via LatexOnline. Mantenha os caminhos e a branch sincronizados com o repositório de currículos. Se essa dependência externa falhar, a interface informa o erro ao visitante.

## Convenções

- Componentes cuidam de apresentação e interação local.
- Integrações HTTP ficam em `src/services`, nunca embutidas em JSX.
- Dados configuráveis ficam em `src/config`; conteúdo estático fica em `src/constants` ou `src/i18n`.
- Comentários explicam decisões, contratos externos e comportamentos não óbvios. Evite comentários que apenas repitam o código.
- Antes de abrir uma PR ou publicar, execute `npm run lint` e `npm run build`.
