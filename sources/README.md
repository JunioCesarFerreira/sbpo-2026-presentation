# Origem dos materiais

Importação local em 22 de setembro de 2026, a partir dos repositórios vizinhos:

| Origem | Destino | Uso |
| --- | --- | --- |
| `SBPO-2026-Beamer-Theme/main.tex` | `sources/beamer/main.tex` | Referência de conteúdo, equações, ordem e notas |
| `SBPO-2026-Beamer-Theme/roteiro.md` | `sources/beamer/roteiro.md` | Roteiro de referência, com numeração anterior ao slide de fluxo |
| `SBPO-2026-Beamer-Theme/img/*.png` | `site/assets/img/` e `sources/beamer/img/` | Figuras da apresentação e cópia compilável do Beamer |
| `wsn-milp/wsn-mobile/output/routes.gif` | `site/assets/media/routes.gif` | Rotas com alcance dos nós fixos |
| `wsn-milp/wsn-mobile/output/routes2.gif` | `site/assets/media/routes2.gif` | Rotas com alcance dos nós móveis |

As duas animações têm 60 quadros e resolução de 1000 × 800. Os arquivos `routes-poster.png` e `routes2-poster.png` são conversões do primeiro quadro de cada GIF, usadas antes da reprodução e na impressão. Os GIFs e as quatro figuras foram copiados sem alteração. O recorte dos painéis superiores de Pareto é feito apenas na exibição via CSS, como no LaTeX.

O diagrama TikZ de fluxo foi reconstruído como SVG acessível no slide 10. As aberturas de seção foram mantidas. A demonstração do alcance dos nós móveis ocupa o slide 16, após a instância experimental. A demonstração do alcance dos nós fixos permanece ao final, no slide 24.

As notas e os números foram transcritos do material de origem. Os experimentos não foram reexecutados. Os GIFs ilustram o exemplo mobile do MILP; não representam pacotes simulados no Cooja nem comprovam, por si só, os resultados operacionais do artigo.

O conteúdo web é editado em `site/slides.js`; não há sincronização automática com o LaTeX. Atualize-o ao revisar os slides de origem.
