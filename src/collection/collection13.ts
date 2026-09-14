/* 
	Создайте функцию countByRanges, которая принимает массив чисел и массив диапазонов, возвращает Map, где ключи - строковые представления диапазонов, а значения - количество чисел, попадающих в каждый диапазон.
*/

export function countByRanges(numbers: number[], ranges: [number, number][]): Map<string, number> {
	const result = new Map<string, number>();
ranges.forEach(([min, max]) => {
    const count = numbers.filter(
      (number) => number >= min && number <= max
    ).length;

    result.set(`${min}-${max}`, count);
  });
	return result;
}
