import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://task-management-server-coral-two.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;