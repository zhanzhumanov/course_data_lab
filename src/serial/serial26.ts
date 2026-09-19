/* 
	Доработайте код для сбора всех ID книг в массив.
	Пример XML в файле saxXML.ts
*/

import { SAXParser } from "sax";

// Исходный код
export function collectBookIds(xml: string): string[] {
  const parser = new SAXParser(true);
  const ids: string[] = [];
   parser.onopentag = (node) => {
    if (node.name === "book") {
      ids.push(String(node.attributes.id));
    }
  };
  // TODO: При открытии тега 'book' добавляйте значение атрибута 'id' в массив ids

  
  parser.write(xml).close();
  return ids;
}
