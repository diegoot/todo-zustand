import { create } from "zustand"
import { transitionTask } from "./utils/transitionTask";
import { buildTask } from "./utils/buildTask";
import { persist } from "zustand/middleware";

export type Status = 'new' | 'in-progress' | 'done'

export type Task = {
    id: string;
    description: string;
    status: Status
}

export type UiTask = Omit<Task, "id" | "status">;

interface TaskStore {
    tasks: Task[];
    addTask: (task: UiTask) => void;
    transitionTask: (task: Task)   => void;
}

export const useTaskStore = create<TaskStore>()(persist(set => ({
    tasks: [],
    addTask: (task: UiTask) => set(state => ({ tasks: [...state.tasks, buildTask(task)] })),
    transitionTask: (task: Task) => set(state => ({ tasks: transitionTask( state.tasks, task) }))
}), {name: "tasks-storage"}))
