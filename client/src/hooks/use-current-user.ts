// import { api } from "@/lib/api";
// import { useQuery } from "@tanstack/react-query"
// import axios from "axios";

// export const useCurrentUser = () => {
//     const {isLoading, isError, data: user} = useQuery({
//         queryKey: ["currentUser"],
//         queryFn: async () => {
//             try {
//                 const response = await api.get('/auth/current-user', {
//                     withCredentials: true
//                 });
//                 return response.data;
//             } catch (error) {
//                 if (axios.isAxiosError(error) && error.response?.status === 401) {
//                     return null;
//                 }
//                 console.error('Error fetching user:', error);
//                 throw error;
//             }
//         },
//         retry: false,
//         refetchOnWindowFocus: false
//     });
//     return {isLoading, isError, user};
// }

import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  displayName?: string;
  profilePicture?: string;
  // add other user properties
}

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        // Add withCredentials to ensure cookies are sent
        const response = await axios.get<{ user: User }>('/auth/current-user', {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
          }
        });
        
        console.log('Auth response:', response.data); // Debug log
        setUser(response.data.user);
      } catch (err) {
        console.error('Auth error:', err); // Debug log
        setError(err as Error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, isLoading, error };
}