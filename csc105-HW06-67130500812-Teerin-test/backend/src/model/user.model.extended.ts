import { db } from '../index.ts';


const fetchAllUsers = async () => {
  // Get all users from database
  const usersList = await db.user.findMany({
    include: {
      todos: true
    }
  });
  return usersList;
};


const modifyUserNames = async (userId: number, firstName: string, lastName: string) => {
  // Update user in database
  const updatedUserProfile = await db.user.update({
    where: {
      id: userId
    },
    data: {
      firstName,
      lastName
    }
  });
  return updatedUserProfile;
};


const fetchUserTodos = async (userId: number) => {
  // Retrieve all todos for the specified user
  const userTodoItems = await db.todo.findMany({
    where: {
      userId: userId
    }
  });
  return userTodoItems;
};

export { fetchAllUsers, modifyUserNames, fetchUserTodos };