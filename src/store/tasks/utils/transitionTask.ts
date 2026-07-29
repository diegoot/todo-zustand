import type { Status, Task } from "../useTaskStore";

export const transitionTask = (tasks: Task[], task: Task): Task[] => {
    return tasks.map(t => {
        if (t.id !== task.id) return t;
        let newStatus: Status;
        switch (t.status) {
            case "new":
                newStatus = "in-progress";
                break;
            case "in-progress":
                newStatus = "done";
                break;
            case "done":
                newStatus = "new";
                break;
            default:
                const _exhaustiveCheck: never = t.status;
                return _exhaustiveCheck;
        }
        return {...t, status: newStatus};
    });
}