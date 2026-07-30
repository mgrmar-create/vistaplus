// ══════════════════════════════════════════════════════════════════════
// api/diagnostico.js — VISTA+ · Fase 1 (Visão Real por Imagem) · v2
// Geocodifica o cruzamento + cada via separadamente → calcula o RUMO REAL
// de cada aproximação → Street View mirando nessas direções → satélite
// Mapbox → monta mensagem multimodal → chama a Anthropic → devolve.
// ══════════════════════════════════════════════════════════════════════

// Calcula o rumo inicial (bearing, 0–360°) do ponto A para o ponto B
function calcularRumo(lat1, lng1, lat2, lng2) {
  const toRad = (d) => (d * Math.PI) / 180;
  const φ1 = toRad(lat1), φ2 = toRad(lat2);
  const Δλ = toRad(lng2 - lng1);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  const θ = Math.atan2(y, x);
  return ((θ * 180) / Math.PI + 360) % 360;
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

    if (mapsKey && cruzamento && cruzamento.rua1 && cruzamento.rua2 && cruzamento.cidade) {
      try {
        const sufixo = `${cruzamento.bairro ? cruzamento.bairro + ", " : ""}${cruzamento.cidade}, ${cruzamento.uf || ""}, Brasil`;

        // 1. Geocodifica o cruzamento (ponto central) e cada via isoladamente
        const [centro, p1, p2] = await Promise.all([
          geocodificar(`${cruzamento.rua1} e ${cruzamento.rua2}, ${sufixo}`, mapsKey),
          geocodificar(`${cruzamento.rua1}, ${sufixo}`, mapsKey),
          geocodificar(`${cruzamento.rua2}, ${sufixo}`, mapsKey),
        ]);

        if (centro) {
          existenciaConfirmada = true;
          const { lat, lng } = centro;

          // 2. Calcula os rumos reais de cada aproximação (2 sentidos por via = 4 headings)
          let headings = [];
          if (p1) {
            const h = calcularRumo(lat, lng, p1.lat, p1.lng);
            headings.push({ heading: h, label: `Rua/Av. ${cruzamento.rua1} — sentido A` });
            headings.push({ heading: (h + 180) % 360, label: `Rua/Av. ${cruzamento.rua1} — sentido B` });
          }
          if (p2) {
            const h = calcularRumo(lat, lng, p2.lat, p2.lng);
            headings.push({ heading: h, label: `Rua/Av. ${cruzamento.rua2} — sentido A` });
            headings.push({ heading: (h + 180) % 360, label: `Rua/Av. ${cruzamento.rua2} — sentido B` });
          }
          // Fallback: se não conseguimos geocodificar as vias isoladamente, usa os 4 cardeais como antes
          if (headings.length === 0) {
            headings = [0, 90, 180, 270].map((h) => ({ heading: h, label: `ângulo ${h}°` }));
          }

          // 3. Checa cobertura de Street View antes de gastar chamadas de imagem
          const metaUrl = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${lat},${lng}&key=${mapsKey}`;
          const metaRes = await fetch(metaUrl);
          const metaData = await metaRes.json();

          if (metaData.status === "OK") {
            for (const h of headings) {
              try {
                const svUrl = `https://maps.googleapis.com/maps/api/streetview?size=640x400&location=${lat},${lng}&heading=${h.heading}&fov=90&pitch=0&key=${mapsKey}`;
                const imgRes = await fetch(svUrl);
                if (imgRes.ok) {
                  const buffer = await imgRes.arrayBuffer();
                  imagens.push({
                    tipo: `Street View — aproximação: ${h.label}`,
                    base64: Buffer.from(buffer).toString("base64"),
                    mediaType: "image/jpeg",
                  });
                }
              } catch (e) { /* ignora falha pontual, segue com os demais ângulos */ }
            }
          } else {
            avisoImagem = "Street View sem cobertura para este local.";
          }

          // 4. Satélite via Mapbox
          if (mapboxToken) {
            try {
              const mbUrl = `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${lng},${lat},18,0/640x400@2x?access_token=${mapboxToken}`;
              const mbRes = await fetch(mbUrl);
              if (mbRes.ok) {
                const mbBuffer = await mbRes.arrayBuffer();
                imagens.push({
                  tipo: "Vista aérea de satélite (Mapbox)",
                  base64: Buffer.from(mbBuffer).toString("base64"),
                  mediaType: "image/jpeg",
                });
              }
            } catch (e) { /* segue sem satélite se falhar */ }
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
        ? "A existência e localização deste cruzamento JÁ FORAM CONFIRMADAS por geocodificação — desconsidere qualquer instrução abaixo que peça para você validar a existência do cruzamento por conta própria; ela é um fallback para quando não há imagem, e não se aplica aqui."
        : "";
      promptFinal =
        `Você está recebendo ${imagens.length} imagem(ns) REAIS deste cruzamento, listadas acima. ` +
        `Cada imagem de Street View foi capturada mirando especificamente na direção de uma das aproximações da via (identificada no rótulo da imagem) — use isso para saber qual imagem corresponde a qual via ao avaliar os subcritérios de cada uma separadamente. ` +
        `Use-as como evidência visual DIRETA — sinalização, faixas, obstáculos de visibilidade, geometria, calçadas, rampas, etc. ` +
        `Você TEM confirmação visual real deste cruzamento; NÃO trate este diagnóstico como "sem confirmação visual". ` +
        `${avisoExistencia}\n\n${prompt}`;
    } else if (avisoImagem) {
      promptFinal =
        `AVISO TÉCNICO: não foi possível obter imagem real deste cruzamento (${avisoImagem}). ` +
        `Prossiga com base em inferência textual/contextual, e sinalize essa limitação de forma breve no campo RESUMO.\n\n${prompt}`;
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
      aviso: avisoImagem,
      existenciaConfirmadaPorGeocoding: existenciaConfirmada,
    };

    return res.status(anthropicRes.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
}
