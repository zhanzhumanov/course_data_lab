import { prisma } from './prisma_init'

export async function find_students_with_most_courses() {
    // TODO: Найти студентов с максимальным количеством уникальных курсов
    // Использовать обработку данных в TypeScript (не агрегацию Prisma)
    // Вернуть массив студентов с информацией о person и количеством курсов
const students = await prisma.student.findMany({
        include: {
            person: true,
            grades: true
        }
    })
    const studentsWithCount = students.map(student => {
        const uniqueCourseIds = new Set(
            student.grades.map(grade => grade.courseId)
        )
        return {
            ...student,
            courseCount: uniqueCourseIds.size
        }
    })
    const maxCourseCount = Math.max(
        ...studentsWithCount.map(student => student.courseCount)
    )
    return studentsWithCount.filter(
        student => student.courseCount === maxCourseCount
    )
}