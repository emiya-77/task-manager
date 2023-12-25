import { useEffect, useState } from "react"
import TaskSection from "./TaskSection";


const ListTasks = ({ tasks, setTasks, refresh, setRefresh }) => {
    const [todos, setTodos] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [complete, setComplete] = useState([]);

    useEffect(() => {
        const fTodos = tasks.filter((task) => task.status === "todo");
        const fInProgress = tasks.filter((task) => task.status === "inprogress");
        const fComplete = tasks.filter((task) => task.status === "complete");

        setTodos(fTodos);
        setInProgress(fInProgress);
        setComplete(fComplete);
    }, [tasks]);

    const statuses = ["todo", "inprogress", "complete"];

    return (
        <div className="flex gap-x-16 gap-y-24 flex-wrap">
            {statuses.map((status, idx) => <TaskSection key={idx} status={status} tasks={tasks} setTasks={setTasks} todos={todos} inProgress={inProgress} complete={complete} refresh={refresh} setRefresh={setRefresh}></TaskSection>)}
        </div>
    )
}

export default ListTasks