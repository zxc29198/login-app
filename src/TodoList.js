import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

function TodoList({ userId }) {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState('');

    // 讀取待辦事項
    useEffect(() => {
        const fetchTodos = async () => {
            const { data, error } = await supabase
                .from('todos')
                .select('*')
                .eq('user_id', userId);

            if (error) {
                console.error('Error fetching todos:', error);
            } else {
                setTodos(data);
            }
        };

        fetchTodos();
    }, [userId]);

    // 新增待辦事項
    const addTodo = async () => {
        if (!newTask.trim()) return;

        const { data, error } = await supabase
            .from('todos')
            .insert([{ task: newTask, is_completed: false, user_id: userId }]);

        if (error) {
            console.error('Error adding todo:', error);
        } else {
            setTodos([...todos, ...data]);
            setNewTask('');
        }
    };

    // 切換完成狀態
    const toggleComplete = async (id, isCompleted) => {
        const { error } = await supabase
            .from('todos')
            .update({ is_completed: !isCompleted })
            .eq('id', id);

        if (error) {
            console.error('Error toggling complete:', error);
        } else {
            setTodos(todos.map(todo => todo.id === id ? { ...todo, is_completed: !isCompleted } : todo));
        }
    };

    // 刪除待辦事項
    const deleteTodo = async (id) => {
        const { error } = await supabase
            .from('todos')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting todo:', error);
        } else {
            setTodos(todos.filter(todo => todo.id !== id));
        }
    };

    return (
        <div className="card shadow-lg mx-auto" style={{ maxWidth: '600px', marginTop: '20px' }}>
            <div className="card-body">
                <h2 className="card-title text-center">待辦事項清單</h2>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="新增待辦事項..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <button className="btn btn-primary w-100 mt-2" onClick={addTodo}>新增</button>
                </div>
                <ul className="list-group">
                    {todos.map(todo => (
                        <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span
                                style={{ textDecoration: todo.is_completed ? 'line-through' : 'none', cursor: 'pointer' }}
                                onClick={() => toggleComplete(todo.id, todo.is_completed)}
                            >
                                {todo.task}
                            </span>
                            <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(todo.id)}>刪除</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TodoList;