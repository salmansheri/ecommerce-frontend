import type { CreateClientConfig} from "@/generated/client.gen.ts";
import {API_URL} from "@/lib/utils.ts";

export const createClientConfig: CreateClientConfig = (config) => ({
    ...config,
    baseUrl: API_URL,
    credentials: "include"
})