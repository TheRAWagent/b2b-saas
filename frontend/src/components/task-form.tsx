import {useState, useEffect} from "react"
import { TaskStatus, type CreateTask, type Task } from "../types"

function TaskForm({task, onSubmit, onCancel}: {task: Task | null, onSubmit: (task: CreateTask) => void, onCancel: () => void}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState(TaskStatus.PENDING)

    const isEditing = !!task

    useEffect(() => {
        if (task) {
            setTitle(task.title)
            setDescription(task.description || "")
            setStatus(task.status)
        } else {
            setTitle("")
            setDescription("")
            setStatus(TaskStatus.PENDING)
        }
    }, [task])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!title.trim()) return

        onSubmit(
            {title: title.trim(), description: description.trim(), status}
        )
    }

    return <div className={"modal-overlay"} onClick={onCancel}>
        <div className={"modal"} onClick={(e) => e.stopPropagation()}>
            <div className={"modal-header"}>
                <h2 className={"modal-title"}>{isEditing ? "Edit Task" : "New Task"}</h2>
                <button className={"modal-close"} onClick={onCancel}>x</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={"form-group"}>
                    <label className={"form-label"} htmlFor={"title"}>Title</label>
                    <input
                        id={"title"}
                        type={"text"}
                        className={"form-input"}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={"Enter task title"}
                        autoFocus
                    />
                </div>
                <div className={"form-group"}>
                    <label className={"form-label"} htmlFor={"description"}>Description</label>
                    <textarea
                        id={"description"}
                        className={"form-textarea"}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={"Enter description (optional)"}
                        autoFocus
                    />
                </div>
                <div className={"form-group"}>
                    <label className={"form-label"} htmlFor={"status"}>Status</label>
                    <select
                        id={"status"}
                        className={"form-select"}
                        value={status}
                        onChange={(e) => setStatus(e.target.value as TaskStatus)}
                    >
                        <option value={TaskStatus.PENDING}>To Do</option>
                        <option value={TaskStatus.STARTED}>In Progress</option>
                        <option value={TaskStatus.COMPLETED}>Done</option>
                    </select>
                </div>
                <div className={"form-actions"}>
                    <button type={"button"} className={"btn btn-outline"} onClick={onCancel}>
                        Cancel
                    </button>
                    <button type={"submit"} className={"btn btn-primary"}>
                        {isEditing ? "Save Changes" : "Create Task"}
                    </button>
                </div>
            </form>
        </div>
    </div>
}

export default TaskForm
