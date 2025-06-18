import { User } from '../../lib/user';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { naam, email, wachtwoord } = req.body;
    const nieuweGebruiker = await User.registreer(naam, wachtwoord, email);
    return res.status(200).json({ success: true, id: nieuweGebruiker.id });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
} 