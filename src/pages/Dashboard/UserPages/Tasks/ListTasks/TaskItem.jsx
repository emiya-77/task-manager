import { useState } from "react";
import { useDrag } from "react-dnd";
import { AiOutlineDelete } from "react-icons/ai";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

const TaskItem = ({ task, tasks, setTasks, refresh, setRefresh }) => {

    const axiosPublic = useAxiosPublic();
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item: { id: task._id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    const handleTaskDelete = (id) => {
        axiosPublic.delete(`/tasks/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    setRefresh(!refresh);
                    toast.success('Task Deleted Successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
            })
    }

    const [accordionOpen, setAccordionOpen] = useState(false);
    return (
        <>
            <div ref={drag} className={`${isDragging ? "opacity-25" : "opacity-100"} w-full flex justify-between items-center`}>
                <div className="w-10/12 bg-blue-100 rounded-lg shadow-md">
                    <button
                        onClick={() => setAccordionOpen(!accordionOpen)}
                        className="flex justify-between items-center py-3 px-3 w-full"
                    >
                        <span className="font-medium">{task.taskTitle}</span>
                        {/* {accordionOpen ? <span>-</span> : <span>+</span>} */}
                        <svg
                            className="fill-indigo-500 shrink-0 ml-8"
                            width="16"
                            height="16"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                y="7"
                                width="16"
                                height="2"
                                rx="1"
                                className={`transform origin-center transition duration-200 ease-out ${accordionOpen && "!rotate-180"
                                    }`}
                            />
                            <rect
                                y="7"
                                width="16"
                                height="2"
                                rx="1"
                                className={`transform origin-center rotate-90 transition duration-200 ease-out ${accordionOpen && "!rotate-180"
                                    }`}
                            />
                        </svg>
                    </button>
                    <div
                        className={`grid overflow-hidden px-3 transition-all duration-300 ease-in-out text-slate-600 text-sm ${accordionOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                            }`}
                    >
                        <div className="overflow-hidden">
                            <hr className="my-2" />
                            <div className="pb-3">
                                {task.taskDescription}
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={() => handleTaskDelete(task._id)} className="shadow-md rounded-full hover:bg-red-300 w-12 h-12 flex justify-center items-center"><AiOutlineDelete size={20} /></button>
            </div>
            <ToastContainer className="z-10"></ToastContainer>
        </>
    )
}

export default TaskItem;