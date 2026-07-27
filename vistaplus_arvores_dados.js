// ══════════════════════════════════════════════════════════════════════
// ÁRVORES DE DECISÃO VISTA+ — Matriz ICV+ · 14 critérios · 82 subcritérios
// Gerado a partir de: Matriz_IVC_Vista_com_arvores_27jul26.xlsx
// ══════════════════════════════════════════════════════════════════════
const ARVORES_ICV = {
  sinalizacao: { label: "Sinalização", subs: [
    { key:"sinalizacao_1", nome:"Placa de PARE (Via 1 — Via 2=N/A)", arvore:". Existe? →NÃO=3,0 · SIM→Visível a 30m? →NÃO=3,0 · SIM→Conservada (retroreflexo)? →NÃO=2,0 · SIM→Posicionada corretamente? →NÃO=1,0/2,0 · SIM→Via exige reforço e há só uma? →SIM=1,0 · NÃO=0,0." },
    { key:"sinalizacao_2", nome:"Placa de conversão/sentidos.", arvore:"Existe conversão regulamentada? →NÃO=N/A · SIM→Existe placa? →NÃO=3,0 · SIM→Visível a 30m? →NÃO=3,0 · SIM→Conservada? →NÃO=2,0 · SIM→Posicionada corretamente? →NÃO=1,0/2,0 · SIM→Falta reforço? →SIM=1,0 · NÃO=0,0." },
    { key:"sinalizacao_3", nome:"MAC-V+ / Dentes de tubarão / Dê a Preferência (Via 1 — Via 2=N/A).", arvore:"Existe? →NÃO→PARE no solo? →NÃO=3,0 · SIM=2,0 · SIM→Visível? →NÃO=3,0 · SIM→Conservada? →NÃO=2,0 · SIM→Posicionada antes da faixa de pedestre? →NÃO=1,0/2,0 · SIM→Tipo conforme (triângulos apontados para o condutor)? →NÃO=1,0 · SIM=0,0." },
    { key:"sinalizacao_4", nome:"Pintura de solo PARE (Via 1 — Via 2=N/A)", arvore:". Existe? →NÃO→Placa compensa? →NÃO=3,0 · SIM=2,0 · SIM→Visível? →NÃO=3,0 · SIM→Conservada? →NÃO=2,0 · SIM→Posicionada antes da linha de retenção? →NÃO=1,0/2,0 · SIM=0,0." },
    { key:"sinalizacao_5", nome:"Faixa de pedestre — existência e conservação", arvore:"★ FATOR DE ALERTA CRÍTICO. Existe? →NÃO=3,0⚠ · SIM→Visível (contraste)? →NÃO=3,0⚠ · SIM→Conservada (>50%)? →NÃO→Desgaste parcial? →SIM=1,0 · NÃO=2,0 · SIM→Largura ≥4m (CONTRAN 738/2018)? →NÃO=1,0 · SIM→Condições reais de percepção do pedestre? →NÃO=2,0 · SIM=0,0. Nota 3,0 dispara selo independente do ICV+." },
    { key:"sinalizacao_6", nome:"Faixa de pedestre — posicionamento ★", arvore:". Existe? →NÃO=N/A · SIM→Após a linha de retenção? →NÃO=3,0 · SIM→Distância adequada da esquina (mín.1m)? →NÃO=2,0 · SIM→Permite percepção do pedestre antes de entrar? →NÃO=2,0 · SIM→Fora do raio de curvatura? →NÃO=1,0 · SIM=0,0." },
    { key:"sinalizacao_7", nome:"Setas direcionais. Existe conversão?", arvore:"→NÃO=N/A · SIM→Existem setas? →NÃO=3,0 · SIM→Visíveis? →NÃO=3,0 · SIM→Conservadas? →NÃO=2,0 · SIM→Posicionadas corretamente? →NÃO=1,0/2,0 · SIM→Indicam todos os movimentos? →NÃO=1,0 · SIM=0,0." },
    { key:"sinalizacao_8", nome:"Faixa de retenção / stop bar / linha de parada.", arvore:"Existe? →NÃO=3,0 · SIM→Visível? →NÃO=3,0 · SIM→Conservada? →NÃO=2,0 · SIM→Antes da faixa de pedestre? →NÃO→Após a faixa (condutor para sobre ela)? →SIM=3,0 · NÃO=1,0/2,0 · SIM=0,0." },
    { key:"sinalizacao_9", nome:"Sinalização horizontal legível — conjunto geral.", arvore:"Existe? →NÃO=3,0 · SIM→Legível em velocidade normal? →NÃO=3,0 · SIM→>70% conservada? →NÃO=2,0 · SIM→Coerente (sem contradições)? →NÃO=2,0 · SIM→Conforme CTB/CONTRAN? →NÃO=1,0 · SIM=0,0." },
    { key:"sinalizacao_10", nome:"Placa de velocidade máxima.", arvore:"Existe regulamentação? →NÃO=N/A · SIM→Existe placa? →NÃO=3,0 · SIM→Visível a ≥100m? →NÃO=2,0 · SIM→Conservada? →NÃO=2,0 · SIM→Velocidade compatível com o cruzamento? →NÃO=1,0 · SIM=0,0." },
    { key:"sinalizacao_11", nome:"Daylighting (obstáculos visuais na esquina).", arvore:"Existe obstáculo? →NÃO=0,0 · SIM→É removível? →NÃO=3,0 · SIM→Existe sinalização de daylighting eficaz? →NÃO=3,0 · SIM→Respeitada? →NÃO=2,0 · SIM→Campo de visão suficiente? →NÃO=1,0 · SIM=0,0." },
  ]},
  velocidade: { label: "Velocidade praticada", subs: [
    { key:"velocidade_1", nome:"Velocidade real praticada", arvore:"★ FATOR DE ALERTA CRÍTICO (não a da placa). Compatível com segurança? →SIM=0,0 · NÃO→Reduzem espontaneamente? →SIM=1,0 · NÃO→Maioria a 40–50km/h sem reduzir? →SIM=2,0 · NÃO→Maioria a >50–60km/h sem redução? →SIM=3,0⚠. Nota 3,0 dispara selo independente do ICV+." },
    { key:"velocidade_2", nome:"Redutores de velocidade — existência e conservação.", arvore:"Existe redutor? →NÃO→Velocidade compatível mesmo sem redutor? →SIM=1,0 · NÃO=3,0 · SIM→Bem sinalizado? →NÃO=2,0 · SIM→Conservado? →NÃO=1,0/2,0 · SIM→Compatível com tipo e volume de tráfego? →NÃO=1,0 · SIM=0,0." },
    { key:"velocidade_3", nome:"Percentual de veículos acima da velocidade", arvore:"Percentual de veículos acima da velocidade orientada. <10%=0,0 · 10–30%=1,0 · 30–60%=2,0 · >60%=3,0. Observação direta ou dados HERE Maps." },
  ]},
  visibilidade: { label: "Visibilidade", subs: [
    { key:"visibilidade_1", nome:"Veículo estacionado bloqueando visibilidade", arvore:"★ FATOR DE ALERTA CRÍTICO (2,5–3,0). Há veículos na esquina? →NÃO=0,0 · SIM→Bloqueia visibilidade do fluxo preferencial? →NÃO=0,0 · SIM→Bloqueio total? →SIM=3,0⚠ · NÃO→Obriga avançar além da linha de retenção? →SIM=2,5⚠ · NÃO=2,0." },
    { key:"visibilidade_2", nome:"Muro alto obstruindo visibilidade (2,5–3,0).", arvore:"Existe muro? →NÃO=0,0 · SIM→Bloqueia? →NÃO=0,0 · SIM→Bloqueio total? →SIM=3,0 · NÃO→Obriga avançar? →SIM=2,5 · NÃO=2,0." },
    { key:"visibilidade_3", nome:"Árvore/vegetação obstruindo visibilidade  (1,0–3,0).", arvore:"Existe? →NÃO=0,0 · SIM→Bloqueia? →NÃO=0,0 · SIM→Total? →SIM=3,0 · NÃO→Obriga avançar? →SIM=2,5 · NÃO→Parcial relevante? →SIM=2,0 · NÃO=1,0." },
    { key:"visibilidade_4", nome:"Poste bloqueando visibilidade (1,0–3,0).", arvore:"Existe poste no ângulo crítico? →NÃO=0,0 · SIM→Bloqueia? →NÃO=0,0 · SIM→Bloqueio total no ângulo crítico? →SIM=3,0 · NÃO→2,5 · NÃO→Obstrução leve perceptível? →SIM=1,5 · NÃO=1,0." },
    { key:"visibilidade_5", nome:"Outros obstáculos diversos (1,0–3,0).", arvore:"Existe container, banca, obra, mobiliário? →NÃO=0,0 · SIM→Bloqueia? →NÃO=0,0 · SIM→Total? →SIM=3,0 · NÃO→Obriga avançar? →SIM=2,5 · NÃO→Parcial relevante? →SIM=2,0 · NÃO=1,0." },
    { key:"visibilidade_6", nome:"Recuos mal dimensionados.", arvore:"Edificações com recuo adequado? →SIM=0,0 · NÃO→Compromete visibilidade? →NÃO=1,0 · SIM→Parcial? →SIM=2,0 · NÃO→Obriga avançar? →SIM=2,5 · NÃO→Recuo zero? →SIM=3,0." },
    { key:"visibilidade_7", nome:"Coluna B do veículo no ângulo de cruzamento", arvore:"★ FATOR DE ALERTA CRÍTICO (2,5–3,0) — subcritério exclusivo VISTA+. Ângulo exige rotação significativa? →NÃO=0,0 · SIM→Coluna B coincide com ângulo crítico? →NÃO=1,0 · SIM→Bloqueio total com máxima rotação? →SIM=3,0⚠ · NÃO→Bloqueio parcial obrigando movimentação corporal? →SIM=2,5⚠ · NÃO=2,0." },
    { key:"visibilidade_8", nome:"Curva fechada obstruindo visibilidade (2,0–3,0).", arvore:"Cruzamento em/após curva fechada? →NÃO=0,0 · SIM→Impede visibilidade? →NÃO=0,0 · SIM→Bloqueio total? →SIM=3,0 · NÃO→Reduz significativamente tempo de percepção? →SIM=2,5 · NÃO=2,0." },
    { key:"visibilidade_9", nome:"Iluminação noturna insuficiente.", arvore:"Existe iluminação? →NÃO→Fluxo noturno relevante? →SIM=3,0 · NÃO=1,0 · SIM→Suficiente para perceber pedestres e sinalização? →SIM=0,0 · NÃO→Parcial com zonas críticas de sombra? →SIM=2,0 · NÃO→Muito precária? →SIM=2,5 · NÃO=1,0." },
  ]},
  conflitos: { label: "Conflitos veiculares", subs: [
    { key:"conflitos_1", nome:"Conversões simultâneas.", arvore:"Existem conversões? →NÃO=N/A · SIM→Ordenadas? →SIM=0,0 · NÃO→Conflito leve (negociam sem risco grave)? →SIM=1,0 · NÃO→Conflito significativo (múltiplos disputam espaço)? →SIM=2,0 · NÃO→Intenso e frequente sem nenhum controle? →SIM=3,0." },
    { key:"conflitos_2", nome:"Cruzamento 4×4 com múltiplos fluxos.", arvore:"Tem 4 aproximações? →NÃO=N/A · SIM→Volume baixo, conflitos raros? →SIM=0,0 · NÃO→Conflitos moderados gerenciáveis? →SIM=1,0 · NÃO→Frequentes com múltiplos disputando? →SIM=2,0 · NÃO→Constantes em múltiplos sentidos sem controle? →SIM=3,0." },
    { key:"conflitos_3", nome:"Conversão à esquerda sem controle.", arvore:"Existe? →NÃO=N/A · SIM→Existe controle (sinalização, ilha de espera, faixa exclusiva)? →SIM=0,0 · NÃO→Volume baixo, espera curta? →SIM=1,0 · NÃO→Volume moderado/alto, espera prolongada no meio da via? →SIM=2,0 · NÃO→Volume intenso+sem ilha+sem sinalização+fluxo contrário em alta velocidade? →SIM=3,0." },
  ]},
  pedestres: { label: "Pedestres e ciclistas", subs: [
    { key:"pedestres_1", nome:"Escola próxima (<200m).", arvore:"Existe escola? →NÃO=0,0 · SIM→Placa de ESCOLA visível? →NÃO=2,0 · SIM→Placa de velocidade reduzida? →NÃO=1,0/2,0 · SIM→Sinalização respeitada nos picos? →NÃO=1,0 · SIM=0,0. Histórico de atropelamentos com escolares=3,0." },
    { key:"pedestres_2", nome:"Comércio intenso.", arvore:"Existe? →NÃO=0,0 · SIM→Gera fluxo relevante de pedestres? →NÃO=0,0 · SIM→Sinalização adequada? →SIM=0,0/1,0 · NÃO→Fluxo moderado? →SIM=1,0 · NÃO→Fluxo intenso com travessias informais? →SIM=2,0 · NÃO→Fluxo crítico+sem sinalização+travessias generalizadas? →SIM=3,0." },
    { key:"pedestres_3", nome:"Ciclovia no entorno.", arvore:"Existe? →NÃO=0,0 · SIM→Travessia demarcada e sinalizada? →SIM=0,0 · NÃO→Demarcada sem sinalização? →SIM=1,0 · NÃO→Sem travessia (ciclista improvisa)? →SIM=2,0 · NÃO→Ciclovia interrompida antes do cruzamento? →SIM=3,0." },
    { key:"pedestres_4", nome:"Bikes elétricas (velocidade de veículo + vulnerabilidade de ciclista).", arvore:"Há circulação? →NÃO=0,0 · SIM→Sinalização específica? →SIM=0,0/1,0 · NÃO→Fluxo baixo e previsível? →SIM=1,0 · NÃO→Fluxo moderado/alto+comportamento imprevisível+sem sinalização? →SIM=2,0 · NÃO→Fluxo intenso+risco generalizado+cruzamento sem semáforo? →SIM=3,0." },
    { key:"pedestres_5", nome:"Travessia informal / não sinalizada", arvore:". Pedestres fora da faixa? →NÃO=0,0 · SIM→Esporádica (<10%)? →SIM=1,0 · NÃO→Frequente mas faixa ainda usada? →SIM=2,0 · NÃO→Generalizada — faixa ignorada? →SIM=3,0." },
    { key:"pedestres_6", nome:"Comércio ambulante/feirantes alterando fluxo de pedestres", arvore:"(critério exclusivo VISTA+). Existe ocupação? →NÃO=0,0 · SIM→Esporádica? →SIM=1,0 · NÃO→Regular mas parcial? →SIM=2,0 · NÃO→Intensa, regular, invade faixa de pedestre ou a via? →SIM=3,0." },
  ]},
  geometria: { label: "Geometria viária", subs: [
    { key:"geometria_1", nome:"Geometria angular.", arvore:"80°–100°=0,0 · 70°–80°/100°–110°=1,0 · 45°–70°/110°–135°=2,0 · <45°/>135°=3,0." },
    { key:"geometria_2", nome:"Influência geométrica — dificulta visualização dos fluxos conflitantes.", arvore:"Visão adequada? →SIM=0,0 · NÃO→Dificuldade leve (pequena movimentação)? →SIM=1,0 · NÃO→Significativa (avançar ou movimentação intensa)? →SIM=2,0 · NÃO→Ponto cego estrutural? →SIM=3,0." },
    { key:"geometria_3", nome:"Influência geométrica — obriga movimentos excessivos de cabeça/corpo", arvore:". ≤45° (natural)=0,0 · 45°–70° (confortável)=1,0 · >70° (inclinação do corpo)=2,0 · Extremo (abrir janela/debruçar/avançar fisicamente)=3,0." },
    { key:"geometria_4", nome:"Influência geométrica — reduz tempo disponível para tomada de decisão", arvore:". Antecedência suficiente? →SIM=0,0 · NÃO→Redução leve? →SIM=1,0 · NÃO→Significativa (reação rápida necessária)? →SIM=2,0 · NÃO→Só percebe quando já está na via preferencial? →SIM=3,0." },
    { key:"geometria_5", nome:"Largura excessiva por faixa.", arvore:"Local: ≤3,0m=0,0 · até 3,5m=1,0 · >3,5m com múltiplas faixas=2,0. Coletora: ≤3,3m=0,0 · até 3,7m=1,0 · >3,7m=2,0. Arterial: ≤3,5m=0,0 · até 4,0m=1,0 · >4,0m=2,0. 3+ faixas sem canalização+fluxo intenso=3,0." },
    { key:"geometria_6", nome:"Múltiplas faixas sem canalização.", arvore:"Faixa única ou bem canalizadas=0,0 · 2 faixas canalização parcial (só pintura)=1,0 · 2+ faixas sem canalização física=2,0 · 3+ faixas sem nenhuma+fluxo intenso=3,0." },
    { key:"geometria_7", nome:"Curvas abertas (raio da esquina)", arvore:"≤6m (obriga frear)=0,0 · 6–12m (conversão possível)=1,0 · 12–20m (conversão em velocidade)=2,0 · >20m ou rampa de aceleração=3,0." },
    { key:"geometria_8", nome:"Ausência de ilha separadora em via de mão dupla.", arvore:"Via sentido único=N/A · Ilha física presente=0,0 · Só sinalização (dupla linha/zebrado)=1,0 · Mão dupla sem separação+faixa de pedestre=2,0 · Mão dupla+fluxo intenso+sem separação+cruzamento sem semáforo=3,0." },
  ]},
  ambiente: { label: "Ambiente urbano", subs: [
    { key:"ambiente_1", nome:"Polo gerador de tráfego intenso (<500m).", arvore:"Sem impacto=0,0 · Impacto moderado (horários específicos)=1,0 · Impacto significativo (conflitos frequentes)=2,0 · Impacto crítico e contínuo=3,0." },
    { key:"ambiente_2", nome:"Escola/Hospital nas proximidades (<200m).", arvore:"Sem impacto=0,0 · Sinalização presente mas eficácia reduzida=1,0 · Fluxo vulnerável sem sinalização adequada=2,0 · Fluxo intenso+sem sinalização+cruzamento sem semáforo=3,0." },
    { key:"ambiente_3", nome:"Terminal de transporte (<300m).", arvore:"Sem impacto=0,0 · Fluxo alto com sinalização mínima=1,0 · Fluxo intenso sem organização=2,0 · Fluxo crítico+sem sinalização+cruzamento sem semáforo=3,0." },
    { key:"ambiente_4", nome:"Comércio intenso com carga/descarga.", arvore:"Local adequado=0,0 · Esporádico sem impacto grave=1,0 · Bloqueia parcialmente visibilidade com frequência=2,0 · Bloqueia regularmente faixa/visibilidade de forma crítica=3,0." },
    { key:"ambiente_5", nome:"Equipamentos de assistência social CRAS/CREAS/posto de saúde ★ (<200m — critério exclusivo VISTA+).", arvore:"Ausente=0,0 · Com sinalização específica adequada=0,0/1,0 · Fluxo moderado sem proteção=2,0 · Fluxo intenso de vulneráveis+sem sinalização+cruzamento sem semáforo=3,0." },
  ]},
  organizacao: { label: "Organização operacional", subs: [
    { key:"organizacao_1", nome:"Cruzamento sem NENHUMA medida de moderação (completamente solto).", arvore:"Existe alguma medida? →NÃO=3,0 automático · SIM→avaliar 8.2 a 8.6. Conjunto adequado=0,0 · Maioria presente=1,0 · Apenas elementos isolados=2,0 · Nenhuma=3,0." },
    { key:"organizacao_2", nome:"Sem tachão/redutor de velocidade.", arvore:"Existe? →SIM=0,0 · NÃO→Velocidade compatível mesmo sem? →SIM=1,0 · NÃO→Velocidade mod/alta+fluxo de pedestres? →SIM=2,0 · NÃO→Velocidade alta+fluxo intenso+histórico de acidentes? →SIM=3,0." },
    { key:"organizacao_3", nome:"Sem estreitamento viário.", arvore:"Existe? →SIM=0,0 · NÃO→Largura adequada? →SIM=0,0/1,0 · NÃO→Largura excessiva+pedestres? →SIM=2,0 · NÃO→Via larga+velocidade alta+pedestres+sem estreitamento? →SIM=3,0." },
    { key:"organizacao_4", nome:"Sem pinturas de solo.", arvore:"Existe pintura? →SIM=0,0/1,0 · NÃO→Baixo fluxo? →SIM=1,0 · NÃO→Fluxo moderado+ambiguidade? →SIM=2,0 · NÃO→Fluxo intenso+múltiplos conflitos+sem pintura? →SIM=3,0." },
    { key:"organizacao_5", nome:"Sem ilha separadora (mão e contra-mão).", arvore:"Via sentido único=N/A · Ilha física=0,0 · Só sinalização=1,0 · Sem separação+vol.moderado/alto+faixa de pedestre=2,0 · Vol.intenso+sem separação+cruzamento sem semáforo=3,0." },
    { key:"organizacao_6", nome:"Sem ordenamento geral.", arvore:"Sistema completo=0,0 · Parcial (maioria dos elementos)=1,0 · Muito parcial (elementos isolados)=2,0 · Ausência total — opera só por negociação informal=3,0." },
  ]},
  acessibilidade: { label: "Acessibilidade e infraestrutura viária", subs: [
    { key:"acessibilidade_1", nome:"Travessia de pedestres (meio-fio/guia).", arvore:"Existe rebaixamento? →NÃO→Faixa com fluxo? →SIM=3,0 · NÃO=1,0 · SIM→Alinhado com faixa? →NÃO=2,0 · SIM→Largura ≥1,20m? →NÃO=1,0 · SIM→Conservado? →NÃO=1,0 · SIM=0,0." },
    { key:"acessibilidade_2", nome:"Rampas cadeirantes — existência ★ (peso alto).", arvore:"Existe? →NÃO→Faixa com fluxo? →SIM=3,0⚠ · NÃO=2,0 · SIM→Alinhada com faixa? →NÃO=2,0 · SIM→Largura ≥1,20m? →NÃO=1,0 · SIM→Conservada? →NÃO=1,0 · SIM=0,0." },
    { key:"acessibilidade_3", nome:"Rampas cadeirantes — inclinação ★.", arvore:"Existe? →NÃO=N/A · SIM→≤8,33% (1:12 NBR9050)? →SIM=0,0 · NÃO→8,33–12,5% (utilizável com esforço)? →SIM=1,0 · NÃO→12,5–20% (dificulta uso independente)? →SIM=2,0 · NÃO→>20% (inutilizável sem auxílio)? →SIM=3,0." },
    { key:"acessibilidade_4", nome:"Piso tátil direcional e de alerta ★ (peso alto).", arvore:"Existe? →NÃO→Fluxo relevante? →SIM=3,0⚠ · NÃO=2,0 · SIM→Inclui os dois tipos? →NÃO=2,0 · SIM→Posicionado corretamente? →NÃO=1,0/2,0 · SIM→Conservado (textura perceptível)? →NÃO=1,0 · SIM=0,0." },
    { key:"acessibilidade_5", nome:"Condições da calçada.", arvore:"Existe? →NÃO→Fluxo? →SIM=3,0 · NÃO=2,0 · SIM→Bom estado (≥1,20m, sem buracos, sem obstruções)? →SIM=0,0 · NÃO→Problemas pontuais? →SIM=1,0 · NÃO→Força uso da via? →SIM=2,0 · NÃO→Crítica ou bloqueada=3,0." },
  ]},
  campo: { label: "Evidências de campo", subs: [
    { key:"campo_1", nome:"Motoristas não respeitam preferência.", arvore:"Observável? →NÃO=N/A · SIM→Maioria respeita=0,0 · <10% desrespeitam=1,0 · 10–40%=2,0 · >40%=3,0." },
    { key:"campo_2", nome:"Veículos avançam sem reduzir velocidade.", arvore:"Maioria reduz=0,0 · <10% sem reduzir=1,0 · 10–40%=2,0 · >40%=3,0." },
    { key:"campo_3", nome:"Iluminação pública — condição noturna.", arvore:"Funcionando completamente=0,0 · Falhas pontuais (1–2 postes)=1,0 · >50% apagados=2,0 · Completamente inoperante+fluxo noturno=3,0." },
    { key:"campo_4", nome:"Condições de drenagem/alagamento.", arvore:"Sem problemas=0,0 · Raro e superficial=1,0 · Frequente em chuvas moderadas+compromete sinalização=2,0 · Frequente+intenso+força pedestres para via+aquaplanagem=3,0." },
    { key:"campo_5", nome:"Ultrapassagem indevida.", arvore:"Sem ocorrências=0,0 · <5%=1,0 · 5–20%=2,0 · >20%=3,0." },
    { key:"campo_6", nome:"Histórico de acidentes ★ FATOR DE ALERTA CRÍTICO (BO/PMCS/DATATRAN — 3 anos).", arvore:"Sem histórico=0,0 · Só danos materiais=1,0 · Com feridos=2,0 · Óbito(s) ou múltiplos feridos graves=3,0⚠. Nota 3,0 dispara selo independente do ICV+." },
    { key:"campo_7", nome:"Relatos de moradores e comerciantes.", arvore:"Considerado seguro=0,0 · Preocupação pontual=1,0 · Preocupação frequente+histórico verbal=2,0 · Reconhecidamente perigoso+histórico de acidentes graves+medo constante=3,0." },
  ]},
  socioeconomico: { label: "Vulnerabilidade Socioeconômica do Entorno", subs: [
    { key:"socioeconomico_1", nome:"Densidade de equipamentos públicos essenciais  (<300m: posto saúde, CRAS, CREAS, escola  pública, CAPS, UPA).", arvore:"Ausente=0,0 · 1 equip.+fluxo moderado=1,0 · 2+ equip.+fluxo relevante e diversificado=2,0 · Alta densidade+fluxo intenso+sem sinalização+cruzamento sem semáforo=3,0." },
    { key:"socioeconomico_2", nome:"Perfil de mobilidade — dependência de transporte ativo/coletivo ★ (critério exclusivo VISTA+).", arvore:"Baixa dependência=0,0 · Moderada=1,0 · Alta (maioria a pé/bike/ônibus)=2,0 · Extrema+renda muito baixa+vulneráveis+sem proteção=3,0." },
    { key:"socioeconomico_3", nome:"Faixa etária predominante (idosos e crianças).", arvore:"Sem presença relevante=0,0 · Pontual=1,0 · Fluxo relevante sem sinalização=2,0 · Fluxo intenso e contínuo+sem sinalização+cruzamento sem semáforo=3,0." },
    { key:"socioeconomico_4", nome:"Taxa de motorização do entorno (baixa = mais pedestres expostos).", arvore:"Alta=0,0 · Moderada=1,0 · Baixa=2,0 · Muito baixa+renda muito baixa+alta densidade de pedestres+sem proteção=3,0." },
    { key:"socioeconomico_5", nome:"Presença de comércio informal/ambulantes.", arvore:"Ausente ou organizado=0,0 · Esporádico=1,0 · Regular+altera fluxo+força desvios=2,0 · Intenso e permanente+invade calçada e faixa=3,0." },
    { key:"socioeconomico_6", nome:"Proximidade de equipamentos para PCD  (<300m: APAE, clínicas, associações).", arvore:"Ausente=0,0 · Com acessibilidade completa=0,0 · Fluxo moderado+acessibilidade parcial=1,0 · Fluxo relevante+sem acessibilidade=2,0 · Fluxo relevante+sem acessibilidade+cruzamento sem semáforo=3,0." },
    { key:"socioeconomico_7", nome:"Indicadores de abandono (manutenção ausente).", arvore:"Sem sinais=0,0 · Pontuais=1,0 · Múltiplos e recorrentes=2,0 · Generalizado+entorno degradado=3,0." },
  ]},
  conectividade: { label: "Conectividade com a Rede de Mobilidade Ativa", subs: [
    { key:"conectividade_1", nome:"Ciclovia/ciclofaixa conectada.", arvore:"Existe? →NÃO=0,0 · SIM→Travessia demarcada e sinalizada? →SIM=0,0 · NÃO→Demarcada sem sinalização? →SIM=1,0 · NÃO→Sem travessia (ciclista improvisa)? →SIM=2,0 · NÃO→Ciclovia interrompida antes do cruzamento? →SIM=3,0." },
    { key:"conectividade_2", nome:"Parada de transporte público próxima (<300m).", arvore:"Ausente/sem impacto=0,0 · Fluxo moderado+sinalização insuficiente=1,0 · Fluxo moderado/alto+sem sinalização=2,0 · Fluxo intenso e contínuo+sem sinalização+cruzamento sem semáforo=3,0." },
    { key:"conectividade_3", nome:"Inserção em rota de corredor escolar.", arvore:"Fora de rota=0,0 · Sinalização presente e eficaz=0,0 · Em rota+sinalização insuficiente=1,0 · Em rota sem sinalização=2,0 · Alto fluxo+horários críticos+sem proteção+cruzamento sem semáforo=3,0." },
    { key:"conectividade_4", nome:"Continuidade do passeio/calçada até pontos de interesse.", arvore:"Continuidade adequada=0,0 · Descontinuidade pontual=1,0 · Descontinuidade significativa+força uso da via=2,0 · Ausência generalizada+pedestres na via em toda a extensão=3,0." },
  ]},
  resiliencia: { label: "Resiliência Climática e Ambiental", subs: [
    { key:"resiliencia_1", nome:"Arborização e sombreamento da travessia", arvore:"(relevante em cidades de clima quente como Maceió/AL). Generoso=0,0 · Parcial=1,0 · Insuficiente=2,0 · Ausente+cidade quente+fluxo intenso=3,0." },
    { key:"resiliencia_2", nome:"Permeabilidade do solo/área verde próxima.", arvore:"Significativa+drenagem adequada=0,0 · Limitada+sem histórico de alagamento=1,0 · Predominantemente impermeável+alagamento moderado=2,0 · Totalmente impermeabilizado+alagamentos frequentes e intensos=3,0." },
    { key:"resiliencia_3", nome:"Exposição solar direta no horário de pico.", arvore:"Sem exposição crítica=0,0 · Exposição em horários de baixo fluxo=1,0 · Em horários de fluxo moderado+visibilidade comprometida=2,0 · Direta no horário de pico+pedestres invisíveis ao condutor pelo sol=3,0." },
    { key:"resiliencia_4", nome:"Predominância de superfícies pavimentadas (ilha de calor).", arvore:"Equilíbrio=0,0 · Predominância moderada=1,0 · Intensamente pavimentado+ilha de calor evidente=2,0 · Totalmente impermeabilizado+ilha intensa+cidade quente+vulneráveis=3,0." },
  ]},
  horario: { label: "Comportamento de Tráfego por Horário", subs: [
    { key:"horario_1", nome:"Variação no pico escolar.", arvore:"Sem escola próxima=N/A · Pico absorvido com segurança=0,0 · Conflitos leves gerenciáveis=1,0 · Conflitos frequentes+risco real para crianças=2,0 · Pico intenso+cruzamento despreparado+crianças em múltiplos pontos=3,0." },
    { key:"horario_2", nome:"Variação no pico comercial.", arvore:"Sem comércio intenso=N/A · Pico absorvido=0,0 · Conflitos leves=1,0 · Conflitos frequentes+risco real=2,0 · Pico crítico+sobrecarregado+múltiplos conflitos simultâneos=3,0." },
    { key:"horario_3", nome:"Padrão noturno — velocidade × visibilidade reduzida.", arvore:"Sem fluxo noturno=N/A · Iluminação adequada+velocidade compatível=0,0 · Problema isolado=1,0 · Iluminação insuficiente+velocidade elevada=2,0 · Iluminação ausente+velocidade muito elevada+pedestres invisíveis+histórico de acidentes noturnos=3,0." },
    { key:"horario_4", nome:"Variação sazonal/turística ★ (relevante para cidades litorâneas)", arvore:"Sem perfil turístico=N/A · Pico absorvido=0,0 · Sobrecarga moderada=1,0 · Sobrecarga significativa+conflitos nos meses de pico=2,0 · Pico crítico+multiplicação expressiva do fluxo+cruzamento despreparado=3,0." },
  ]},
};

// SUBCRIT_MAP substitui o antigo — usar em tabelaVia() e no parsing
const SUBCRIT_MAP_V2 = {
  sinalizacao: ["sinalizacao_1", "sinalizacao_2", "sinalizacao_3", "sinalizacao_4", "sinalizacao_5", "sinalizacao_6", "sinalizacao_7", "sinalizacao_8", "sinalizacao_9", "sinalizacao_10", "sinalizacao_11"],
  velocidade: ["velocidade_1", "velocidade_2", "velocidade_3"],
  visibilidade: ["visibilidade_1", "visibilidade_2", "visibilidade_3", "visibilidade_4", "visibilidade_5", "visibilidade_6", "visibilidade_7", "visibilidade_8", "visibilidade_9"],
  conflitos: ["conflitos_1", "conflitos_2", "conflitos_3"],
  pedestres: ["pedestres_1", "pedestres_2", "pedestres_3", "pedestres_4", "pedestres_5", "pedestres_6"],
  geometria: ["geometria_1", "geometria_2", "geometria_3", "geometria_4", "geometria_5", "geometria_6", "geometria_7", "geometria_8"],
  ambiente: ["ambiente_1", "ambiente_2", "ambiente_3", "ambiente_4", "ambiente_5"],
  organizacao: ["organizacao_1", "organizacao_2", "organizacao_3", "organizacao_4", "organizacao_5", "organizacao_6"],
  acessibilidade: ["acessibilidade_1", "acessibilidade_2", "acessibilidade_3", "acessibilidade_4", "acessibilidade_5"],
  campo: ["campo_1", "campo_2", "campo_3", "campo_4", "campo_5", "campo_6", "campo_7"],
  socioeconomico: ["socioeconomico_1", "socioeconomico_2", "socioeconomico_3", "socioeconomico_4", "socioeconomico_5", "socioeconomico_6", "socioeconomico_7"],
  conectividade: ["conectividade_1", "conectividade_2", "conectividade_3", "conectividade_4"],
  resiliencia: ["resiliencia_1", "resiliencia_2", "resiliencia_3", "resiliencia_4"],
  horario: ["horario_1", "horario_2", "horario_3", "horario_4"],
};

// Fatores de Alerta Crítico atualizados (5 itens confirmados na planilha)
const ALERTA_CRITICO_V2 = [
  ["sinalizacao_5","Ausência/deficiência de faixa de pedestre"],
  ["velocidade_1","Velocidade real praticada excessiva"],
  ["visibilidade_1","Veículo estacionado bloqueia visibilidade do fluxo preferencial"],
  ["visibilidade_7","Coluna B do veículo bloqueia visão no ângulo de cruzamento"],
  ["campo_6","Histórico de acidentes registrado (BO/PMCS/DATATRAN)"],
];
// ══════════════════════════════════════════════════════════════════════
// HELPERS — geram os trechos do prompt automaticamente a partir de ARVORES_ICV
// Usar dentro da função analisar(), no lugar dos blocos estáticos "1. SINALIZAÇÃO..."
// e dos antigos SUBCRIT_V1_JSON / SUBCRIT_V2_JSON escritos à mão.
// ══════════════════════════════════════════════════════════════════════

// Gera a seção completa "1. SINALIZAÇÃO / 2. VELOCIDADE / ..." com as 82 árvores
function montarSecaoArvores(){
  const ids=Object.keys(ARVORES_ICV);
  return ids.map((cid,i)=>{
    const c=ARVORES_ICV[cid];
    const linhas=c.subs.map(s=>`- [${s.key}] ${s.nome}: ${s.arvore}`).join("\n");
    return `${i+1}. ${c.label.toUpperCase()}\n${linhas}`;
  }).join("\n\n");
}

// Gera o template JSON de notas (SUBCRIT_V1_JSON / V2) — chaves na ordem certa, valor "V"
function montarSubcritJsonTemplate(){
  const todasChaves=Object.values(ARVORES_ICV).flatMap(c=>c.subs.map(s=>s.key));
  return "{"+todasChaves.map(k=>`"${k}":V`).join(",")+"}";
}

// Gera o template JSON de justificativas (trilha percorrida na árvore) — só p/ chaves não-nulas
function montarJustJsonTemplate(){
  const todasChaves=Object.values(ARVORES_ICV).flatMap(c=>c.subs.map(s=>s.key));
  return "{"+todasChaves.slice(0,3).map(k=>`"${k}":"trilha resumida (ex: Existe→SIM·Conservada→NÃO=2,0)"`).join(",")+", ... (demais chaves, omitir as que forem null)}";
}

// Gera o CRITERIOS array atualizado (para renderInput/renderResultado) a partir de ARVORES_ICV
// destaque/novo/campoCampo precisam ser reaplicados manualmente conforme o CRITERIOS original
function montarCriteriosArray(flagsExtras){
  // flagsExtras: {sinalizacao:{destaque:true}, campo:{campoCampo:true}, ...}
  return Object.entries(ARVORES_ICV).map(([id,c])=>({
    id,
    label:c.label,
    desc:"", // manter descrições curtas já existentes no CRITERIOS original
    subcrit:c.subs.map(s=>s.nome),
    ...(flagsExtras[id]||{})
  }));
}
