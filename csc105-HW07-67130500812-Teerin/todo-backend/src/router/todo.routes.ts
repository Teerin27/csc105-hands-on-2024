import { Hono } from 'hono';
import * as todoController from '../controller/todo.controller.ts';

const todoRouter = new Hono();

todoRouter.get('/test', (c) => c.text('Hello From Todo Router'));
todoRouter.get('/', todoController.GetTheTodo);
todoRouter.post('/', todoController.AddTheTodo);
todoRouter.patch('/', todoController.EditTheTodo);
todoRouter.patch('/success/:id', todoController.CompleteTheTodo);
todoRouter.delete('/:id', todoController.DeleteTheTodo);

export { todoRouter };
