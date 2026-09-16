/* 	
	Напишите функцию groupUnfinishedHighPriorityTasks, которая группирует задачи по категориям, фильтруя только незавершенные высокоприоритетные задачи.
*/

export type Task = { category: string; priority: string; completed: boolean };

export function groupUnfinishedHighPriorityTasks(tasks: Task[]): Map<string, Task[]> {
const result = new Map<string, Task[]>();

  const filtered = tasks.filter(
    task => task.completed === false && task.priority === 'high'
  );

  filtered.forEach(task => {
    if (!result.has(task.category)) {
      result.set(task.category, []);
    }

    result.get(task.category)?.push(task);
  });

  return result;
}


