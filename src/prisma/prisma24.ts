import { prisma } from './prisma_init'

export async function find_students_with_all_courses() {
    // TODO: Найти студентов, у которых есть оценки по всем существующим курсам
    // Использовать обработку в TypeScript
    // Вернуть массив студентов с информацией о person
const courses = await prisma.course.findMany({
        select: {
            id: true
        }
    })

    const students = await prisma.student.findMany({
        include: {
            person: true,
            grades: true
        }
    })

    return students.filter(student => {
        const studentCourseIds = new Set(
            student.grades.map(grade => grade.courseId)
        )

        return courses.every(course => studentCourseIds.has(course.id))
    })
}