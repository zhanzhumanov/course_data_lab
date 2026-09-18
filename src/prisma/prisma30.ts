import { prisma } from './prisma_init'

export async function find_student_progress_by_semester() {
    // TODO: Найти прогресс студентов по семестрам (группировка по месяцу создания оценок)
    // Использовать обработку в TypeScript
    // Вернуть массив с прогрессом по студентам и месяцам
 const grades = await prisma.grade.findMany()

    const grouped = new Map<number, Map<string, number[]>>()

    for (const grade of grades) {
        const date = new Date(grade.createdAt)
        const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

        if (!grouped.has(grade.studentId)) {
            grouped.set(grade.studentId, new Map())
        }

        const studentMonths = grouped.get(grade.studentId)!

        if (!studentMonths.has(month)) {
            studentMonths.set(month, [])
        }

        studentMonths.get(month)!.push(grade.grade)
    }

    return Array.from(grouped.entries()).map(([studentId, months]) => ({
        studentId,
        progress: Array.from(months.entries())
            .map(([month, grades]) => ({
                month,
                averageGrade: grades.reduce((sum, grade) => sum + grade, 0) / grades.length,
                gradeCount: grades.length
            }))
            .sort((a, b) => a.month.localeCompare(b.month))
    }))
}