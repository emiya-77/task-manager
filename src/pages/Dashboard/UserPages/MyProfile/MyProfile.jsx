import useAuth from "../../../../hooks/useAuth"


const MyProfile = () => {
    const { user } = useAuth();
    return (
        <div className="w-full flex flex-col justify-center my-20 mx-32 items-start">
            <div className="w-96 h-96 flex justify-center items-center bg-white rounded-full overflow-hidden cursor-pointer">
                <img src={user.photoURL} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="p-4 bg-blue-200 rounded-lg mt-8">
                <h1 className="text-2xl">Hello, I am <span className="text-3xl font-medium">{user.displayName}</span></h1>
            </div>
            <div className="p-4 bg-blue-200 rounded-lg mt-2">
                <h1 className="text-2xl">My email is <span className="text-3xl font-medium">{user.email}</span></h1>
            </div>
            <div className="p-4 bg-blue-200 rounded-lg mt-2">
                <h1 className="text-2xl">And welcome to my Task Manager.</h1>
            </div>
        </div>
    )
}

export default MyProfile