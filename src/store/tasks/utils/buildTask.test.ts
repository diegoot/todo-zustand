import { describe, expect, it } from "vitest";
import { buildTask } from "./buildTask";

describe("buildTask", () => {
    it("sets the initial status to 'new'", () => {
        const task = buildTask({ description: "Write tests" });

        expect(task.status).toBe("new");
    });

    it("keeps the given description", () => {
        const task = buildTask({ description: "Write tests" });

        expect(task.description).toBe("Write tests");
    });

    it("generates a unique id for each task", () => {
        const first = buildTask({ description: "First" });
        const second = buildTask({ description: "Second" });

        expect(first.id).toBeDefined();
        expect(second.id).toBeDefined();
        expect(first.id).not.toBe(second.id);
    });
});
