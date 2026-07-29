import type { Status } from "../../store/tasks/useTaskStore";
import TaskColumn from "./components/TaskColumn";

const columns: { title: string; status: Status }[] = [
    { title: "New", status: "new" },
    { title: "In Progress", status: "in-progress" },
    { title: "Done", status: "done" },
];

const TaskBoard = () => {
    return (
        <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
            {columns.map((c) => (
                <TaskColumn key={c.status} title={c.title} status={c.status} />
            ))}
        </div>
    );
};

export default TaskBoard;
