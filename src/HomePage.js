import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardContent, Typography, Button, Checkbox, TextField } from '@mui/material';
import './App.css';

function HomePage({ currentUser, items }) {
    return (
        <div className="container">
            {currentUser ? (
                <>
                    <h2>歡迎回來，{currentUser.name}！這是您的代辦清單。</h2>
                    <TodoList userId={currentUser.id} />
                </>
            ) : (
                <h2>請先登入以查看代辦清單</h2>
            )}
        </div>
    );
}

function TodoList({ userId }) {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState('');

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

    const addTodo = async () => {
        if (!newTask.trim()) {
            console.log('新增失敗：newTask 為空');
            return;
        }

        try {
            const { data, error } = await supabase
                .from('todos')
                .insert([{ task: newTask, is_completed: false, user_id: userId }]);

            if (error) {
                console.error('Supabase 插入錯誤:', error);
                alert('新增失敗，請稍後再試！');
                return;
            }

            console.log('新增成功:', data);
            setTodos(prevTodos => [...prevTodos, ...data]);
            setNewTask('');
        } catch (err) {
            console.error('未知錯誤:', err);
            alert('發生未知錯誤，請稍後再試！');
        }
    };

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
        <div>
            <div style={{ marginTop: 16 }}>
                <TextField
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="新增待辦事項"
                    fullWidth
                />
                <Button onClick={addTodo} variant="contained" color="primary" style={{ marginTop: 8 }}>
                    新增
                </Button>
            </div>
            <div className="grid-container">
                {todos.map(todo => (
                    <Card key={todo.id} className="grid-item" sx={{ margin: 1 }}>
                        <CardContent>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox
                                    checked={todo.is_completed}
                                    onChange={() => toggleComplete(todo.id, todo.is_completed)}
                                />
                                <Typography
                                    variant="h6"
                                    component="div"
                                    style={{
                                        textDecoration: todo.is_completed ? 'line-through' : 'none',
                                        flexGrow: 1,
                                    }}
                                >
                                    {todo.task}
                                </Typography>
                                <Button color="error" onClick={() => deleteTodo(todo.id)}>
                                    刪除
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default HomePage;