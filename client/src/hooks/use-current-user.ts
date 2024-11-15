import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query"
import axios from "axios";

export const useCurrentUser = () => {
    const {isLoading, isError, data: user} = useQuery({
        queryKey: ["currentUser"],
        queryFn: async () => {
            try {
                const response = await api.get('/auth/current-user', {
                    withCredentials: true
                });
                return response.data;
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    return null;
                }
                console.error('Error fetching user:', error);
                throw error;
            }
        },
        retry: false,
        refetchOnWindowFocus: false
    });
    return {isLoading, isError, user};
}