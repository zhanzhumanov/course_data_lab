import { prisma } from './prisma_init'

export async function find_students_with_same_names() {
    // TODO: Найти студентов с одинаковыми именами
    // Использовать обработку в TypeScript
    // Вернуть массив групп студентов с одинаковыми именами
 const students = await prisma.student.findMany({
        include: {
            person: true
        }
    })

    const groups = new Map<string, typeof students>()

    for (const student of students) {
        const name = student.person.name
        const group = groups.get(name) ?? []

        group.push(student)
        groups.set(name, group)
    }

    return Array.from(groups.entries())
        .filter(([, students]) => students.length > 1)
        .map(([name, students]) => ({
            name,
            students
        }))
}