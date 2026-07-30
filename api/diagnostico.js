// ══════════════════════════════════════════════════════════════════════
// api/diagnostico.js — VISTA+ · Fase 1 (Visão Real por Imagem) · v3
// Novidades desta versão:
//  1) 4 fotos extras de DETALHE DE ESQUINA (câmera inclinada p/ baixo,
//     mais "zoom") — para captar rampas, faixas e obstáculos de cada canto.
//  2) Regra rígida para os 5 subcritérios de Fator de Alerta Crítico:
//     se a imagem confirmar a condição, a nota crítica é obrigatória.
//  3) Data de captura da imagem incluída no rótulo, para transparência.
// ══════════════════════════════════════════════════════════════════════

function calcularRumo(lat1, lng1, lat2, lng2) {
  const toRad = (d) => (d * Math.PI) / 180;
  const φ1 = toRad(lat1), φ2 = toRad(lat2);
  const Δλ = toRad(lng2 - lng1);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  const θ = Math.atan2(y, x);
  return ((θ * 180) / Math.PI + 360) % 360;
}

// Bisseta o menor arco entre dois ângulos (para achar a "diagonal" de uma esquina)
function anguloMedio(a, b) {
  const diff = (((b - a + 540) % 360) - 180);
  return (a + diff / 2 + 360) % 360;
}

async function geocodificar(endereco, mapsKey) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(endereco)}&key=${mapsKey}`;
  const r = await fetch(url);
  const d = await r.json();
  if (d.status === "OK" && d.results && d.results[0]) {
    return d.results[0].geometry.location; // { lat, lng }
  }
  return null;
}

// Instrução fixa: os 5 subcritérios de Fator de Alerta Crítico da matriz ICV+
const INSTRUCAO_ALERTA_CRITICO = `
INSTRUÇÃO CRÍTICA — FATORES DE ALERTA CRÍTICO (aplicação obrigatória, sem flexibilização):
Os subcritérios abaixo são "Fator de Alerta Crítico" na metodologia VISTA+. Se a evidência (imagem e/ou observação de campo) CONFIRMAR a condição de risco descrita, você é OBRIGADO a aplicar a nota crítica prevista na árvore de decisão daquele subcritério exatamente como definido — SEM arredondar para baixo, SEM amenizar por julgamento próprio, mesmo que o restante do cruzamento pareça relativamente seguro. Basta 1 imagem mostrar a condição para ela valer:
- sinalizacao_5 (Faixa de pedestre — existência e conservação)
- velocidade_1 (Velocidade real praticada)
- visibilidade_1 (Veículo estacionado bloqueando visibilidade da via preferencial)
- visibilidade_7 (Coluna B do veículo no ângulo de cruzamento)
- campo_6 (Histórico de acidentes)
Confirmar a condição nas imagens = aplicar a nota crítica da árvore correspondente, integralmente, sem exceção.
`;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: { message: "Method not allowed" } });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  const mapsKey = process.env.GOOGLE_SERVER_KEY;
  const mapboxToken = process.env.MAPBOX_TOKEN;

  if (!apiKey) {
    return res.status(500).json({ error: { message: "ANTHROPIC_API_KEY não configurada no Vercel." } });
  }

  try {
    const { prompt, cruzamento, model, max_tokens } = req.body || {};
    if (!prompt) {
      return res.status(400).json({ error: { message: "Campo 'prompt' ausente na requisição." } });
    }

    const imagens = []; // { tipo, base64, mediaType }
    let avisoImagem = null;
    let existenciaConfirmada = false;
    let dataImagem = null;

    if (mapsKey && cruzamento && cruzamento.rua1 && cruzamento.rua2 && cruzamento.cidade) {
      try {
        const sufixo = `${cruzamento.bairro ? cruzamento.bairro + ", " : ""}${cruzamento.cidade}, ${cruzamento.uf || ""}, Brasil`;

        const [centro, p1, p2] = await Promise.all([
          geocodificar(`${cruzamento.rua1} e ${cruzamento.rua2}, ${sufixo}`, mapsKey),
          geocodificar(`${cruzamento.rua1}, ${sufixo}`, mapsKey),
          geocodificar(`${cruzamento.rua2}, ${sufixo}`, mapsKey),
        ]);

        if (centro) {
          existenciaConfirmada = true;
          const { lat, lng } = centro;

          // ── Headings de aproximação (visão geral de cada via) ──
          let headingsAprox = [];
          let h1a = null, h1b = null, h2a = null, h2b = null;
          if (p1) {
            h1a = calcularRumo(lat, lng, p1.lat, p1.lng);
            h1b = (h1a + 180) % 360;
            headingsAprox.push({ heading: h1a, label: `Rua/Av. ${cruzamento.rua1} — sentido A` });
            headingsAprox.push({ heading: h1b, label: `Rua/Av. ${cruzamento.rua1} — sentido B` });
          }
          if (p2) {
            h2a = calcularRumo(lat, lng, p2.lat, p2.lng);
            h2b = (h2a + 180) % 360;
            headingsAprox.push({ heading: h2a, label: `Rua/Av. ${cruzamento.rua2} — sentido A` });
            headingsAprox.push({ heading: h2b, label: `Rua/Av. ${cruzamento.rua2} — sentido B` });
          }
          if (headingsAprox.length === 0) {
            headingsAprox = [0, 90, 180, 270].map((h) => ({ heading: h, label: `ângulo ${h}°` }));
          }

          // ── Headings de DETALHE DE ESQUINA (as 4 diagonais entre as vias) ──
          let headingsEsquina = [];
          if (h1a !== null && h2a !== null) {
            headingsEsquina = [
              { heading: anguloMedio(h1a, h2a), label: "Esquina — quadrante 1 (detalhe: rampas/faixa/obstáculos)" },
              { heading: anguloMedio(h1a, h2b), label: "Esquina — quadrante 2 (detalhe: rampas/faixa/obstáculos)" },
              { heading: anguloMedio(h1b, h2a), label: "Esquina — quadrante 3 (detalhe: rampas/faixa/obstáculos)" },
              { heading: anguloMedio(h1b, h2b), label: "Esquina — quadrante 4 (detalhe: rampas/faixa/obstáculos)" },
            ];
          }

          // ── Checa cobertura + pega a data de captura do panorama ──
          const metaUrl = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${lat},${lng}&key=${mapsKey}`;
          const metaRes = await fetch(metaUrl);
          const metaData = await metaRes.json();

          if (metaData.status === "OK") {
            dataImagem = metaData.date || null;
            const sufixoData = dataImagem ? ` (capturada em ${dataImagem})` : " (data de captura não informada pelo Google)";

            // Fotos de aproximação — visão geral da via
            for (const h of headingsAprox) {
              try {
                const svUrl = `https://maps.googleapis.com/maps/api/streetview?size=640x400&location=${lat},${lng}&heading=${h.heading}&fov=90&pitch=0&key=${mapsKey}`;
                const imgRes = await fetch(svUrl);
                if (imgRes.ok) {
                  const buffer = await imgRes.arrayBuffer();
                  imagens.push({
                    tipo: `Street View — aproximação: ${h.label}${sufixoData}`,
                    base64: Buffer.from(buffer).toString("base64"),
                    mediaType: "image/jpeg",
                  });
                }
              } catch (e) { /* segue com os demais */ }
            }

            // Fotos de detalhe de esquina — câmera inclinada p/ baixo, mais zoom
            for (const h of headingsEsquina) {
              try {
                const svUrl = `https://maps.googleapis.com/maps/api/streetview?size=640x400&location=${lat},${lng}&heading=${h.heading}&fov=50&pitch=-20&key=${mapsKey}`;
                const imgRes = await fetch(svUrl);
                if (imgRes.ok) {
                  const buffer = await imgRes.arrayBuffer();
                  imagens.push({
                    tipo: `Street View — ${h.label}${sufixoData}`,
                    base64: Buffer.from(buffer).toString("base64"),
                    mediaType: "image/jpeg",
                  });
                }
              } catch (e) { /* segue com os demais */ }
            }
          } else {
            avisoImagem = "Street View sem cobertura para este local.";
          }

          // ── Satélite via Mapbox ──
          if (mapboxToken) {
            try {
              const mbUrl = `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${lng},${lat},18,0/640x400@2x?access_token=${mapboxToken}`;
              const mbRes = await fetch(mbUrl);
              if (mbRes.ok) {
                const mbBuffer = await mbRes.arrayBuffer();
                imagens.push({
                  tipo: "Vista aérea de satélite (Mapbox, data de captura não disponível via API)",
                  base64: Buffer.from(mbBuffer).toString("base64"),
                  mediaType: "image/jpeg",
                });
              }
            } catch (e) { /* segue sem satélite */ }
          }

          if (imagens.length === 0 && !avisoImagem) {
            avisoImagem = "Não foi possível obter nenhuma imagem para este cruzamento.";
          }
        } else {
          avisoImagem = "Não foi possível localizar geograficamente o endereço informado (geocodificação sem resultado).";
        }
      } catch (imgErr) {
        avisoImagem = "Erro ao buscar imagens: " + imgErr.message;
      }
    }

    // ── Montar conteúdo multimodal ──
    const content = [];
    imagens.forEach((img, i) => {
      content.push({ type: "text", text: `Imagem ${i + 1}: ${img.tipo}` });
      content.push({
        type: "image",
        source: { type: "base64", media_type: img.mediaType, data: img.base64 },
      });
    });

    let promptFinal = prompt;
    if (imagens.length > 0) {
      const avisoExistencia = existenciaConfirmada
        ? "A existência e localização deste cruzamento JÁ FORAM CONFIRMADAS por geocodificação — desconsidere qualquer instrução abaixo que peça para você validar a existência do cruzamento por conta própria."
        : "";
      promptFinal =
        `Você está recebendo ${imagens.length} imagem(ns) REAIS deste cruzamento. As primeiras (rotuladas "aproximação") mostram a via ao longo do seu eixo; as rotuladas "Esquina — quadrante N" são fotos de DETALHE, com a câmera inclinada para baixo e mais zoom, especificamente para você identificar rampas de acessibilidade, faixas de pedestre, guias rebaixadas, buracos e obstáculos pequenos em cada canto do cruzamento — repare que cada canto pode ter uma condição DIFERENTE dos demais (ex.: rampa em um lado e ausente no outro), avalie cada quadrante individualmente. ` +
        `Cada imagem indica a data aproximada de captura pelo Google — leve isso em conta: condições momentâneas (como veículos estacionados) podem ter mudado desde então, mas condições estruturais (rampas, faixas, geometria) tendem a ser estáveis. ` +
        `Use as imagens como evidência visual DIRETA. Você TEM confirmação visual real deste cruzamento; NÃO trate este diagnóstico como "sem confirmação visual". ` +
        `${avisoExistencia}\n\n${INSTRUCAO_ALERTA_CRITICO}\n${prompt}`;
    } else if (avisoImagem) {
      promptFinal =
        `AVISO TÉCNICO: não foi possível obter imagem real deste cruzamento (${avisoImagem}). ` +
        `Prossiga com base em inferência textual/contextual, e sinalize essa limitação de forma breve no campo RESUMO.\n\n${INSTRUCAO_ALERTA_CRITICO}\n${prompt}`;
    } else {
      promptFinal = `${INSTRUCAO_ALERTA_CRITICO}\n${prompt}`;
    }
    content.push({ type: "text", text: promptFinal });

    // ── Chamar a Anthropic ──
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: model || "claude-sonnet-5",
        max_tokens: max_tokens || 25000,
        messages: [{ role: "user", content }],
      }),
    });

    const data = await anthropicRes.json();
    data._vistaplus = {
      imagensUsadas: imagens.length,
      tiposImagem: imagens.map((i) => i.tipo),
      dataCapturaStreetView: dataImagem,
      aviso: avisoImagem,
      existenciaConfirmadaPorGeocoding: existenciaConfirmada,
    };

    return res.status(anthropicRes.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
}
