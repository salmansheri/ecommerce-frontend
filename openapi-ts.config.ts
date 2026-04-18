import {defineConfig} from "@hey-api/openapi-ts"; 

export default defineConfig({
    input: "./hey-api/openapi.json",
    output: "./src/generated",
    plugins: [

        {
            name: "@tanstack/react-query",
            queryOptions: true,
            queryKeys: true
        }
    ]
}); 

