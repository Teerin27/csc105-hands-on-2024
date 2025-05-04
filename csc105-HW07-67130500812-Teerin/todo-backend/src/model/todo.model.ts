import { db } from '../index.ts';

const GettingTodo = async () => {   //get input
	const todo = await db.todo.findMany(); //sent to controller get method
	return todo;
};

const AddingTodo = async (newCreateTodo: string) => {  
	const newtodo = await db.todo.create({ 
		data: {
			name: newCreateTodo,  //create todo
		},
	});
	return newtodo;
};

const EdittingTodo = async (todoNumberId: number, edittingTodo: string) => {
	const editFinishTodo = await db.todo.update({
		where: {
			id: todoNumberId,  //find that todo id
		},
		data: {
			name: edittingTodo, //edit name of that id
		},
	});
	return editFinishTodo;
};

const SuccessTodo = async (todoNumberId: number) => {
	const completeConditionTodo = await db.todo.update({
		where: {
			id: todoNumberId, //find that id
		},
		data: {
			success: true,  //boolean check from false to true
		},
	});
	return completeConditionTodo;
};

const DeletingTodo = async (todoNumberId: number) => {
	const deleteThisTodo = await db.todo.delete({
		where: {
			id: todoNumberId,  //delete the id
		},
	});
	return deleteThisTodo;
};

export { GettingTodo, AddingTodo, EdittingTodo, SuccessTodo, DeletingTodo };
