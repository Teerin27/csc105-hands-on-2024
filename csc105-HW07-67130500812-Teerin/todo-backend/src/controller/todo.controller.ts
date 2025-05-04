import type { Context } from 'hono';
import * as todoModel from '../model/todo.model.ts';
import type { AddTodoRequestBody, EditTodoRequestBody } from '../types/todo.types.ts';

const GetTheTodo = async (c: Context) => {
	try {
		const todos = await todoModel.GettingTodo();   // check condition and return
		return c.json({
			success: true,
			data: todos,
			msg: 'Get all todo!',
		});
	} catch (e) {
		return c.json(
			{
				success: false,
				data: null,
				msg: `Internal Server Error : ${e}`,
			},
			500
		);
	}
};

const AddTheTodo = async (c: Context) => {
	try {
		const body = await c.req.json<AddTodoRequestBody>();  //add new todo
		if (!body.name) {
			return c.json({
				success: false,
				data: null,
				msg: 'Missing Required Field',
			});
		}
		const newTodo = await todoModel.AddingTodo(body.name);
		return c.json({
			success: true,
			data: newTodo,
			msg: 'create todo successfully',
		});
	} catch (e) {
		return c.json(
			{
				success: false,
				data: null,
				msg: `Internal Server Error : ${e}`,
			},
			500
		);
	}
};

const EditTheTodo = async (c: Context) => {    //edit the todo that already has 
	try {
		const body = await c.req.json<EditTodoRequestBody>();
		if (!body.name || !body.id) {
			return c.json({
				success: false,
				data: null,
				msg: 'Missing required fields',
			});
		}
		const editedTodo = await todoModel.EdittingTodo(body.id, body.name);
		return c.json({
			success: true,
			data: editedTodo,
			msg: 'Edit todo successfully',
		});
	} catch (e) {
		return c.json(
			{
				success: false,
				data: null,
				msg: `Internal Server Error : ${e}`,
			},
			500
		);
	}
};

const CompleteTheTodo = async (c: Context) => {  //check todo status
	try {
		const id = c.req.param('id');
		if (isNaN(parseInt(id)))
			return c.json({
				success: false,
				data: null,
				msg: 'Wrong data format, please check your input',
			});
		const completedTodo = await todoModel.SuccessTodo(parseInt(id));
		return c.json({
			success: true,
			data: completedTodo,
			msg: 'Todo status updated to completed!',
		});
	} catch (e) {
		return c.json(
			{
				success: false,
				data: null,
				msg: `Internal Server Error : ${e}`,
			},
			500
		);
	}
};

const DeleteTheTodo = async (c: Context) => {  //delete todo
	try {
		const id = c.req.param('id');
		if (isNaN(parseInt(id))) {
			return c.json({
				success: false,
				data: null,
				msg: 'Wrong data format, please check your input',
			});
		}
		const deletedTodo = await todoModel.DeletingTodo(parseInt(id));
		return c.json({
			success: true,
			data: deletedTodo,
			msg: 'Delete the Todo!',
		});
	} catch (e) {
		return c.json(
			{
				success: false,
				data: null,
				msg: `Internal Server Error : ${e}`,
			},
			500
		);
	}
};

export { GetTheTodo, AddTheTodo, EditTheTodo , CompleteTheTodo, DeleteTheTodo };
