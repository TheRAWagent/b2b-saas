import React, { useState } from "react"
import { useOrganization } from "@clerk/clerk-react"
import TaskColumn from "./task-column"
import { createTask, updateTask, deleteTask } from "../services/api"
const TaskForm = React.lazy(() => import("./task-form"));
import { type Task, TaskStatus, type CreateTask } from "../types";

const STATUSES = [TaskStatus.PENDING, TaskStatus.STARTED, TaskStatus.COMPLETED]

interface KanbanBoardProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  getToken: () => Promise<string | null>;
}

function KanbanBoard({ tasks, setTasks, getToken }: KanbanBoardProps) {
  const { membership } = useOrganization()
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const role = membership?.role
  // Check if user has admin or editor role
  const canManage = role === "org:admin" || role === "org:editor"

  function getTasksByStatus(status: TaskStatus) {
    return tasks.filter(task => task.status === status)
  }

  function handleEdit(task: Task) {
    setEditingTask(task)
    setShowForm(true)
  }

  async function handleDelete(taskId: string) {
    if (!confirm("Are you sure you want to delete this task?")) return

    const taskToDelete = tasks.find(t => t.id === taskId)
    if (!taskToDelete) return;

    // Optimistic update
    setTasks((prev) => prev.filter(t => t.id !== taskId))

    try {
      await deleteTask(getToken, taskId)
    } catch (err) {
      // Revert on failure
      setTasks((prev) => [...prev, taskToDelete])
      console.error(err)
      alert("Failed to delete task")
    }
  }

  async function handleSubmit(taskData: CreateTask) {
    if (editingTask) {
      // Optimistic update
      const optimisticTask = { ...editingTask, ...taskData }
      setTasks(prev => prev.map(t => t.id === editingTask.id ? optimisticTask : t))
      setShowForm(false)
      setEditingTask(null)

      try {
        const updatedTask = await updateTask(getToken, editingTask.id, taskData)
        // Confirmed update from server
        setTasks(prev => prev.map(t => t.id === editingTask.id ? updatedTask : t))
      } catch (err) {
        // Revert
        setTasks(prev => prev.map(t => t.id === editingTask.id ? editingTask : t))
        console.error(err)
        alert("Failed to update task")
      }
    } else {
      try {
        const newTask = await createTask(getToken, taskData)
        setTasks(prev => [...prev, newTask])
        setShowForm(false)
      } catch (err) {
        console.error(err)
        alert("Failed to create task")
      }
    }
  }

  function handleCancel() {
    setShowForm(false)
    setEditingTask(null)
  }

  function handleAddTask() {
    setEditingTask(null)
    setShowForm(true)
  }

  return (
    <div className="kanban-wrapper">
      <div className="kanban-header">
        <h2 className="kanban-title">Tasks</h2>
        {canManage && (
          <button className="btn btn-primary" onClick={handleAddTask}>
            + Add Task
          </button>
        )}
      </div>

      <div className="kanban-board">
        {STATUSES.map(status => (
          <TaskColumn
            key={status}
            status={status}
            tasks={getTasksByStatus(status)}
            onEdit={canManage ? handleEdit : undefined}
            onDelete={canManage ? handleDelete : undefined}
          />
        ))}
      </div>

      {showForm && (
        <React.Suspense fallback={<div>Loading form...</div>}>
          <TaskForm
            task={editingTask}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </React.Suspense>
      )}
    </div>
  )
}

export default KanbanBoard
