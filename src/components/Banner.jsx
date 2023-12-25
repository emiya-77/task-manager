import { Link } from "react-router-dom"


const Banner = () => {
    return (
        <div className="hero h-96 rounded-xl overflow-hidden" style={{ backgroundImage: 'url(/img/bg-1.jpg)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-xl">
                    <h1 className="mb-5 text-5xl font-bold text-white">Ultimate Task Manager</h1>
                    <p className="mb-5">Manage all your tasks in one place. One solution for all your headaches.</p>
                    <Link to='/dashboard'>
                        <button className="btn bg-blue-500 border-blue-500 text-white text-base tracking-wide hover:text-black">Let&apos;s Explore</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Banner