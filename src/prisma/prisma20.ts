import { prisma } from './prisma_init'

export async function update_student_names_pattern(oldPattern: string, newPattern: string) {
    // TODO: Обновить имена студентов, заменяя oldPattern на newPattern
    // Использовать обработку в TypeScript с отдельными запросами update
    // Вернуть количество обновленных студентов
const students = await prisma.student.findMany({
        include: {
            person: true
        }
    })

    const matchingStudents = students.filter(student =>
        student.person.name.includes(oldPattern)
    )

    for (const student of matchingStudents) {
        await prisma.person.update({
            where: {
                id: student.personId
            },
            data: {
                name: student.person.name.replaceAll(oldPattern, newPattern)
            }
        })
    }

    return matchingStudents.length
}