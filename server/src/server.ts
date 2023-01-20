import Fastify from "fastify"
import cors from "@fastify/cors"
import { appRoutes } from "./routes"

const DEFAULT_LISTENING_PORT = 3333
const app = Fastify()

// Toda função que é recebida pelo .async deve ser assíncrona
app.register(cors)
app.register(appRoutes)

app.listen({
    port: DEFAULT_LISTENING_PORT,
}).then(() =>
    console.log(
        `The server is running on: http://localhost:${DEFAULT_LISTENING_PORT}/`
    )
)
