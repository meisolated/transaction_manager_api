export { }

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_PORT: number
            PASSWORD: string
            DB_USER: string
            DATABASE: string
            ENV: "test" | "dev" | "prod"
            TOKEN_SECRET: string
        }
    }
}
