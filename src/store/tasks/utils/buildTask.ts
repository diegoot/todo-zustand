import type { Task, UiTask } from "../useTaskStore";

export const buildTask = (task: UiTask): Task => {
    return {id: crypto.randomUUID(), status: "new", ...task }
}