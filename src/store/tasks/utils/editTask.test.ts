import { describe, expect, it } from "vitest";
import type { Task } from "../useTaskStore";
import { editTask } from "./editTask";

const makeTask = (overrides: Partial<Task> = {}): Task => ({
    id: "1",
    description: "Task",
    status: "new",
    ...overrides,
});

describe("editTask", () => {
    it("updates the description of the matching task", () => {
        const task = makeTask({ description: "Old" });

        const [updated] = editTask([task], task.id, "New");

        expect(updated.description).toBe("New");
    });

    it("leaves the status untouched", () => {
        const task = makeTask({ status: "in-progress" });

        const [updated] = editTask([task], task.id, "New");

        expect(updated.status).toBe("in-progress");
    });

    it("leaves tasks that don't match the given id unchanged", () => {
        const target = makeTask({ id: "1", description: "Old" });
        const other = makeTask({ id: "2", description: "Other" });

        const result = editTask([target, other], target.id, "New");
        const untouched = result.find((t) => t.id === "2");

        expect(untouched).toEqual(other);
    });
});
