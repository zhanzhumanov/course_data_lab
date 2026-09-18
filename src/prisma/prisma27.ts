import { prisma } from './prisma_init'

export async function find_courses_with_excellent_students() {
    // TODO: Найти курсы с количеством студентов, имеющих оценку 5 по этому курсу
    // Вернуть массив курсов с дополнительным полем excellentCount
const courses = await prisma.course.findMany({
        include: {
            grades: true
        }
    })

    return courses.map(course => ({
        id: course.id,
        title: course.title,
        description: course.description,
        createdAt: course.createdAt,
        excellentCount: course.grades.filter(grade => grade.grade === 5).length
    }))
}