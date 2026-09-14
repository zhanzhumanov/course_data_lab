/* 
	Создайте функцию groupBy, которая принимает массив объектов и ключ, возвращает Map, где ключи - значения этого свойства, а значения - массивы объектов с таким значением свойства.
*/

export function groupBy<T extends Record<string, any>>(
  arr: T[],
  key: keyof T
): Map<T[keyof T], T[]> {
  const result = new Map<T[keyof T], T[]>();

  arr.forEach((item) => {
    const value = item[key];

    if (!result.has(value)) {
      result.set(value, []);
    }

    result.get(value)!.push(item);
  });

  return result;
}

