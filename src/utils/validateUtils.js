export const validateTaskData = (taskData) => {
    if (!taskData.name || !taskData.description) {
      throw new Error("Nome e descrição são obrigatórios.");
    }
  
    // Outras validações podem ser adicionadas conforme necessário
    if (taskData.date_initial && new Date(taskData.date_initial) < new Date()) {
      throw new Error("A data inicial não pode ser no passado.");
    }
  
    if (taskData.date_finish && new Date(taskData.date_finish) < new Date(taskData.date_initial)) {
      throw new Error("A data de término não pode ser antes da data inicial.");
    }
  };
  