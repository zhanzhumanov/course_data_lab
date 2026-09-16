/* 
	Напишите функцию groupByCategory, которая принимает массив объектов и имя свойства для группировки, возвращает объект, где ключи - значения свойства, а значения - массивы объектов.
*/

export function groupByCategory<T extends Record<string, any>>(arr: T[], key: keyof T): Record<T[keyof T], T[]> {
return arr.reduce((groups, item) => {
    const category = item[key];

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push(item);

    return groups;
  }, {} as Record<T[keyof T], T[]>);
}


