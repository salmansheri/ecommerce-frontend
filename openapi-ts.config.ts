import {defineConfig} from "@hey-api/openapi-ts"; 

export default defineConfig({
    input: "./hey-api/openapi.json",
    output: "./src/generated",
    plugins: [
        {
            name: "@hey-api/client-fetch",
            runtimeConfigPath: "@/hey-api.ts"
        },

        {
            name: "@tanstack/react-query",
            queryOptions: true,
            queryKeys: true
        }
    ]
}); 

