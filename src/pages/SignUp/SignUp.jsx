import { useContext, useState } from 'react';
import { FaEyeSlash, FaEye, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { updateProfile } from 'firebase/auth';

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const [success, setSuccess] = useState('');
    const [registerError, setRegisterError] = useState('');
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(name, email, password);

        const user = { name, email };

        // reset error and success
        setRegisterError('');
        setSuccess('');

        // create user in firebase
        createUser(email, password)
            .then(result => {
                axiosPublic.post('/users', user)
                    .then(res => console.log(res.data));

                setSuccess('User Created Successfully');
                e.target.reset();
                console.log(result);
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photo
                })
                    .then(() => console.log('profile updated'))
                toast.success(success, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                navigate('/');
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
            })
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                const user = result.user;
                const userInfo = {
                    name: user.displayName,
                    email: user.email
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log('user added to the database')
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'User created successfully.',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/');
                        }
                    })
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
            <div className="hero my-8">
                <div className="hero-content flex-col w-96">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up</h1>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={onSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <input type="text" name='photo' placeholder="photoURL" className="input input-bordered" />
                            </div>
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
                                <button className="btn bg-blue-600 text-white text-base hover:text-blue-600 hover:bg-transparent hover:border-2 hover:border-blue-600">Sign Up</button>
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
        </>
    );
};

export default SignUp;