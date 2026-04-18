import { getCurrentUserDetailsOptions } from "@/generated/@tanstack/react-query.gen"
import { useQuery } from "@tanstack/react-query"

export const userGetCurrentUserDetails = () => {
    return useQuery(getCurrentUserDetailsOptions()); 
}