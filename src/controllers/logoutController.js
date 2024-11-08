import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseconfig.js';

export const logoutUser = async (req, res) => {
  try {
    await signOut(auth);
    res.status(200).json({ message: 'Usuário deslogado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
