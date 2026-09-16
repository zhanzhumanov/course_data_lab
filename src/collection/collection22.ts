/* 
	Создайте функцию sumProperty, которая принимает массив объектов с числовыми свойствами и возвращает сумму всех значений указанного свойства.
*/

export function sumProperty<T>(objects: T[], property: keyof T): number {
	return objects.reduce((sum, object) => {
    return sum + Number(object[property]);
  }, 0);
}


