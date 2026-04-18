import { Derived, Store } from "@tanstack/store";
import type { LoginResponseDto } from "@/generated";
import { Auth } from "@/generated/client";

type TUser = {
     id?: number;
      
        username?: string;
        roles?: Array<string>;
}

type TAuthState = {
	user: TUser | null;
};

function loadUser(): TUser | null {
    try {
        const raw = localStorage.getItem("auth"); 

        if (!raw) return null; 
        const parsed = JSON.parse(raw); 

        return parsed ?? null; 
    } catch(error) {
        console.error("Failed to parse auth from storage", error); 
        return null; 
    }
}



export const authStore = new Store<TAuthState>({
	user: loadUser(),
});

export const isAuthenticatedStore = new Derived({
	deps: [authStore],
	fn: () => Boolean(authStore.state.user?.username),
});

export const setAuthUser = (user: TUser) => {
	authStore.setState((state) => ({
		...state,
		user,
	}));
};

export const clearAuthUser = () => {
	authStore.setState((state) => ({
		...state,
		user: null,
	}));
};

authStore.subscribe(() => {
    try {
        localStorage.setItem(
            "auth", 
            JSON.stringify(authStore.state.user)
        ); 
    } catch (error) {
        console.error("failed to persist auth", error); 
    }
})
