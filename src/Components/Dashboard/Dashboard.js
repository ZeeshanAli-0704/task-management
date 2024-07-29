import React, { useState, useEffect } from "react";
import SearchBar from "../Search/SearchBar";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskContainer from "../TaskContainer/TaskContainer";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: "", status: "todo", content: "" });
    const [showAddTaskForm, setShowAddTaskForm] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const type = localStorage.getItem("type");
        if (!token) {
            navigate("/");
            return;
        }

        const validateToken = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/validate-token`, { token, type });
                setUser(response.data.user);
            } catch (error) {
                console.error("Token validation failed: ", error);
                localStorage.removeItem("token");
                navigate("/");
            }
        };

        const fetchTodos = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/todos`);
                setTasks(response.data);
            } catch (error) {
                console.error("Failed to fetch todos: ", error);
            }
        };

        validateToken();
        fetchTodos();
    }, [navigate]);

    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/todos/delete/${taskId}`);
            setTasks(tasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error("Failed to delete task: ", error);
        }
    };

    const handleDrop = async (id, newStatus) => {
        let taskToUpdate = tasks.filter((eachtask) => eachtask._id === id);
        if (taskToUpdate) {
            taskToUpdate = { ...taskToUpdate[0], status: newStatus };
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/todos/update/${id}`, taskToUpdate);
                setTasks(tasks.map(task => (task._id === id ? response.data : task)));
            } catch (error) {
                console.error("Failed to update task: ", error);
            }
        }
    };

    const handleUpdate = async (updatedTask) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/todos/update/${updatedTask._id}`, updatedTask);
            setTasks(tasks.map(task => (task._id === updatedTask._id ? response.data : task)));
        } catch (error) {
            console.error("Failed to update task: ", error);
        }
    };

    const handleAddTask = async () => {
        const taskToAdd = { ...newTask, userId: 1 };
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/todos/create`, taskToAdd);
            setTasks([...tasks, response.data]);
            setNewTask({ title: "", status: "todo", content: "", completed: false });
            setShowAddTaskForm(false);
        } catch (error) {
            console.error("Failed to add task: ", error);
        }
    };

    const onSearch = (queryStr) => {
        // 
    };

    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <div className="add-container">
                <button className="add-task-button" onClick={() => setShowAddTaskForm(true)}>Add Task</button>
            </div>

            {showAddTaskForm && (
                <div className="modal">
                    <div className="modal-main">
                        <div className="add-task-form">
                            <div className="add-title">Title</div>
                            <input
                                type="text"
                                placeholder="Title"
                                value={newTask.title}
                                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            />
                            <div className="add-title">Description</div>
                            <input
                                type="text"
                                placeholder="Add description"
                                value={newTask.content}
                                onChange={(e) => setNewTask({ ...newTask, content: e.target.value })}
                            />
                            <button onClick={handleAddTask}>Submit</button>
                            <button className="modal-close-button" onClick={() => setShowAddTaskForm(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* <SearchBar onSearch={onSearch} /> */}
            {tasks.length ?
                <DndProvider backend={HTML5Backend}>
                    <TaskContainer tasks={tasks} onDelete={handleDelete} onUpdate={handleUpdate} onDrop={handleDrop} />
                </DndProvider> : null}
        </div>
    );
};

export default Dashboard;
