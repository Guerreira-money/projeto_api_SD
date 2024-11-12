import { getUserById } from '../models/user.js';


import { createPasswordResetToken, findPasswordResetToken, deletePasswordResetToken } from '../models/passwordResetToken.js';
 

// Função para redefinir a senha usando o token
export const updatePasswordWithToken = async (resetToken, newPassword) => {
  // Verificar se o token de redefinição existe e não expirou
  const resetRequest = await PasswordResetToken.findOne({ token: resetToken });
  if (!resetRequest) {
    throw new Error('Token de redefinição inválido ou expirado');
  }

  // Atualizar a senha do usuário
  const user = await getUserById(resetRequest.userId);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  // Atualiza a senha do usuário
  user.password = newPassword;
  await user.save();

  // Remove o token de redefinição após o uso
  await resetRequest.remove();
};

