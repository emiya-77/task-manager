import { useDrop } from "react-dnd";
import TaskHeading from "./TaskHeading"
import TaskItem from "./TaskItem";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";


const TaskSection = ({ status, tasks, setTasks, todos, inProgress, complete, refresh, setRefresh }) => {

    const axiosPublic = useAxiosPublic();
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'task',
        drop: (item) => addItemSection(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    let text = "Todo";
    let bg = "bg-blue-400";
    let tasksToMap = todos;

    if (status === "inprogress") {
        text = "In Progress";
        bg = "bg-orange-400";
        tasksToMap = inProgress;
    }

    if (status === "complete") {
        text = "Complete";
        bg = "bg-green-500";
        tasksToMap = complete;
    }

    const addItemSection = (id) => {
        setTasks(prev => {
            const mTasks = prev.map(t => {
                if (t._id === id) {
                    return { ...t, status: status };
                }

                return t;
            });

            const updateStatus = {
                status: status
            }

            axiosPublic.patch(`/tasks/${id}`, updateStatus)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                })

            return mTasks;
        });
    };

    return (
        <div ref={drop} className={`lg:w-96 w-full rounded-lg p-2 ${isOver ? "bg-slate-200" : ""}`}>
            <TaskHeading text={text} bg={bg} count={tasksToMap.length}></TaskHeading>
            <div className="flex flex-col gap-3">
                {tasksToMap.length > 0 && tasksToMap.map((task) => <TaskItem key={task._id} task={task} tasks={tasks} setTasks={setTasks} refresh={refresh} setRefresh={setRefresh}></TaskItem>)}
            </div>
        </div>
    )
}

export default TaskSection