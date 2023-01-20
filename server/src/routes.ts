import { FastifyInstance } from "fastify"
import { z } from "zod"
import dayjs from "dayjs"

import { prisma } from "./lib/prisma"

export async function appRoutes(app: FastifyInstance) {
    app.get("/habits", async () => {
        const allHabits = await prisma.habit.findMany()

        return {
            allHabits,
        }
    })

    app.post("/habits", async (request) => {
        const createHabitBody = z.object({
            title: z.string(),
            weekDays: z.array(z.number().min(0).max(6)),
        })
        // buscar do body no client (frontend): title, weekDays
        const { title, weekDays } = createHabitBody.parse(request.body)
        const today = dayjs().startOf("day").hour(-3).toDate()

        await prisma.habit.create({
            data: {
                title,
                created_at: today,
                weekDays: {
                    create: weekDays.map((weekDay) => {
                        return {
                            week_day: weekDay,
                        }
                    }),
                },
            },
        })
    })

    app.get("/day", async (request) => {
        const getDayParams = z.object({
            // Converte o parâmetro recebido em string para Date ==> new Date("param")
            date: z.coerce.date(),
        })
        const { date } = getDayParams.parse(request.query)
        const parsedDate = dayjs(date).startOf("day")
        const weekDay = parsedDate.get("day")

        // CARREGAR TODOS OS HÁBITOS POSSÍVEIS PARA A DATA:
        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at: {
                    lte: date,
                },
                weekDays: {
                    some: {
                        week_day: weekDay,
                    },
                },
            },
        })

        // CARREGAR HÁBITOS COMPLETADOS DA DATA:
        const day = await prisma.day.findUnique({
            where: {
                date: parsedDate.toDate(),
            },
            include: {
                dayHabits: true,
            },
        })

        const completedHabits = day?.dayHabits.map((dayHabit) => {
            return dayHabit.habit_id
        })

        return {
            possibleHabits,
            completedHabits,
        }
    })
}
