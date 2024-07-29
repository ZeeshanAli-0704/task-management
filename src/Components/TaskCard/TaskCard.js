import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import './TaskCard.css';

const TaskCard = ({ task, onDelete, onUpdate }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDelete = () => {
    onDelete(task._id);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(editedTask);
    setIsEditModalOpen(false);
  };

  return (
    <div className="task-card" ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <h3 className="task-card-title">{task.title}</h3>
      <div className='task-card-content'>
        {task.content}
      </div>
      <div className='task-card-date'>Date:{task.createdDate}</div>
      <div className="task-card-buttons">
        <button className="task-card-button delete-button" onClick={handleDelete}>Delete</button>
        <button className="task-card-button edit-button" onClick={() => setIsEditModalOpen(true)}>Edit</button>
        <button className="task-card-button view-details-button" onClick={() => setIsViewModalOpen(true)}>View Details</button>
      </div>

      {isViewModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Task Details</h2>
            <p><strong>Title:</strong> {task.title}</p>
            <p><strong>Description:</strong> {task.content}</p>
            <p><strong>Created at:</strong> {task.createdDate}</p>
            <button className="cancel-button" onClick={() => setIsViewModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Task</h2>
            <label>
              Title
              <input type="text" name="title" value={editedTask.title} onChange={handleEditChange} />
            </label>
            <label>
              Description
              <input type="text" name="content" value={editedTask.content} onChange={handleEditChange} />
            </label>
            <button className="save-button" onClick={handleSave}>Save</button>
            <button className="cancel-button" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
