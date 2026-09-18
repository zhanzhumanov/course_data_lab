import { prisma } from './prisma_init'

export async function find_courses_min_max_average() {
    // TODO: Найти курсы с минимальной и максимальной средней оценкой
    // Использовать обработку в TypeScript (не агрегацию Prisma)
    // Вернуть объект { min: курс, max: курс } с дополнительным полем averageGrade
const courses = await prisma.course.findMany({
        include: {
            grades: true
        }
    })

    const coursesWithAverage = courses
        .filter(course => course.grades.length > 0)
        .map(course => ({
            id: course.id,
            title: course.title,
            description: course.description,
            averageGrade:
                course.grades.reduce((sum, grade) => sum + grade.grade, 0) /
                course.grades.length
        }))

    const min = coursesWithAverage.reduce((prev, current) =>
        current.averageGrade < prev.averageGrade ? current : prev
    )

    const max = coursesWithAverage.reduce((prev, current) =>
        current.averageGrade > prev.averageGrade ? current : prev
    )

    return { min, max }
}