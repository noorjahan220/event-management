import { useQuery } from "@tanstack/react-query";
import useAuth from "./UseAuth";
import useAxiosPublic from "./UseAxiosPublic";


const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosPublic = useAxiosPublic();
    
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading && !!user?.email, // Only run if user is loaded and has an email
        queryFn: async () => {
            if (user?.email) {
                const res = await axiosPublic.get(`/user/admin/${user.email}`);
                return res.data.admin;
            }
            return false;
        }
    });
    return [isAdmin, isAdminLoading]
};

export default useAdmin;