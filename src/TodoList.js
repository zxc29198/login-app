import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Card, CardContent, Typography, Button, Checkbox, TextField } from '@mui/material';

function TodoList({ userId }) {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [editingText, setEditingText] = useState('');

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

    const startEditing = (id, currentText) => {
        setEditingTask(id);
        setEditingText(currentText);
    };

    const saveEdit = async (id) => {
        const { error } = await supabase
            .from('todos')
            .update({ task: editingText })
            .eq('id', id);

        if (error) {
            console.error('Error updating todo:', error);
        } else {
            setTodos(todos.map(todo => todo.id === id ? { ...todo, task: editingText } : todo));
            setEditingTask(null);
            setEditingText('');
        }
    };

    return (
        <div className="todo-list">
            {todos.map(todo => (
                <Card key={todo.id} sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Checkbox
                                checked={todo.is_completed}
                                onChange={() => toggleComplete(todo.id, todo.is_completed)}
                            />
                            {editingTask === todo.id ? (
                                <TextField
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                    onBlur={() => saveEdit(todo.id)}
                                    autoFocus
                                />
                            ) : (
                                <Typography
                                    variant="h6"
                                    component="div"
                                    style={{ textDecoration: todo.is_completed ? 'line-through' : 'none', flexGrow: 1 }}
                                    onDoubleClick={() => startEditing(todo.id, todo.task)}
                                >
                                    {todo.task}
                                </Typography>
                            )}
                            <Button color="error" onClick={() => deleteTodo(todo.id)}>
                                刪除
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
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
        </div>
    );
}

export default TodoList;