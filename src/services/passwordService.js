import { getAuth, updatePassword } from 'firebase/auth';

// Função para atualizar a senha do usuário logado
export const updatePasswordForLoggedUser = async (newPassword) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    await updatePassword(user, newPassword);
  } else {
    throw new Error('Usuário não autenticado');
  }
};