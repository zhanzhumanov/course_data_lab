import { prisma } from './prisma_init'

export async function find_students_above_course_average(courseTitle: string) {
    // TODO: Найти студентов, у которых есть оценки по указанному курсу выше среднего балла по этому курсу
    // Вернуть массив студентов с информацией о person и их оценкой
    // Использовать два отдельных запроса: первый для нахождения среднего балла, второй для поиска студентов
 const course = await prisma.course.findFirst({
        where: {
            title: courseTitle
        }
    })

    if (!course) {
        return []
    }

    const averageResult = await prisma.grade.aggregate({
        where: {
            courseId: course.id
        },
        _avg: {
            grade: true
        }
    })

    const average = averageResult._avg.grade

    if (average === null) {
        return []
    }

    const grades = await prisma.grade.findMany({
        where: {
            courseId: course.id,
            grade: {
                gt: average
            }
        },
        include: {
            student: {
                include: {
                    person: true
                }
            }
        }
    })

    return grades.map(g => ({
        ...g.student,
        grade: g.grade
    }))
}