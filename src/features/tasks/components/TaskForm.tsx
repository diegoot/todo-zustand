import { useState } from "react";
import { useTaskStore } from "../../../store/tasks/useTaskStore";

const TaskForm = () => {
    const addTask = useTaskStore((state) => state.addTask);
    const [taskDescription, setTaskDescription] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (taskDescription.trim()) {
            addTask({ description: taskDescription.trim() });
            setTaskDescription("");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto mb-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
        >
            <input
                type="text"
                value={taskDescription}
                placeholder="Describe your task..."
                onChange={(e) => setTaskDescription(e.target.value)}
                className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
            <button
                type="submit"
                disabled={!taskDescription.trim()}
                className="rounded-lg bg-violet-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-violet-500 dark:hover:bg-violet-600"
            >
                Add
            </button>
        </form>
    );
};

export default TaskForm;
