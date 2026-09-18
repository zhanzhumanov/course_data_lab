import { prisma } from './prisma_init'

export async function update_students_email_domain(oldDomain: string, newDomain: string) {
    // TODO: Обновить email у всех студентов, у которых email заканчивается на oldDomain
    // Заменить домен на newDomain
    // Вернуть количество обновленных записей
	// Допускается обновление email с помощью простого цикла с запросами в теле цикла
const students = await prisma.student.findMany({
        include: {
            person: true
        },
        where: {
            person: {
                email: {
                    endsWith: oldDomain
                }
            }
        }
    })

    for (const student of students) {
        const newEmail = student.person.email.replace(
            oldDomain,
            newDomain
        )

        await prisma.person.update({
            where: {
                id: student.person.id
            },
            data: {
                email: newEmail
            }
        })
    }

    return students.length
}
