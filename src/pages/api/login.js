import { User } from '../../lib/user';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, wachtwoord } = req.body;
    const user = await User.inloggen(email, wachtwoord);
    
    // In een echte app zou je hier session management doen
    // Voor nu returnen we gewoon de user data
    return res.status(200).json({ 
      success: true, 
      user: {
        id: user.id,
        naam: user.naam,
        email: user.email
      }
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
} 