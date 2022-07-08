export { }

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_PORT: number
            DB_USER: string
            DATABASE: string
            PASSWORD: string
            HOST: string
            ENV: "test" | "dev" | "prod"
            TOKEN_SECRET: string
        }
    }
}
