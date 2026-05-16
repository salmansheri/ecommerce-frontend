import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {LoginResponseDto} from "@/generated";

type AuthStore = {
    id: number | null,
    username: string | null,
    roles: Array<string> | null,
    login: (loginResponse: LoginResponseDto) => void,
    logout: () => void
}

export const useAuth = create<AuthStore>()(
    persist(
        (set) => ({
            id: 0,
            username: "",
            roles: [],
            login: (loginResponse: LoginResponseDto) => {
                set({
                    id: loginResponse?.id,
                    username: loginResponse?.username,
                    roles: loginResponse?.roles


                });

            },
            logout: () => {
                set({ id: null, username: null, roles: null})
            }
        }),
        {
            name: "auth-store"
        }
    )
)