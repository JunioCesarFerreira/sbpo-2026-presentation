# SBPO 2026 · Apresentação web

**Planejamento Discreto de Redes de Sensores com Nós Móveis via Programação Inteira Mista e Avaliação por Simulação** — Junio Cesar Ferreira, ICMC/USP.

Apresentação em português com 24 slides, navegação por teclado, tela cheia, índice, notas de fala e duas demonstrações animadas ao final. O conteúdo do Beamer foi adaptado para slides HTML em 16:9, mantendo as equações, figuras, dados e ressalvas científicas. Os repositórios de origem não são necessários para executar o site.

## Executar localmente

Requer Node.js 22 ou superior.

```sh
npm ci
npm run check
npm run build
npm start
```

Abra **http://127.0.0.1:4173**. Depois de gerar o site, também é possível abrir `dist/index.html` diretamente: os GIFs, as fontes e o renderizador de equações são locais. Guarde a pasta `dist` inteira para apresentar sem internet. Alterações em `site/` exigem executar novamente `npm run build`.

## Publicar no GitHub Pages

1. Envie os arquivos deste repositório para a branch `main` no GitHub.
2. Em **Settings → Pages → Build and deployment → Source**, selecione **GitHub Actions**.
3. Na aba **Actions**, acompanhe o workflow **Publicar apresentação no GitHub Pages**. Se o primeiro envio ocorreu antes da configuração do Pages, execute o workflow por **Run workflow**.

Após o primeiro deploy bem-sucedido, a URL esperada é:

**https://JunioCesarFerreira.github.io/sbpo-2026-presentation/**

O workflow `.github/workflows/pages.yml` valida o conteúdo, gera `dist/` e publica somente essa pasta. Novos envios para `main` atualizam o site. O deploy usa o `GITHUB_TOKEN` do Actions, sem um token pessoal.

Referência: [workflows personalizados do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Apresentar

| Tecla / controle | Ação |
| --- | --- |
| `→`, `↓`, espaço ou Page Down | Próximo slide |
| `←`, `↑`, Shift + espaço ou Page Up | Slide anterior |
| Home / End | Primeiro / último slide |
| `F` | Tela cheia, quando suportada pelo navegador |
| `O` | Índice de slides |
| `N` | Notas de fala do slide atual |
| `?` | Ajuda e impressão / PDF |
| Esc | Fechar janela aberta |
| Deslizar para os lados | Navegar em uma tela sensível ao toque |

Cada slide tem um link direto, por exemplo `#/23` para a primeira animação. As notas são exibidas na mesma tela: feche-as antes de projetar.

Os GIFs começam ao entrar nos slides de demonstração. **Pausar** congela o quadro exibido; **Reproduzir** e **Reiniciar** começam do início. Ao sair do slide, a animação é descarregada. Com a preferência de acessibilidade de movimento reduzido, as animações aguardam a ação **Reproduzir**. Na impressão, as animações aparecem como imagens estáticas.

O roteiro original soma 15 minutos, mas não contabiliza o exemplo ilustrativo de fluxo adicionado ao LaTeX nem as duas demonstrações. Reserve tempo adicional ou ajuste o ensaio. A versão web tem 16 slides de conteúdo, seis aberturas de seção e duas demonstrações.

## Editar

- `site/slides.js`: texto, equações LaTeX, ordem dos slides e notas.
- `site/styles.css`: layout, cores, proporção e impressão.
- `site/presentation.js`: navegação, atalhos, índice e controles de animação.
- `site/assets/img/`: quatro figuras originais do artigo.
- `site/assets/media/`: GIFs originais e imagens estáticas do primeiro quadro.
- `sources/beamer/`: cópia do LaTeX e do roteiro usados na adaptação; consulte [a origem dos arquivos](sources/README.md).

KaTeX é instalado pelo npm e copiado para `dist/assets/vendor/katex`, incluindo sua licença. Não há dependência de CDN nem de serviços externos durante a apresentação. Não é necessário compilar LaTeX para gerar ou publicar o site.

## Verificação

`npm run check` verifica conteúdo obrigatório, arquivos de mídia e sintaxe de todas as equações. `npm run test:browser` verifica navegação, links diretos, isolamento dos atalhos nas janelas, movimento reduzido, GIFs, ausência de estouro de conteúdo, modo offline e publicação em subdiretório. Gere `dist/` antes dos testes. Use um Chrome instalado ou instale Chromium com `npx playwright install chromium`.
