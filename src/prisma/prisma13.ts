import { prisma } from './prisma_init'

export async function find_top_courses(limit: number) {
    // TODO: Найти топ N курсов по средней оценке
    // Для каждого курса вычислить среднюю оценку из всех его оценок
    // Вернуть массив с id курса, названием и средней оценкой
    // Отсортировать по убыванию средней оценки
    // Использовать вычисление средней оценки в TypeScript коде (не через агрегацию Prisma)
const courses = await prisma.course.findMany({
        include: {
            grades: true
        }
    })

    const coursesWithAverage = courses
        .filter(course => course.grades.length > 0)
        .map(course => {
            const total = course.grades.reduce(
                (sum, grade) => sum + grade.grade,
                0
            )

            const averageGrade = total / course.grades.length

            return {
                courseId: course.id,
                title: course.title,
                averageGrade
            }
        })

    return coursesWithAverage
        .sort((a, b) => b.averageGrade - a.averageGrade)
        .slice(0, limit)
}