export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.status(200).end();
  const key = process.env.GOOGLE_MAPS_API_KEY || "";
  res.setHeader("Content-Type", "application/json");
  return res.status(200).json({ key });
}
