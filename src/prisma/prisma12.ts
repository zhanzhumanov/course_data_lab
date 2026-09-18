import { prisma } from './prisma_init'

export async function find_top_students(limit: number) {
    // TODO: Найти топ N студентов по среднему баллу
    // Учитывать только студентов, у которых есть хотя бы одна оценка
    // Вернуть массив с id студента, именем, средним баллом и количеством оценок
    // Отсортировать по убыванию среднего балла
const grouped = await prisma.grade.groupBy({
        by: ['studentId'],
        _avg: {
            grade: true
        },
        _count: {
            grade: true
        },
        orderBy: {
            _avg: {
                grade: 'desc'
            }
        },
        take: limit
    })

    const students = await prisma.student.findMany({
        where: {
            id: {
                in: grouped.map(item => item.studentId)
            }
        },
        include: {
            person: true
        }
    })

    return grouped.map(item => {
        const student = students.find(s => s.id === item.studentId)!

        return {
            studentId: student.id,
            studentName: student.person.name,
            averageGrade: item._avg.grade!,
            gradeCount: item._count.grade
        }
    })
}