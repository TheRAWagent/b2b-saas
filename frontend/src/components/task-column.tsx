import { TaskStatus, type Task } from "../types";
import TaskCard from "./task-card";

const STATUS_LABELS = {
  [TaskStatus.PENDING]: "To Do",
  [TaskStatus.STARTED]: "In Progress",
  [TaskStatus.COMPLETED]: "Done"
}

function TaskColumn({ status, tasks, onEdit, onDelete }: { status: TaskStatus, tasks: Task[], onEdit?: (task: Task) => void, onDelete?: (taskId: string) => void }) {
  return <div className={"kanban-column"}>
    <div className={`kanban-column-header kanban-column-header-${status}`}>
      <h3 className={"kanban-column-title"}>{STATUS_LABELS[status]}</h3>
      <span className={"kanban-column-count"}>{tasks.length}</span>
    </div>
    <div className={"kanban-column-body"}>
      {tasks.map(task =>
      (<TaskCard
        key={task.id}
        task={task}
        onEdit={onEdit}
        onDelete={onDelete}
      />))}
    </div>
  </div>
}

export default TaskColumn