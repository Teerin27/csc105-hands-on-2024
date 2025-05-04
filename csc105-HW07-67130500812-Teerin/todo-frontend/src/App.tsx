import { useState, useEffect } from 'react';
import { Todo } from './types/todo';
import { TodoCard } from './components/todoCard';
import * as todoAPI from './api/todoAPI';

function App() {
	const [todos, setTheTodos] = useState<Todo[]>([]);
	const [newTodoName, setName] = useState<string>('');

	async function Add() {
		const response = await todoAPI.addTheTodo(newTodoName);
		if (!response.success) {
			alert(response.msg);
		}
		FetchingTodoData(); //Relaod todo list from backend
		setName('');
	}
	async function Edit(id: number, newName: string) {
		const response = await todoAPI.editTheTodo(id, newName);
		if (!response.success) {
			alert(response.msg);
		}
		FetchingTodoData();
	}
	async function Success(id: number) {
		const response = await todoAPI.successTodo(id);
		if (!response.success) {
			alert(response.msg);
		}
		FetchingTodoData();
	}
	async function Delete(id: number) {
		const response = await todoAPI.deleteTheTodo(id);

		if (!response.success) {
			alert(response.msg);
		}
		FetchingTodoData();
	}

	async function FetchingTodoData() {
		const response = await todoAPI.getTheTodo();
		if (response.success && response.data !== null) {
			setTheTodos(response.data);
		}
	}

	useEffect(() => {

		FetchingTodoData();
	}, []);

	return (

		<div className='w-screen h-screen bg-no-repeat bg-center bg-blend-color-dodge bg-contain bg-blue-400  flex items-center justify-center'
		
		style={{backgroundImage: "url('https://m.media-amazon.com/images/I/813kqvYoRfL.png')",
		  }}>
			<div className='flex flex-col gap-10 text-shadow-black'>
				<h1 className='text-3xl font-bold text-black drop-shadow-md'>GUNDAM</h1>
				<div>
					<input
						placeholder='New Todo'
						value={newTodoName}
						onChange={(e) => setName(e.target.value)}
					/>
					<button onClick={Add}>Add Todo</button>
				</div>
				{todos.map((todo, index: number) => (
					<TodoCard
						key={index}
						todo={todo}
						handleDelete={Delete}
						handleEdit={Edit}
						handleSuccess={Success}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
