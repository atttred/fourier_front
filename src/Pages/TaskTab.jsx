import React, { useState, useEffect } from "react";
import "../styles/styles.scss";

const TasksTab = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newTask, setNewTask] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const taskPerPage = 5;

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString.replace('З', 'Z'));
            
            if (isNaN(date.getTime())) return 'Invalid Date';
            
            return date.toLocaleString('uk-UA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid Date';
        }
    };

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/Problem', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Fetched tasks:', data);
                setTasks(data.$values || []);
            } else {
                console.error('Failed to fetch tasks');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async () => {
        if (!newTask || isNaN(newTask)) {
            alert('Invalid input');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/Problem/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: JSON.stringify({ input: parseInt(newTask) }),
            });

            if (response.ok) {
                setNewTask('');
                fetchTasks();
            } else {
                alert('Failed to create task');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCancelTask = async (taskId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/Problem/${taskId}/cancel`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            if (response.ok) {
                fetchTasks();
            } else {
                alert('Failed to cancel task');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
        const intervalId = setInterval(fetchTasks, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const indexOfLastTask = currentPage * taskPerPage;
    const indexOfFirstTask = indexOfLastTask - taskPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
    const totalPages = Math.ceil(tasks.length / taskPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

     return (
        <div className="tasks-overview">
            <h2>Tasks</h2>
            {loading ? (
                <p>Loading tasks...</p>
            ) : (
                <>
                    <ul className="tasks-list">
                        {currentTasks.length > 0 ? (
                            currentTasks.map((task) => (
                                <li key={task.id} className="task-item">
                                    <div className="task-details">
                                        <div className="task-main-info">
                                            <strong>Task: {task.input}</strong> - Status: {task.status} - Progress: {task.progress}%
                                        </div>
                                        <div className="task-dates">
                                            <div>Start: {formatDate(task.startedAt)}</div>
                                            <div>End: {formatDate(task.finishedAt)}</div>
                                        </div>
                                    </div>
                                    <div className="task-actions">
                                        {task.progress === 100 ? (
                                            <button onClick={() => alert(`Result: ${task.result}`)}>Show Result</button>
                                        ) : (
                                            task.status !== 'Canceled' && (
                                                <button onClick={() => handleCancelTask(task.id)}>Cancel</button>
                                            )
                                        )}
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>No tasks found</p>
                        )}
                    </ul>
                    <div className="pagination">
                        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage >= totalPages}
                        >
                            Next
                        </button>
                    </div>
                    <div className="create-task">
                        <input
                            type="number"
                            placeholder="New task input"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />
                        <button onClick={handleCreateTask}>Create Task</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TasksTab;