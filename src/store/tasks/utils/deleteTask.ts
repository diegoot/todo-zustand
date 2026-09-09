import type { Task } from "../useTaskStore";

export const deleteTask = (tasks: Task[], id: string): Task[] => {
    return tasks.filter(t => t.id !== id);
}
