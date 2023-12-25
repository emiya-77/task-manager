import { HiMenuAlt3, HiOutlineBookOpen } from 'react-icons/hi';
import { AiOutlineUser, AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const { user } = useAuth();

    const userMenus = [
        { name: 'My Profile', link: 'my-profile', icon: 'profile' },
        { name: 'Tasks', link: 'tasks', icon: AiOutlineHome },
        { name: 'Add a Task', link: 'add-task', icon: HiOutlineBookOpen }
    ]


    return (
        <section className='flex gap-6 fixed'>
            <div className={`bg-blue-200 min-h-screen ${open ? 'w-72' : 'w-16'} duration-700 text-black px-3`}>
                <div className={`py-3 flex ${open ? 'justify-between' : 'justify-center'}`}>
                    <Link className={open ? `h-[60px] flex items-center` : `hidden`} to='/'>
                        <div className='p-4 bg-blue-50 rounded-full'>
                            <h1 className='font-medium tracking-wide'>Task Manager</h1>
                        </div>
                    </Link>
                    <HiMenuAlt3 size={26} onClick={() => setOpen(!open)} className='cursor-pointer'></HiMenuAlt3>
                </div>
                <div className='mt-4 flex flex-col gap-4 relative'>
                    {userMenus?.map((menu, i) => (
                        <Link className={`${menu?.margin ? 'mt-5' : menu?.marginBot ? 'mb-5' : ''} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-blue-300 rounded-md`} to={menu?.link} key={i}>
                            <div>
                                {menu?.icon !== 'profile' ? React.createElement(menu?.icon, { size: '24' })
                                    : (
                                        <div className="w-8 h-8 flex justify-center items-center bg-white rounded-full overflow-hidden cursor-pointer">
                                            <img src={user.photoURL} className="w-full h-full object-cover" alt="" />
                                        </div>
                                    )}
                            </div>
                            <h2 style={{
                                transitionDelay: `${i + 3}00ms`
                            }} className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}>{menu?.name}</h2>
                            <h2 className={`${open && 'hidden'} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}>
                                {menu?.name}
                            </h2>
                        </Link>))
                    }
                </div>
            </div>
            {/* <div className='m-3 text-xl text-gray-900 font-semibold'>
                ELYSIUM
            </div> */}
        </section>
    );
};

export default Sidebar;