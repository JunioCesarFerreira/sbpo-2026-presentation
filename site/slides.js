/* Conteúdo adaptado de sources/beamer/main.tex. String.raw preserva o LaTeX. */
window.SLIDES = (() => {
  const html = String.raw;
  const section = (number, title, caption) => ({
    title, section: title, className: 'section-slide',
    content: `<div class="section-number">${number}</div><h2>${title}</h2><p class="section-caption">${caption}</p>`
  });
  const demo = (title, file, description, notes) => ({
    title, section: 'Demonstração', className: 'demo',
    content: `<div class="demo-layout">
      <div class="gif-viewport"><img data-gif="assets/media/${file}.gif" src="assets/media/${file}-poster.png" alt="Animação das rotas de comunicação: nós móveis percorrem suas trajetórias e os enlaces utilizados mudam ao longo de 60 períodos."><canvas hidden aria-hidden="true"></canvas></div>
      <div class="demo-sidebar"><p>${description}</p><ul class="demo-legend">
        <li><i class="swatch sink"></i>Sink</li><li><i class="swatch"></i>Fixo instalado</li><li><i class="swatch candidate"></i>Candidato não instalado</li><li><i class="swatch mobile"></i>Nó móvel</li><li><i class="swatch link"></i>Enlace com fluxo positivo</li>
      </ul><div class="media-controls"><button data-media-toggle aria-label="Pausar animação">Pausar</button><button data-media-restart>Reiniciar</button></div>
      <p class="small muted">Exemplo mobile · 60 períodos<br>Círculos tracejados: alcance de comunicação.</p></div>
    </div>`
  });
  return [
    {
      title: 'Planejamento discreto de redes de sensores com nós móveis', section: 'LVIII Simpósio Brasileiro de Pesquisa Operacional', className: 'cover',
      content: html`<div class="cover-line"></div><h1>Planejamento Discreto de Redes de Sensores com Nós Móveis</h1><p class="subtitle">Via Programação Inteira Mista e Avaliação por Simulação</p><p class="author">Junio Cesar Ferreira</p><p class="affiliation">Instituto de Ciências Matemáticas e de Computação · Universidade de São Paulo</p>`
    },
    {
      title: 'Roteiro da apresentação', section: 'Visão geral',
      content: html`<div class="agenda"><div class="agenda-item"><span>01</span>Apresentação e contexto</div><div class="agenda-item"><span>02</span>Definição do problema</div><div class="agenda-item"><span>03</span>Modelo MILP</div><div class="agenda-item"><span>04</span>Metodologia experimental</div><div class="agenda-item"><span>05</span>Resultados</div><div class="agenda-item"><span>06</span>Considerações finais</div></div><p class="small muted"></p>`
    },
    section('01', 'Apresentação e contexto da pesquisa', 'Planejamento de infraestrutura para projeto de redes de sensores com elementos móveis.'),
    {
      title: 'Apresentação e contexto da pesquisa', section: 'Contexto',
      content: html`<div class="two-col"><div><h3>Junio Cesar Ferreira</h3><p>Doutorando</p><p>Instituto de Ciências Matemáticas e de Computação (ICMC)<br>Universidade de São Paulo (USP)</p></div><div class="callout"><h3>Equipe de pesquisa</h3><ul><li>Júlio Cezar Estrella<br><span class="small muted">Orientador</span></li><li>Cláudio F. M. Toledo<br><span class="small muted">Coorientador</span></li><li>Alexandre C. B. Delbem<br><span class="small muted">Coorientador</span></li></ul></div></div><p>Como projetar redes de sensores sem fio quando parte dos elementos da rede apresenta mobilidade?</p>`
    },
    section('02', 'Definição do problema', 'Uma infraestrutura fixa para trajetórias conhecidas.'),
    {
      title: 'Conectividade para dispositivos em movimento', section: 'Problema',
      content: html`<div class="two-col problem-layout">
        <div class="problem-copy">
          <p><strong>Sensores em movimento</strong> precisam enviar dados a um ponto de coleta: o <strong>sink</strong>.</p>
          <p class="small muted">Robôs, veículos e dispositivos vestíveis são exemplos desse cenário.</p>
          <div class="callout"><h3>Onde instalar os nós fixos?</h3><p>Selecionar posições que viabilizem caminhos <strong>multi-hop</strong> ao longo das trajetórias, considerando a capacidade dos enlaces e o custo de instalação.</p></div>
        </div>
        <figure class="figure mobile-network">
          <img src="assets/img/rede-sensores-moveis.png" alt="Ilustração conceitual de um robô, um veículo e uma pessoa com sensor vestível em movimento. Enlaces em verde-azulado encaminham dados por nós fixos até um sink azul-escuro. Trajetórias aparecem em tracejado âmbar; quadrados vazios indicam posições candidatas.">
          <figcaption><div class="network-key"><span><i class="data-link" aria-hidden="true"></i>Fluxo de dados</span><span><i class="motion-path" aria-hidden="true"></i>Trajetórias</span><span><i class="candidate-site" aria-hidden="true"></i>Posições candidatas</span></div><span class="network-caption">Cenário conceitual · sensores móveis e infraestrutura fixa</span></figcaption>
        </figure>
      </div>`
    },
    {
      title: 'Definição do problema', section: 'Problema', className: 'compact',
      content: html`<div class="callout"><h3>Dados do problema</h3><p>Região \(\Omega\subset\mathbb{R}^2\), raio de comunicação \(R_{\text{com}}>0\), sink \(\sigma\in\Omega\) indexado por \(s\), posições candidatas \(Q=\{q_j\in\Omega\mid j\in\mathcal J\}\) e dispositivos móveis com trajetórias conhecidas \(\gamma_m:[0,H]\to\Omega\), \(m\in\mathcal M\).</p></div><p>O horizonte é discretizado em períodos \(t\in\mathcal T\). Em cada período:</p><div class="equation">\[G_t=(V,E_t),\qquad V=\{s\}\cup\mathcal J\cup\mathcal M\]\[E_t=\big\{(i,j)\in V\times V:0&lt;d_{ij}(t)\le R_{\mathrm{com}}\big\}.\]</div><div class="callout blue"><p>Selecionar \(P\subseteq Q\) para que, em cada período, a demanda dos móveis chegue ao sink por caminhos com capacidade suficiente.</p></div>`
    },
    section('03', 'Modelo MILP', 'Instalar nós, habilitar enlaces e encaminhar dados.'),
    {
      title: 'Variáveis de decisão', section: 'Modelo MILP',
      content: html`<div class="cards"><article class="card"><span class="tag">INFRAESTRUTURA</span><div class="symbol">\(y_j\)</div><h3>Instalação de nós fixos</h3><p>\(y_j\in\{0,1\}\), para cada \(j\in\mathcal J\).</p><p>Vale 1 se a posição recebe um nó fixo; 0, caso contrário.</p><p class="small muted">Compartilhada por todos os períodos.</p></article><article class="card"><span class="tag">CONECTIVIDADE</span><div class="symbol">\(z_{ij}(t)\)</div><h3>Habilitação de enlaces</h3><p>\(z_{ij}(t)\in\{0,1\}\), para \((i,j)\in E_t\).</p><p>Indica se o arco está habilitado no período \(t\).</p><p class="small muted">Pode variar ao longo do tempo.</p></article><article class="card"><span class="tag">ROTEAMENTO</span><div class="symbol">\(x_{ij}(t)\)</div><h3>Fluxo de dados</h3><p>\(x_{ij}(t)\ge 0\).</p><p>Quantidade de dados encaminhada pelo arco \((i,j)\) no período \(t\).</p><p class="small muted">Pode variar ao longo do tempo.</p></article></div>`
    },
    /*{
      title: 'Exemplo ilustrativo do fluxo', section: 'Modelo MILP',
      content: html`<svg class="flow-diagram" viewBox="0 0 1050 380" role="img" aria-labelledby="flow-title flow-desc"><title id="flow-title">Dois caminhos dos móveis até o sink</title><desc id="flow-desc">O móvel gama 1 envia fluxo 1 por p1 até o sink. O móvel gama 2 envia fluxo 2 por p2 até o sink. Linhas tracejadas representam enlaces não utilizados.</desc><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10Z" fill="#007b70"/></marker></defs><g stroke="#b7c4cc" stroke-width="2" stroke-dasharray="7 7"><path d="M315 190H735M185 55 735 190M865 55 315 190" fill="none"/></g><g stroke="#007b70" stroke-width="4" marker-end="url(#arrow)" fill="none"><path d="M200 74 299 171"/><path d="M334 206 505 321"/><path d="M848 73 754 171"/><path d="M716 205 546 321"/></g><g fill="#efc27c" stroke="#ac7c33" stroke-width="2"><circle cx="185" cy="55" r="23"/><circle cx="865" cy="55" r="23"/></g><g fill="#bdd4e4" stroke="#54768e" stroke-width="2"><circle cx="315" cy="190" r="23"/><circle cx="735" cy="190" r="23"/></g><circle cx="525" cy="337" r="24" fill="#e0e6eb" stroke="#677d8a" stroke-width="2"/><text x="134" y="43">γ₁</text><text x="900" y="43">γ₂</text><text x="277" y="235">p₁</text><text x="754" y="235">p₂</text><text x="566" y="345">σ (sink)</text><text class="flow-value" x="254" y="99">xₘ₁,ₚ₁(t) = 1,0</text><text class="flow-value" x="618" y="99">xₘ₂,ₚ₂(t) = 2,0</text><text class="flow-value" x="283" y="310">xₚ₁,ₛ(t) = 1,0</text><text class="flow-value" x="630" y="310">xₚ₂,ₛ(t) = 2,0</text></svg><div class="legend"><span><i class="mobile"></i>Móvel</span><span><i></i>Fixo</span><span><i class="sink"></i>Sink</span></div><p class="small muted" style="text-align:center">Cada seta indica um enlace utilizado e seu fluxo \(x_{ij}(t)\). Linhas tracejadas: enlaces não utilizados.</p>`
    },*/
    {
      title: 'Função objetivo e capacidade dos enlaces', section: 'Modelo MILP', className: 'math-slide',
      content: html`<p>A função objetivo combina custo de instalação e custo de encaminhamento:</p><div class="equation">\[\min_{y,z,x}\quad \underbrace{w\sum_{j\in\mathcal J}y_j}_{\text{instalação}}+\underbrace{\sum_{t\in\mathcal T}\sum_{(i,j)\in E_t}e_{ij}(t)x_{ij}(t)}_{\text{encaminhamento}},\qquad e_{ij}(t)=d_{ij}(t)^2.\]</div><p>A capacidade aproximada de cada enlace é dada por:</p><div class="equation">\[C_{ij}(t)=C_0\left[\max\left\{0,\,1-k_{\mathrm{decay}}\frac{d_{ij}(t)}{R_{\mathrm{com}}}\right\}\right]^2.\]</div><div class="callout"><p class="small">\(C_0\): capacidade nominal máxima &nbsp; · &nbsp; \(k_{\mathrm{decay}}\): atenuação com a distância<br>\(w=10^6\): peso da instalação nos experimentos.</p></div>`
    },
    {
      title: 'Restrições do modelo', section: 'Modelo MILP', className: 'compact',
      content: html`<div class="two-col"><div><h3>Instalação e capacidade</h3><p class="small muted">Para cada arco e período:</p><div class="equation">\[\begin{aligned}z_{ij}(t)&\le y_i &&\text{se }i\in\mathcal J,\\z_{ij}(t)&\le y_j &&\text{se }j\in\mathcal J,\\0\le x_{ij}(t)&\le C_{ij}(t)z_{ij}(t).\end{aligned}\]</div><div class="callout"><p class="small">Fluxo positivo exige um enlace habilitado e capacidade suficiente.</p></div></div><div><h3>Conservação de fluxo</h3><p class="small muted">Para cada \(i\in V\) e \(t\in\mathcal T\):</p><div class="equation">\[\sum_{j:(i,j)\in E_t}x_{ij}(t)-\sum_{j:(j,i)\in E_t}x_{ji}(t)=\beta_i(t),\]\[\beta_i(t)=\begin{cases}b_{i,t},&i\in\mathcal M,\\0,&i\in\mathcal J,\\-\sum_{m\in\mathcal M}b_{m,t},&i=s.\end{cases}\]</div></div></div><p>O sink apenas recebe: \(x_{si}(t)=z_{si}(t)=0\).</p>`
    },
    section('04', 'Metodologia experimental', 'Da solução matemática à avaliação por simulação.'),
    {
      title: 'Metodologia experimental', section: 'Metodologia',
      content: html`<div class="two-col"><ol><li>Resolver o MILP com <strong>Gurobi</strong>, variando capacidade, atenuação e demanda.</li><li>Agrupar soluções que instalam o <strong>mesmo subconjunto</strong> de posições candidatas.</li><li>Compatibilizar as topologias com a campanha em <strong>Cooja/Contiki-NG</strong>.</li></ol><table><thead><tr><th>Parâmetro</th><th>Valores avaliados</th></tr></thead><tbody><tr><td>\(C_0\)</td><td>\(10,110,\ldots,1010\)</td></tr><tr><td>\(k_{\mathrm{decay}}\)</td><td>0,90; 0,75; 0,50; 0,25; 0,10</td></tr><tr><td>\(B=b_{m,t}\)</td><td>\(1,3,\ldots,99\)</td></tr></tbody></table></div><div class="callout"><p class="small">A varredura de \(B\) é interrompida na primeira configuração inviável para cada par \((C_0,k_{\mathrm{decay}})\).</p></div>`
    },
    {
      title: 'Instância experimental', section: 'Metodologia',
      content: html`<div class="two-col wide-figure"><div class="stack"><div class="metrics"><div class="metric"><strong>30</strong><span>posições candidatas</span></div><div class="metric"><strong>6</strong><span>nós móveis</span></div></div><ul><li>Região de \(400\times200\) m.</li><li>Um sink fixo e trajetórias predefinidas.</li><li>Comunicação: <strong>50 m</strong>.</li><li>Interferência na simulação: <strong>90 m</strong>.</li></ul></div><figure class="figure instance"><img src="assets/img/instancia.png" alt="Instância em região de 400 por 200 metros: candidatos em quadrados, sink em estrela e trajetórias dos seis móveis em verde."></figure></div>`
    },
    demo('Rotas de comunicação · alcance dos nós móveis', 'routes2', 'Os enlaces utilizados mudam ao longo do movimento dos dispositivos.', 'Demonstração adicional. Fonte: wsn-milp/wsn-mobile/output/routes2.gif. Os círculos pretos acompanham o alcance dos móveis. Mostre como os enlaces com fluxo positivo se alteram ao longo dos 60 períodos. A demonstração ilustra o modelo; não é uma nova campanha de simulação. Abra para perguntas.'),
    section('05', 'Resultados', 'Viabilidade estrutural e compromissos operacionais.'),
    {
      title: 'Resultados computacionais', section: 'Resultados',
      content: html`<div class="two-col"><table class="numeric"><thead><tr><th>Indicador</th><th>Valor</th></tr></thead><tbody><tr><td>Combinações na grade cartesiana</td><td>2.750</td></tr><tr><td>Execuções registradas</td><td>1.626</td></tr><tr><td>Execuções viáveis</td><td>1.594</td></tr><tr><td>Execuções inviáveis</td><td>32</td></tr><tr><td>Topologias distintas</td><td>27</td></tr><tr><td>Com simulação compatível</td><td>26</td></tr></tbody></table><div class="stack"><div class="metrics"><div class="metric"><strong>1,56 s</strong><span>tempo médio</span></div><div class="metric"><strong>4,60 s</strong><span>tempo máximo</span></div></div><div class="callout"><h3>Gap máximo: 0,01%</h3><p>Entre <strong>12 e 21 nós fixos</strong> instalados, com média de <strong>16,6 nós</strong>.</p></div><p class="small muted">Tempos de solução referentes à instância avaliada.</p></div></div>`
    },
    {
      title: 'Resultados da simulação', section: 'Resultados', className: 'results-slide',
      content: html`<table class="numeric"><thead><tr><th>Métrica</th><th>Mínimo</th><th>Média</th><th>Máximo</th></tr></thead><tbody><tr><td>Latência (ms) ↓</td><td>65,44</td><td>126,37</td><td>188,51</td></tr><tr><td>Energia (mJ) ↓</td><td>42.351</td><td>1.484.198</td><td>1.917.670</td></tr><tr><td>Dados (bits) ↑</td><td>7.008</td><td>9.692</td><td>11.918</td></tr></tbody></table><figure class="pareto-crop"><img src="assets/img/frentes-pareto.png" alt="Painéis superiores da figura de Pareto: projeções das topologias avaliadas por latência, energia e dados entregues."></figure><p class="small"><strong>17 topologias</strong> na primeira de três frentes de Pareto. <span class="muted">Roxo: primeira; verde-azulado: segunda; verde-claro: terceira.</span></p>`
    },
    {
      title: 'Estrutura das topologias e desempenho', section: 'Resultados',
      content: html`<figure class="figure landscape"><img src="assets/img/correlacoes.png" alt="Gráficos de correlação entre número de nós e latência (r=0,83), número de nós e dados entregues (r=0,96) e enlaces fixos viáveis e energia (r=0,28)."></figure><p class="small">Nós instalados: correlação com latência (\(r=0{,}83\)) e dados (\(r=0{,}96\)).<br>Enlaces fixos viáveis: associação mais fraca com energia (\(r=0{,}28\)).</p><div class="callout"><h3>Da faixa baixa à alta de demanda \(B\) no MILP</h3><p class="small">Dados médios: <strong>9.250 → 10.328 bits</strong> &nbsp; · &nbsp; Latência média: <strong>114,65 → 140,97 ms</strong>.</p></div>`
    },
    section('06', 'Considerações finais', 'O planejamento gera instalações; a simulação avalia seu desempenho.'),
    {
      title: 'Considerações finais', section: 'Conclusões',
      content: html`<ul><li>O MILP integra <strong>instalação de nós fixos, habilitação de enlaces e roteamento</strong> ao longo de trajetórias discretizadas.</li><li>A viabilidade estrutural não determina, isoladamente, <strong>latência, energia e entrega de dados</strong> na simulação.</li><li>Avaliação preliminar: <strong>uma instância e 26 topologias simuladas</strong>, sem comparação operacional com os baselines.</li></ul><div class="callout" style="margin-top:auto"><h3>Trabalhos futuros</h3><p>Ampliar as instâncias, estender o modelo e explorar a otimização multiobjetivo, utilizando-o também como mecanismo de verificação de viabilidade integrado ao NSGA.</p></div>`
    },
    {
      title: 'Obrigado!', section: 'Encerramento', className: 'closing',
      content: html`<h2>Obrigado!</h2><p>Junio Cesar Ferreira<br><a href="mailto:juniocesarferreira@usp.br">juniocesarferreira@usp.br</a></p><p class="funding"><strong>Agradecimentos</strong><br>FAPESP · processos 2020/09770-7 e 2021/06968-3<br>CNPq · processo 444791/2024-8 — Conhecimento Brasil</p><p class="small" style="color:#70d7bf">A seguir: demonstração das rotas de comunicação →</p>`
    },
  ];
})();
