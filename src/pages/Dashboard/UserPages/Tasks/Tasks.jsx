import { useEffect, useState } from "react";
import ListTasks from "./ListTasks/ListTasks";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import useAuth from "../../../../hooks/useAuth";

const Tasks = () => {

    const { user } = useAuth();
    const [refresh, setRefresh] = useState(false);
    const [tasks, setTasks] = useState([]);
    const axiosPrivate = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/tasks')
            .then(result => {
                console.log(result.data);
                const fTasks = result.data?.filter((t) => t.email === user.email);
                setTasks(fTasks);
            })
            .catch(error => {
                console.log(error);
            })
    }, [axiosPublic, refresh, user]);
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="w-full h-screen flex justify-center items-start mt-24">
                <ListTasks tasks={tasks} setTasks={setTasks} refresh={refresh} setRefresh={setRefresh}></ListTasks>
            </div>
        </DndProvider>
    );
};

export default Tasks;