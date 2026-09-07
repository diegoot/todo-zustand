import { useRef, useState } from "react";
import { useTaskStore, type Status, type Task } from "../../../store/tasks/useTaskStore";

interface TaskCardProps {
    task: Task;
}

const nextStatusLabel: Record<Status, string> = {
    new: "Start",
    "in-progress": "Complete",
    done: "Reset",
};

const TaskCard = ({ task }: TaskCardProps) => {
    const transitionTask = useTaskStore((state) => state.transitionTask);
    const editTask = useTaskStore((state) => state.editTask);
    const deleteTask = useTaskStore((state) => state.deleteTask);

    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(task.description);
    const cancelledRef = useRef(false);

    const startEditing = () => {
        setDescription(task.description);
        cancelledRef.current = false;
        setIsEditing(true);
    };

    const commitEdit = () => {
        if (cancelledRef.current) {
            cancelledRef.current = false;
            return;
        }
        const trimmed = description.trim();
        if (trimmed) {
            editTask(task.id, trimmed);
            setIsEditing(false);
        } else {
            setDescription(task.description);
        }
    };

    const cancelEdit = () => {
        cancelledRef.current = true;
        setDescription(task.description);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            commitEdit();
        } else if (e.key === "Escape") {
            cancelEdit();
        }
    };

    return (
        <div className="group flex items-start justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3 transition hover:border-slate-200 hover:shadow-sm">
            {isEditing ? (
                <input
                    type="text"
                    autoFocus
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={commitEdit}
                    onKeyDown={handleKeyDown}
                    className="flex-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-800 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/20"
                />
            ) : (
                <p className="flex-1 text-sm leading-snug text-slate-800">{task.description}</p>
            )}
            <div className="flex shrink-0 items-center gap-1.5">
                <button
                    onClick={() => deleteTask(task.id)}
                    title="Delete"
                    className="shrink-0 rounded-md bg-white px-2.5 py-1 text-xs font-medium text-rose-600 shadow-sm ring-1 ring-slate-200 transition hover:bg-rose-50 hover:ring-rose-200"
                >
                    🗑
                </button>
                <button
                    onClick={startEditing}
                    title="Edit"
                    className="shrink-0 rounded-md bg-white px-2.5 py-1 text-xs font-medium text-violet-600 shadow-sm ring-1 ring-slate-200 transition hover:bg-violet-50 hover:ring-violet-200"
                >
                    ✎
                </button>
                <button
                    onClick={() => transitionTask(task)}
                    title={nextStatusLabel[task.status]}
                    className="shrink-0 rounded-md bg-white px-2.5 py-1 text-xs font-medium text-violet-600 shadow-sm ring-1 ring-slate-200 transition hover:bg-violet-50 hover:ring-violet-200"
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
