import { describe, it, expect } from 'vitest';
import { findIntersection } from './collection09';

describe('findIntersection', () => {
  it('should find intersection of two arrays', () => {
    expect(findIntersection([1, 2, 3, 4], [3, 4, 5, 6])).toEqual([3, 4]);
    expect(findIntersection([1, 2], [3, 4])).toEqual([]);
  });
});

/*
  Напишите функцию findIntersection, которая принимает два массива
  и возвращает массив их общих элементов, используя Set.
*/

export function findIntersection(arr1: number[], arr2: number[]): number[] {
  const set2 = new Set(arr2);

  return [...new Set(arr1.filter((item) => set2.has(item)))];
}
