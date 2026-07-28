// ══════════════════════════════════════════════════════════════════════
// api/diagnostico.js — VISTA+ · Fase 1 (Visão Real por Imagem)
// Geocodifica o cruzamento → busca Street View (4 ângulos) + satélite
// Mapbox → monta mensagem multimodal → chama a Anthropic → devolve.
// Se não houver imagem disponível, cai de volta para inferência textual.
// ══════════════════════════════════════════════════════════════════════

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

    const imagens = [];      // { tipo, base64, mediaType }
    let avisoImagem = null;
    let existenciaConfirmada = false;

    // ── 1. Geocodificação + busca de imagens (só roda se houver chave e dados do cruzamento) ──
    if (mapsKey && cruzamento && cruzamento.rua1 && cruzamento.rua2 && cruzamento.cidade) {
      try {
        const endereco = `${cruzamento.rua1} e ${cruzamento.rua2}, ${cruzamento.bairro ? cruzamento.bairro + ", " : ""}${cruzamento.cidade}, ${cruzamento.uf || ""}, Brasil`;
        const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(endereco)}&key=${mapsKey}`;
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();

        if (geoData.status === "OK" && geoData.results && geoData.results[0]) {
          const { lat, lng } = geoData.results[0].geometry.location;
          existenciaConfirmada = true; // Google conseguiu localizar as duas vias — forte indício de que existem e são próximas

          // ── 2. Street View — 4 ângulos (0°, 90°, 180°, 270°) ──
          const headings = [0, 90, 180, 270];
          // Checa disponibilidade de cobertura antes de gastar chamada de imagem
          const metaUrl = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${lat},${lng}&key=${mapsKey}`;
          const metaRes = await fetch(metaUrl);
          const metaData = await metaRes.json();

          if (metaData.status === "OK") {
            for (const heading of headings) {
              try {
                const svUrl = `https://maps.googleapis.com/maps/api/streetview?size=640x400&location=${lat},${lng}&heading=${heading}&fov=90&pitch=0&key=${mapsKey}`;
                const imgRes = await fetch(svUrl);
                if (imgRes.ok) {
                  const buffer = await imgRes.arrayBuffer();
                  imagens.push({
                    tipo: `Street View — ângulo ${heading}° (visão ao nível da via)`,
                    base64: Buffer.from(buffer).toString("base64"),
                    mediaType: "image/jpeg",
                  });
                }
              } catch (e) { /* ignora falha pontual de 1 ângulo, segue com os demais */ }
            }
          } else {
            avisoImagem = "Street View sem cobertura para este local.";
          }

          // ── 3. Satélite via Mapbox ──
          if (mapboxToken) {
            try {
              const mbUrl = `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${lng},${lat},18,0/640x400@2x?access_token=${mapboxToken}`;
              const mbRes = await fetch(mbUrl);
              if (mbRes.ok) {
                const mbBuffer = await mbRes.arrayBuffer();
                imagens.push({
                  tipo: "Vista aérea de satélite (Mapbox)",
                  base64: Buffer.from(mbBuffer).toString("base64"),
                  mediaType: "image/png",
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

    // ── 4. Montar o conteúdo multimodal da mensagem ──
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
        ? "A existência e localização deste cruzamento JÁ FORAM CONFIRMADAS por geocodificação (Google Maps localizou as duas vias com sucesso) — desconsidere qualquer instrução abaixo que peça para você validar a existência do cruzamento por conta própria; ela é um fallback para quando não há imagem, e não se aplica aqui."
        : "";
      promptFinal =
        `Você está recebendo ${imagens.length} imagem(ns) REAIS deste cruzamento, listadas acima ` +
        `(Street View em diferentes ângulos ao nível da via e/ou vista aérea de satélite). ` +
        `Use-as como evidência visual DIRETA para avaliar cada subcritério observável por imagem — ` +
        `sinalização, faixas, obstáculos de visibilidade, geometria, calçadas, rampas, etc. ` +
        `Você TEM confirmação visual real deste cruzamento; NÃO trate este diagnóstico como "sem confirmação visual". ` +
        `${avisoExistencia}\n\n${prompt}`;
    } else if (avisoImagem) {
      promptFinal =
        `AVISO TÉCNICO: não foi possível obter imagem real deste cruzamento (${avisoImagem}). ` +
        `Prossiga com base em inferência textual/contextual, como faria sem acesso a imagens, ` +
        `e sinalize essa limitação de forma breve no campo RESUMO.\n\n${prompt}`;
    }
    content.push({ type: "text", text: promptFinal });

    // ── 5. Chamar a Anthropic ──
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
    // Metadados úteis para o front-end (não interfere no parsing existente)
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
