export type UserUpdateRequest = {
    firstName: string;
    lastName: string;
    userId: number;
  };
  
  export type TodoTitleUpdateRequest = {
    todoId: number;
    newTitle: string;
  };
  
  export type TodoStatusUpdateRequest = {
    todoId: number;
  };