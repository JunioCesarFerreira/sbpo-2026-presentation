# Roteiro — 15 minutos

A apresentação utiliza o modelo AnnArbor/whale em 4:3 enviado pelo apresentador. São 15 slides de conteúdo e seis aberturas de seção. Os tempos incluem essas transições e não incluem perguntas.

| Página do PDF | Conteúdo | Duração | Acumulado |
| --- | --- | --- | --- |
| 1 | Capa | 00:25 | 00:25 |
| 2 | Roteiro da apresentação | 00:20 | 00:45 |
| 3 | Abertura: Apresentação e contexto da pesquisa | 00:05 | 00:50 |
| 4 | Apresentação e contexto da pesquisa | 00:45 | 01:35 |
| 5 | Abertura: Definição do problema | 00:05 | 01:40 |
| 6 | Descrição do problema | 01:10 | 02:50 |
| 7 | Definição do problema | 01:20 | 04:10 |
| 8 | Abertura: Modelo MILP | 00:05 | 04:15 |
| 9 | Variáveis de decisão | 01:05 | 05:20 |
| 10 | Função objetivo e capacidade dos enlaces | 01:00 | 06:20 |
| 11 | Restrições do modelo | 01:30 | 07:50 |
| 12 | Abertura: Metodologia experimental | 00:05 | 07:55 |
| 13 | Metodologia experimental | 01:00 | 08:55 |
| 14 | Instância experimental | 00:45 | 09:40 |
| 15 | Abertura: Resultados | 00:05 | 09:45 |
| 16 | Resultados computacionais | 01:05 | 10:50 |
| 17 | Resultados da simulação | 01:15 | 12:05 |
| 18 | Estrutura das topologias e desempenho | 01:10 | 13:15 |
| 19 | Abertura: Considerações finais | 00:05 | 13:20 |
| 20 | Considerações finais | 01:20 | 14:40 |
| 21 | Encerramento | 00:20 | 15:00 |

## Notas para ensaio

Confirme o nome do grupo e seu vínculo nos comandos `\grupo` e `\vinculo` de `main.tex`. As aberturas de seção são transições breves.

### Página 1: Capa

Apresente o trabalho e a questão investigada: selecionar posições de nós fixos para atender dispositivos móveis, utilizando programação inteira mista e simulação.

### Página 2: Roteiro da apresentação

Apresente a sequência: contexto, definição do problema, formulação matemática, metodologia, resultados e conclusões.

### Página 4: Apresentação e contexto da pesquisa

Apresente seu vínculo e os coautores, todos vinculados ao ICMC/USP. Relacione a pesquisa ao projeto Da semente à xícara. O artigo não informa seu cargo nem o nome oficial do laboratório; personalize os comandos grupo e vinculo se necessário, sem atribuir aos autores informações que não constam no texto.

### Página 6: Descrição do problema

Na Figura 1 do artigo, identifique os móveis, as posições candidatas, os nós instalados e o sorvedouro. Explique que o alcance limitado exige retransmissão entre nós. As posições dos móveis mudam, mas a infraestrutura instalada permanece. A figura representa a motivação agrícola; o experimento realizado é geométrico e controlado, não uma implantação em campo.

### Página 7: Definição do problema

Defina os conjuntos e a distância entre as posições dos nós. J e M são conjuntos de rótulos disjuntos. O raio de comunicação determina os arcos geometricamente viáveis. As instalações são compartilhadas por todos os períodos, enquanto enlaces e fluxos podem mudar. A garantia vale nos instantes discretizados; não cobre automaticamente todos os instantes contínuos entre as amostras.

### Página 9: Variáveis de decisão

Apresente as três decisões na ordem instalação, habilitação e fluxo. y não depende do tempo; z e x dependem. Um arco com z igual a um pode ter fluxo zero, pois não há custo direto associado à habilitação. Para analisar enlaces efetivamente utilizados, o artigo considera fluxo positivo.

### Página 10: Função objetivo e capacidade dos enlaces

Explique os dois termos do objetivo. O peso elevado favorece instalações compactas, mas não representa uma otimização lexicográfica formal. As distâncias são conhecidas, portanto capacidades e custos são parâmetros calculados antes da otimização: a formulação permanece linear. O custo de fluxo é uma aproximação estrutural e não a energia medida no simulador.

### Página 11: Restrições do modelo

As duas primeiras restrições ligam os arcos às instalações. A terceira limita o fluxo à capacidade e impede fluxo em arco não habilitado. No balanço, os móveis geram demanda, os nós fixos apenas retransmitem e o sorvedouro recebe a soma das demandas. Essa escrita unificada equivale às famílias de conservação apresentadas no artigo. Os móveis também podem retransmitir. A conectividade é estrutural: interferência, colisões e detalhes de protocolo não são explicitamente modelados no MILP.

### Página 13: Metodologia experimental

Distinga a execução paramétrica da topologia: diferentes parâmetros podem gerar o mesmo vetor de instalação. A grade tem 2750 combinações; a regra de interrupção reduz o número de execuções registradas. A correspondência com a simulação usa o vetor binário de nós e as coordenadas fixas. C0, k e B geram topologias e não têm equivalência direta com as configurações operacionais do Cooja.

### Página 14: Instância experimental

Na Figura 2, mostre os candidatos como quadrados, o sorvedouro como estrela e as trajetórias em verde. Os círculos indicam alcance de comunicação. Os 90 metros de interferência se aplicam apenas à simulação. Esta é uma única instância controlada e os resultados devem ser interpretados nesse escopo.

### Página 16: Resultados computacionais

Destaque que as 1594 execuções viáveis se reduzem a 27 instalações distintas. Das 27, 26 possuem correspondência exata com a campanha simulada; uma fica fora da análise operacional. Os tempos baixos se referem a esta instância e não demonstram escalabilidade. O gap máximo é 0,01 por cento; não afirme que todas as execuções tiveram prova exata de otimalidade. Fonte: Tabela 3 e Seção 4 do artigo.

### Página 17: Resultados da simulação

Cada ponto é uma topologia. A classificação considera os três objetivos simultaneamente e foi feita após a simulação: o MILP possui objetivo escalar. Na primeira frente, nenhuma topologia é superada por outra em todos os critérios no sentido de dominância. Não há uma única rede que domine todas as demais. Os extremos da tabela podem pertencer a redes diferentes. As cores se referem à análise em três dimensões, mesmo nas projeções bidimensionais. Fonte: Tabela 4 e Figura 3 do artigo.

### Página 18: Estrutura das topologias e desempenho

A Figura 4 mostra associações entre estrutura e desempenho nas 26 topologias. Mais nós se associam a mais dados e maior latência; a relação com energia é menos explicada pelo descritor selecionado. Correlação não demonstra causalidade. Entre baixa e alta demanda B, a média de nós passa de 15,8 para 17,9. B é parâmetro do MILP, não uma taxa de tráfego equivalente no simulador. Esses resultados são tendências preliminares.

### Página 20: Considerações finais

Retome a contribuição: o modelo gera instalações viáveis e a simulação avalia seus compromissos operacionais. Alguns detalhes da campanha de simulação não estão disponíveis para documentação completa. All-Candidates ativa todos os candidatos, e Random-k escolhe k posições aleatórias; sem métricas simuladas correspondentes, não se pode afirmar superioridade sobre essas referências. Conclua com os próximos passos, sem voltar às equações.

### Página 21: Encerramento

Agradeça a atenção, os coautores e as agências de fomento. Abra para perguntas. O roteiro completo, incluindo as seis aberturas de seção, totaliza 15 minutos, sem contar a discussão.
