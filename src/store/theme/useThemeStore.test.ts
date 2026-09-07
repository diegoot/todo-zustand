// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { useThemeStore } from "./useThemeStore";

beforeEach(() => {
    localStorage.clear();
    useThemeStore.setState({ theme: 'light' });
});

describe("useThemeStore", () => {
    it("defaults to 'light' theme", () => {
        expect(useThemeStore.getState().theme).toBe("light");
    });

    it("toggleTheme switches from 'light' to 'dark' and back", () => {
        useThemeStore.getState().toggleTheme();
        expect(useThemeStore.getState().theme).toBe("dark");

        useThemeStore.getState().toggleTheme();
        expect(useThemeStore.getState().theme).toBe("light");
    });

    it("persists the theme in localStorage under 'theme-storage'", () => {
        useThemeStore.getState().toggleTheme();

        const stored = JSON.parse(localStorage.getItem("theme-storage") ?? "{}");
        expect(stored.state.theme).toBe("dark");
    });
});
