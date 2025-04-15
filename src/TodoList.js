import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

function TodoList({ userId }) {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [showAddTask, setShowAddTask] = useState(false);

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
            setShowAddTask(false);
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
                {todos.length === 0 ? (
                    <p className="text-center">尚無代辦清單</p>
                ) : (
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
                )}
            </div>

            {/* 浮動新增按鈕 */}
            <button
                className="btn btn-primary rounded-circle"
                style={{ position: 'fixed', bottom: '20px', right: '20px', width: '60px', height: '60px' }}
                onClick={() => setShowAddTask(true)}
            >
                +
            </button>

            {/* 新增代辦事項表單 */}
            {showAddTask && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">新增代辦事項</h5>
                                <button type="button" className="btn-close" onClick={() => setShowAddTask(false)}></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="輸入代辦事項..."
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowAddTask(false)}>取消</button>
                                <button className="btn btn-primary" onClick={addTodo}>新增</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TodoList;