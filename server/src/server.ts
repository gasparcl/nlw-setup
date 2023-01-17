import Fastify from "fastify"
import cors from "@fastify/cors"
import { PrismaClient } from "@prisma/client"

const DEFAULT_LISTENING_PORT = 3333
const app = Fastify()
const prisma = new PrismaClient()

app.register(cors)

app.get("/", async () => {
    const habits = await prisma.habit.findMany({
        where: {
            title: {
                startsWith: "Beber",
            },
        },
    })

    // para retornar todos os registros de habit, bastaria não passar nenhum parâmetro para o findMany:
    // const habits = await prisma.habit.findMany()

    return habits
})

app.listen({
    port: DEFAULT_LISTENING_PORT,
}).then(() =>
    console.log(
        `The server is running on http://localhost:${DEFAULT_LISTENING_PORT}/`
    )
)
