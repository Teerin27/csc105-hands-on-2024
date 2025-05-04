import { Hono } from 'hono';
import * as userController from '../controller/user.controller.ts';

// Create user router
const userRouter = new Hono();

// User endpoints
userRouter.get('/test', (c) => c.text('User Router Working'));
userRouter.get('/', userController.getAllUsers);
userRouter.patch('/profile', userController.updateUserProfile);
userRouter.get('/:userId/todos', userController.getUserTodos);

// Todo-related endpoints
userRouter.patch('/todo/complete', userController.completeTodoItem);
userRouter.patch('/todo/title', userController.updateTodoTitle);

export { userRouter };