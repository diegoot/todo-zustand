import { useShallow } from "zustand/shallow";
import { useTaskStore, type Status } from "../../../store/tasks/useTaskStore";
import TaskCard from "./TaskCard";

interface TaskColumnProps {
    title: string;
    status: Status;
}

const columnStyles: Record<Status, { header: string; badge: string }> = {
    new: {
        header: "border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
        badge: "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
    },
    "in-progress": {
        header: "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
        badge: "bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    },
    done: {
        header: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",
        badge: "bg-emerald-200 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
    },
};

const TaskColumn = ({ status, title }: TaskColumnProps) => {
    const tasks = useTaskStore(
        useShallow((state) => state.tasks.filter((t) => t.status === status))
    );
    const styles = columnStyles[status];

    return (
        <div className="flex min-h-64 flex-col rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div
                className={`flex items-center justify-between rounded-t-xl border-b px-4 py-3 ${styles.header}`}
            >
                <h2 className="text-sm font-semibold uppercase tracking-wide">{title}</h2>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles.badge}`}>
                    {tasks.length}
                </span>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-3">
                {tasks.length === 0 ? (
                    <p className="py-8 text-center text-sm text-slate-400 dark:text-slate-500">No tasks</p>
                ) : (
                    tasks.map((task) => <TaskCard key={task.id} task={task} />)
                )}
            </div>
        </div>
    );
};

export default TaskColumn;
