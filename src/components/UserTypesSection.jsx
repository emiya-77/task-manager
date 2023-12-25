

const UserTypesSection = () => {
    const userTypes = [
        {
            title: 'Developers',
            description: 'Integrate task manager API for seamless task tracking and management in your development projects.',
            icon: '💻',
        },
        {
            title: 'Professionals',
            description: 'Efficiently manage work tasks, set reminders, and stay organized with our intuitive task manager.',
            icon: '👔',
        },
        {
            title: 'Students',
            description: 'Organize your assignments, set study reminders, and enhance productivity with our task manager.',
            icon: '📚',
        },
        // Add more user types as needed
    ];

    return (
        <section className="bg-gray-100 py-12 my-12 rounded-xl px-12">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Who Benefits from Our Task Manager?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {userTypes.map((userType, index) => (
                        <div key={index} className="bg-white p-6 rounded-md shadow-md">
                            <div className="flex bg-blue-100 items-center justify-center py-16 rounded-lg mb-4 text-4xl">{userType.icon}</div>
                            <div className="px-2">
                                <h3 className="text-xl font-semibold mb-2">{userType.title}</h3>
                                <p className="text-gray-600">{userType.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UserTypesSection;
