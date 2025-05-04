import { Todo } from '../types/todo';
import { Axios } from '../utils/axiosInstance';

type arraysTodoResponsive = {
	success: boolean;
	data: Todo[]  //array
	| null;
	msg: string;
};

type singleTodoResponsive = {
	success: boolean;
	data: Todo | null;
	msg: string;
};

const getTheTodo = async () => {
	try {
		const response = await Axios.get<arraysTodoResponsive>('/todo');
		return response.data;

	} catch (e) {
		console.log(e);
		return {
			success: false,
			data: null,
			msg: `${e}`,
		};
	}
};

const addTheTodo = async (name: string) => {
	try {
		const response = await Axios.post<singleTodoResponsive>('/todo', {
			name: name,
		});
		return response.data;
	} catch (e) {
		console.log(e);
		return {
			success: false,
			data: null,
			msg: `${e}`,
		};
	}
};

const editTheTodo = async (id: number, name: string) => {
	try {
		const response = await Axios.patch<singleTodoResponsive>('/todo', {
			id, name,
		});
		return response.data;
	} catch (e) {
		console.log(e);
		return {
			success: false,
			data: null,
			msg: `${e}`,
		};
	}
};

const successTodo = async (id: number) => {
	try {
		const response = await Axios.patch<singleTodoResponsive>(`/todo/success/${id}`);
		return response.data;
	} catch (e) {
		console.log(e);
		return {
			success: false,
			data: null,
			msg: `${e}`,
		};
	}
};

const deleteTheTodo = async (id: number) => {
	try {
		const response = await Axios.delete<singleTodoResponsive>(`/todo/${id}`);
		return response.data;
	} catch (e) {
		console.log(e);
		return {
			success: false,
			data: null,
			msg: `${e}`,
		};
	}
};

export { getTheTodo, addTheTodo, editTheTodo, successTodo, deleteTheTodo };
