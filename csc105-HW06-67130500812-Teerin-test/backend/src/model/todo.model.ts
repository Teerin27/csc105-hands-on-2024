import { db } from '../index.ts';


const markTodoComplete = async (todoId: number) => {
  // Update the todo's completion status
  const completedTask = await db.todo.update({
    where: {
      id: todoId
    },
    data: {
      success: true
    }
  });
  return completedTask;
};


const renameTodoTitle = async (todoId: number, newTitle: string) => {
  // Update the todo's title
  const renamedTask = await db.todo.update({
    where: {
      id: todoId
    },
    data: {
      name: newTitle
    }
  });
  return renamedTask;
};

export { markTodoComplete, renameTodoTitle };