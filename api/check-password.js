export default function handler(req, res) {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // Vercel env variable
  const { password } = req.body;

  if (password === ADMIN_PASSWORD) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
}
