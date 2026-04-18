import { getCurrentUserNameOptions } from "@/generated/@tanstack/react-query.gen"
import { useQuery } from "@tanstack/react-query"

export const userGetCurrentUsername = () => {
    return useQuery(getCurrentUserNameOptions()); 
}