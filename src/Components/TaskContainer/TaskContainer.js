import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from '../TaskCard/TaskCard';
import './TaskContainer.css';

const TaskContainer = ({ tasks, onDelete, onUpdate, onDrop }) => {
    const todoTasks = tasks.filter(task => task.status === 'todo');
    const inProgressTasks = tasks.filter(task => task.status === 'inprogress');
    const doneTasks = tasks.filter(task => task.status === 'done');

    const [, dropTodo] = useDrop({
        accept: 'TASK',
        drop: (item) => onDrop(item.id, 'todo', item),
    });

    const [, dropInProgress] = useDrop({
        accept: 'TASK',
        drop: (item) => onDrop(item.id, 'inprogress', item),
    });

    const [, dropDone] = useDrop({
        accept: 'TASK',
        drop: (item) => onDrop(item.id, 'done', item),
    });

    return (
        <div className="task-container">
            <div className="task-column" ref={dropTodo}>
                <div className='header-name'>TODO</div>
                <div className="task-list">
                    {todoTasks.map(task => (
                        <TaskCard key={task._id} task={task} onDelete={onDelete} onUpdate={onUpdate} />
                    ))}
                </div>
            </div>
            <div className="task-column" ref={dropInProgress}>
                <div className='header-name'>IN PROGRESS</div>
                <div className="task-list">
                    {inProgressTasks.map(task => (
                        <TaskCard key={task._id} task={task} onDelete={onDelete} onUpdate={onUpdate} />
                    ))}
                </div>
            </div>
            <div className="task-column" ref={dropDone}>
                <div className='header-name'>DONE</div>
                <div className="task-list">
                    {doneTasks.map(task => (
                        <TaskCard key={task._id} task={task} onDelete={onDelete} onUpdate={onUpdate} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TaskContainer;
