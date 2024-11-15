import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query"
import axios from "axios";

export const useCurrentUser = () => {
    const {isLoading, isError, data: user} = useQuery({
        queryKey: ["currentUser"],
        queryFn: async () => {
            try {
                const response = await api.get('/auth/current-user');
                return response.data;
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    // Handle unauthorized error
                    return null;
                }
                throw error;
            }
        },
    });
    return {isLoading, isError, user};
}