import { useContext, useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const Login = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const axiosPublic = useAxiosPublic();
    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        setRegisterError('');
        setSuccess('');

        signIn(email, password)
            .then(result => {
                setSuccess('Logged in Successfully.');
                e.target.reset();
                navigate(location?.state ? location?.state : '/');
                toast.success('Logged In Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })
            .catch(error => {
                setRegisterError(error.message);
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                console.log(error.message);
            })
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                navigate('/');
                toast.success('Logged In Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })
            .catch(error => {
                setRegisterError(error.message);
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                console.log(error);
            })
    }

    return (
        <>
            <div className="hero mt-24">
                <div className="hero-content flex-col w-96">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login</h1>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-blue-600 text-white text-base hover:text-blue-600 hover:bg-transparent hover:border-2 hover:border-blue-600">Login</button>
                            </div>
                        </form>
                        <div className='flex w-full justify-center mb-4 -mt-4'>
                            <button onClick={handleGoogleSignIn} className='w-[50px] h-[50px] cursor-pointer text-xl font-medium py-4 text-white bg-blue-600 border-2 border-blue-600 hover:bg-opacity-0 hover:border-blue-600 hover:text-blue-600 transition duration-200 ease-in-out rounded-full shadow-lg flex justify-center items-center'>
                                <FaGoogle className='text-2xl hover:text-blue-600'></FaGoogle>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </>
    );
};

export default Login;