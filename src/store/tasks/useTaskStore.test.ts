// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { useTaskStore } from "./useTaskStore";

beforeEach(() => {
    localStorage.clear();
    useTaskStore.setState({ tasks: [] });
});

describe("useTaskStore", () => {
    it("addTask appends a new task with status 'new'", () => {
        useTaskStore.getState().addTask({ description: "Write tests" });

        const { tasks } = useTaskStore.getState();

        expect(tasks).toHaveLength(1);
        expect(tasks[0]).toMatchObject({ description: "Write tests", status: "new" });
    });

    it("transitionTask advances the matching task's status", () => {
        useTaskStore.getState().addTask({ description: "Write tests" });
        const [task] = useTaskStore.getState().tasks;

        useTaskStore.getState().transitionTask(task);

        const [updated] = useTaskStore.getState().tasks;
        expect(updated.status).toBe("in-progress");
    });

    it("editTask updates the matching task's description", () => {
        useTaskStore.getState().addTask({ description: "Write tests" });
        const [task] = useTaskStore.getState().tasks;

        useTaskStore.getState().editTask(task.id, "Write more tests");

        const [updated] = useTaskStore.getState().tasks;
        expect(updated).toMatchObject({ description: "Write more tests", status: "new" });
    });

    it("deleteTask removes the matching task", () => {
        useTaskStore.getState().addTask({ description: "Write tests" });
        const [task] = useTaskStore.getState().tasks;

        useTaskStore.getState().deleteTask(task.id);

        const { tasks } = useTaskStore.getState();
        expect(tasks).toHaveLength(0);
    });
});
