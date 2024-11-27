import { 
  signupUser, 
  loginUser, 
    deleteUserAccount, 
  sendPasswordResetLink 
} from '../services/auth_user_service.js';
import { validateUserData } from "../models/userModel.js";



export const signup = async (req, res) => {
  const { email, password, nome } = req.body;

  try {
    // Validar dados do usuário
    validateUserData(email, password);

    // Cadastrar usuário
    const result = await signupUser(email, password, nome);

    // Retornar sucesso
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Controller para login do usuário
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteAccount = async (req, res) => {
  const { uid } = req.auth; // Obtém o UID do middleware verifyAuth

  if (!uid) {
    return res.status(401).json({ error: 'Usuário não autenticado ou UID inválido' });
  }

  try {
    // Chama o serviço para deletar a conta e os dados do usuário
    const result = await deleteUserAccount(uid);

    // Retorna sucesso ao cliente
    res.status(200).json({ message: result.message });
  } catch (error) {
    // Retorna erro ao cliente
    res.status(400).json({ error: error.message });
  }
};


// Controller para atualizar senha do usuário logado
export const changePassword = async (req, res) => {
  try {
    const { email } = req.body;
    await resetPassword(email);
    res.status(200).json({ message: 'E-mail de redefinição de senha enviado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller para enviar link de redefinição de senha
export const resetPasswordController = async (req, res) => {
  const { email } = req.body;
  try {
    await sendPasswordResetLink(email);
    res.status(200).json({ message: 'Link de redefinição de senha enviado!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


