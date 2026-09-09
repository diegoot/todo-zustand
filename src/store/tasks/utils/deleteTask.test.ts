import { describe, expect, it } from "vitest";
import type { Task } from "../useTaskStore";
import { deleteTask } from "./deleteTask";

const makeTask = (overrides: Partial<Task> = {}): Task => ({
    id: "1",
    description: "Task",
    status: "new",
    ...overrides,
});

describe("deleteTask", () => {
    it("removes the task with the matching id", () => {
        const task = makeTask({ id: "1" });

        const result = deleteTask([task], "1");

        expect(result).toHaveLength(0);
    });

    it("leaves tasks that don't match the given id unchanged", () => {
        const target = makeTask({ id: "1" });
        const other = makeTask({ id: "2" });

        const result = deleteTask([target, other], "1");

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(other);
    });
});
