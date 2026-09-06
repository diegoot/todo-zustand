# Todo Zustand

## Description

A Kanban-style task manager for organizing work across three stages — **New**, **In Progress**, and **Done**. Tasks can be created, moved between columns, and persist across browser sessions.

The project's focus is state management architecture: application state lives in a single Zustand store, colocated with pure helper functions that encapsulate the task-creation and status-transition logic, and is automatically persisted to `localStorage` via Zustand's `persist` middleware. The state layer (store actions and pure helpers) is covered by unit tests using Vitest.

## Tech Stack

- **React 19**
- **TypeScript**
- **Vite** — build tool and dev server
- **Zustand** — global state management, with the `persist` middleware for localStorage persistence
- **Tailwind CSS 4** — styling
- **oxlint** — linting
- **Vitest** — unit testing

## Project Structure

```
src/
├── features/tasks/        # UI layer: task board, columns, cards, and creation form
│   ├── TaskBoard.tsx
│   └── components/
├── store/tasks/            # State layer: Zustand store and its supporting logic
│   ├── useTaskStore.ts     # Store definition (state + actions), wrapped in `persist`
│   └── utils/               # Pure helpers used by the store (task creation, status transitions)
└── App.tsx                 # Root layout
```

## Commands

| Command           | Description                          |
| ------------------ | ------------------------------------- |
| `npm run dev`      | Start the development server          |
| `npm run build`    | Type-check and build for production   |
| `npm run preview`  | Preview the production build locally  |
| `npm run lint`     | Run oxlint                            |
| `npm run test`     | Run the unit test suite               |
