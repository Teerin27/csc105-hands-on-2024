import type { Context } from 'hono';
import * as userModel from '../model/user.model.ts';
import * as todoModelExt from '../model/todo.model.extended.ts';
import type { UserUpdateRequest, TodoTitleUpdateRequest, TodoStatusUpdateRequest } from '../types/user.types.ts';


const getAllUsers = async (c: Context) => {
  try {
    // Retrieve all users
    const users = await userModel.fetchAllUsers();
    
    return c.json({
      status: true,
      data: users,
      message: 'Successfully retrieved all users'
    });
  } catch (error) {
    return c.json({
      status: false,
      data: null,
      message: `Server error: ${error}`
    }, 500);
  }
};


const updateUserProfile = async (c: Context) => {
  try {
    // Parse request body
    const requestData = await c.req.json<UserUpdateRequest>();
    
    // Validate required fields
    if (!requestData.firstName || !requestData.lastName || !requestData.userId) {
      return c.json({
        status: false,
        data: null,
        message: 'Missing required fields: firstName, lastName, or userId'
      }, 400);
    }
    
    // Update user profile
    const updatedUser = await userModel.modifyUserNames(
      requestData.userId,
      requestData.firstName,
      requestData.lastName
    );
    
    return c.json({
      status: true,
      data: updatedUser,
      message: 'User profile updated successfully'
    });
  } catch (error) {
    return c.json({
      status: false,
      data: null,
      message: `Server error: ${error}`
    }, 500);
  }
};


const getUserTodos = async (c: Context) => {
  try {
    // Get user ID from URL param
    const userId = c.req.param('userId');
    
    // Validate user ID
    if (isNaN(parseInt(userId))) {
      return c.json({
        status: false,
        data: null,
        message: 'Invalid user ID format'
      }, 400);
    }
    
    // Fetch todos for this user
    const todos = await userModel.fetchUserTodos(parseInt(userId));
    
    return c.json({
      status: true,
      data: todos,
      message: `Retrieved todos for user ID: ${userId}`
    });
  } catch (error) {
    return c.json({
      status: false,
      data: null,
      message: `Server error: ${error}`
    }, 500);
  }
};


const completeTodoItem = async (c: Context) => {
  try {
    // Get todo ID from request body
    const requestData = await c.req.json<TodoStatusUpdateRequest>();
    
    // Validate todo ID
    if (!requestData.todoId) {
      return c.json({
        status: false,
        data: null,
        message: 'Missing required field: todoId'
      }, 400);
    }
    
    // Mark todo as complete
    const completedTodo = await todoModelExt.markTodoComplete(requestData.todoId);
    
    return c.json({
      status: true,
      data: completedTodo,
      message: 'Todo marked as complete'
    });
  } catch (error) {
    return c.json({
      status: false,
      data: null,
      message: `Server error: ${error}`
    }, 500);
  }
};


const updateTodoTitle = async (c: Context) => {
  try {
    // Get todo ID and new title from request body
    const requestData = await c.req.json<TodoTitleUpdateRequest>();
    
    // Validate required fields
    if (!requestData.todoId || !requestData.newTitle) {
      return c.json({
        status: false,
        data: null,
        message: 'Missing required fields: todoId or newTitle'
      }, 400);
    }
    
    // Update todo title
    const updatedTodo = await todoModelExt.renameTodoTitle(
      requestData.todoId,
      requestData.newTitle
    );
    
    return c.json({
      status: true,
      data: updatedTodo,
      message: 'Todo title updated successfully'
    });
  } catch (error) {
    return c.json({
      status: false,
      data: null,
      message: `Server error: ${error}`
    }, 500);
  }
};

export { 
  getAllUsers, 
  updateUserProfile, 
  getUserTodos, 
  completeTodoItem, 
  updateTodoTitle 
};