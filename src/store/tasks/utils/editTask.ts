import type { Task } from "../useTaskStore";

export const editTask = (tasks: Task[], id: string, description: string): Task[] => {
    return tasks.map(t => t.id === id ? { ...t, description } : t);
}
