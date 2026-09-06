import { describe, expect, it } from "vitest";
import type { Task } from "../useTaskStore";
import { transitionTask } from "./transitionTask";

const makeTask = (overrides: Partial<Task> = {}): Task => ({
    id: "1",
    description: "Task",
    status: "new",
    ...overrides,
});

describe("transitionTask", () => {
    it("moves a task from 'new' to 'in-progress'", () => {
        const task = makeTask({ status: "new" });

        const [updated] = transitionTask([task], task);

        expect(updated.status).toBe("in-progress");
    });

    it("moves a task from 'in-progress' to 'done'", () => {
        const task = makeTask({ status: "in-progress" });

        const [updated] = transitionTask([task], task);

        expect(updated.status).toBe("done");
    });

    it("moves a task from 'done' back to 'new'", () => {
        const task = makeTask({ status: "done" });

        const [updated] = transitionTask([task], task);

        expect(updated.status).toBe("new");
    });

    it("leaves tasks that don't match the given id unchanged", () => {
        const target = makeTask({ id: "1", status: "new" });
        const other = makeTask({ id: "2", status: "in-progress" });

        const result = transitionTask([target, other], target);
        const untouched = result.find((t) => t.id === "2");

        expect(untouched).toEqual(other);
    });
});
