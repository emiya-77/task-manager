import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useEffect, useRef, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";


const AddTask = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [cost, setCost] = useState(0);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();


    const onSubmit = async (data) => {
        console.log(data)

        const taskDeadlineDate = new Date(data.taskDeadline);

        console.log(taskDeadlineDate);

        const task = {
            name: user?.displayName,
            email: user?.email,
            taskTitle: data.taskTitle,
            taskDescription: data.taskDescription,
            taskDeadline: taskDeadlineDate,
            taskPriority: data.taskPriority,
            status: 'todo'
        }
        const taskRes = await axiosSecure.post('/add-task', task);
        console.log('task:', taskRes);
        reset();
        if (taskRes.data.insertedId) {
            // show success popup
            console.log('hello');
            toast.success('Task Added Successfully', {
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
    };

    return (
        <>
            <div>
                <div className='container mx-auto bg-blue-200 lg:w-[700px] min-h-[650px] flex flex-col justify-center items-center rounded-3xl shadow-lg mt-14'>
                    <Link className="my-4" to='/'>
                        <h1 className="text-4xl tracking-widest font-medium text-blue-700 shadow-lg px-3 py-2 rounded-lg bg-blue-50">Task</h1>
                    </Link>
                    <div className='w-full h-full flex justify-center items-start'>
                        <div className='w-full justify-center items-center'>
                            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center'>
                                <div className="flex flex-col justify-center items-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <input {...register('taskTitle', { required: true })} className="input-text" type="text" name="taskTitle" placeholder="Task Title" required />
                                        {errors.taskTitle && <p className="error-message">{errors.taskTitle.message}</p>}
                                        <textarea rows={5} {...register('taskDescription', { required: true })} className="input-text" type="text" name="taskDescription" placeholder="Task Description"></textarea>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-medium ml-6 -mb-2 text-gray-600">Task Deadline</label>
                                        <input {...register('taskDeadline', { required: true })} className="input-text" type="date" name="taskDeadline" placeholder="Deadline" required />
                                        <div>
                                            <select {...register("priority", { required: true })} className="input-text">
                                                <option value="" disabled selected>Priority</option>
                                                <option value="low">Low</option>
                                                <option value="moderate">Moderate</option>
                                                <option value="high">High</option>
                                            </select>
                                            {errors.userType && <span className="text-red-600">User Type is required</span>}
                                        </div>
                                    </div>
                                </div>

                                <input className="tracking-wider w-[200px] cursor-pointer text-xl font-medium py-4 text-white bg-blue-400 border-2 border-blue-400 hover:bg-blue-100 hover:border-blue-500 hover:text-blue-500 transition duration-200 ease-in-out rounded-full mx-4 my-6 shadow-lg" type="submit" value="Add Task" />
                            </form>
                        </div>
                    </div>
                    {/* <div className='w-full h-96 md:w-2/3 md:h-full rounded-3xl flex justify-center items-center overflow-hidden'>
                        <img className='w-full h-full object-cover' src='/img/food3.jpg' alt="dinner" />
                    </div> */}
                </div>
            </div>
            <ToastContainer className="z-10"></ToastContainer>
        </>
    );
};

export default AddTask;