

const TaskHeading = ({ text, bg, count }) => {
    return (
        <div className={`${bg} shadow-md flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white mb-3`}>
            {text} <div className='ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center'>{count}</div>
        </div>
    )
}

export default TaskHeading