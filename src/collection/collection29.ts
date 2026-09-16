/* 
	Напишите функцию calculateTotalProgress, которая вычисляет общий прогресс пользователей, учитывая только активных и с прогрессом > 50%.
*/

type User = {active: boolean, progress: number}

export function calculateTotalProgress(users: User[]): number {
const filteredUsers = users.filter(
    user => user.active && user.progress > 50
  );

  if (filteredUsers.length === 0) {
    return 0;
  }

  const total = filteredUsers.reduce(
    (sum, user) => sum + user.progress,
    0
  );

  return total / filteredUsers.length;
}