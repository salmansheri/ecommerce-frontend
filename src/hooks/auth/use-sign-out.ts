import { signOutMutation } from "@/generated/@tanstack/react-query.gen";
import { clearAuthUser } from "@/lib/auth-store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const UseSignOut = () => {
 
    return useMutation({
        ...signOutMutation(),
    onError: (error) => {
            console.error(error); 
            toast.error("Error: Signout Mutation" + error); 

        },
        onSuccess: (data) => {
            console.log(data); 
            clearAuthUser(); 
            toast.success("Successfully Signed Out!"); 


        }
    })
}