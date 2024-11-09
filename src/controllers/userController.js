import { 
  signupUser, 
  loginUser, 
    deleteUserAccount, 
  sendPasswordResetLink 
} from '../services/auth_user_service.js';
import { updatePasswordWithToken } from '../services/userService.js';

// Controller para cadastro de usuário
export const signup = async (req, res) => {
  const { email, password, nome } = req.body;
  try {
    const result = await signupUser(email, password, nome);
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


// Controller para deletar conta de usuário
export const deleteUser = async (req, res) => {
  const { uid } = req.body;
  try {
    await deleteUserAccount(uid);
    res.status(200).json({ message: 'Conta deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller para atualizar senha do usuário
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

// Controller para atualizar a senha com o token de redefinição
export const updatePasswordForUserController = async (req, res) => {
  const { resetToken, newPassword } = req.body;
  try {
    await updatePasswordWithToken(resetToken, newPassword);
    res.status(200).json({ message: 'Senha atualizada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
