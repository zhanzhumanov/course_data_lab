import { prisma } from './prisma_init'

export async function find_oldest_and_newest_students() {
    // TODO: Найти самого старого и самого нового студента по дате создания
    // Вернуть объект { oldest: студент, newest: студент } с информацией о person
const students = await prisma.student.findMany({
        include: {
            person: true
        }
    })

    const oldest = students.reduce((oldest, student) =>
        student.person.createdAt < oldest.person.createdAt ? student : oldest
    )

    const newest = students.reduce((newest, student) =>
        student.person.createdAt > newest.person.createdAt ? student : newest
    )

    return { oldest, newest }
}