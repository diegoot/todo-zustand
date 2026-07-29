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

    return (
        <div className="group flex items-start justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3 transition hover:border-slate-200 hover:shadow-sm">
            <p className="flex-1 text-sm leading-snug text-slate-800">{task.description}</p>
            <button
                onClick={() => transitionTask(task)}
                title={nextStatusLabel[task.status]}
                className="shrink-0 rounded-md bg-white px-2.5 py-1 text-xs font-medium text-violet-600 shadow-sm ring-1 ring-slate-200 transition hover:bg-violet-50 hover:ring-violet-200"
            >
                →
            </button>
        </div>
    );
};

export default TaskCard;
