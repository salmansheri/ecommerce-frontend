import { getCurrentUserDetailsQueryKey, signOutMutation } from "@/generated/@tanstack/react-query.gen";
import { useAuth } from "@/lib/auth-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

export const UseSignOut = () => {
    const queryClient = useQueryClient();
    const { logout } = useAuth();

 
    return useMutation({
        ...signOutMutation(),
    onError: (error) => {
            console.error(error); 
            toast.error("Error: Signout Mutation" + error); 

        },
        onSuccess: (data) => {
            console.log(data); 
            logout();
            queryClient.setQueryData(getCurrentUserDetailsQueryKey(), null); 
            queryClient.invalidateQueries({queryKey: getCurrentUserDetailsQueryKey()})
            toast.success("Successfully Signed Out!"); 


        }
    })
}