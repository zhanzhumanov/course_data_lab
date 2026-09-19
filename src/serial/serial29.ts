/* 
	Найдите книгу с ID=2 и верните её название.
	Пример XML в файле saxXML.ts
*/
import { SAXParser } from "sax";

export function findBookById(xml: string, targetId: string): string | null {
  const parser = new SAXParser(true);

  let foundBook = false;
  let isTitleTag = false;
  let currentTitle = "";
  let result: string | null = null;
  
// TODO: Реализуйте логику поиска книги по ID и извлечения её названия
  parser.onopentag = (node) => {
    if (node.name === "book") {
      foundBook = node.attributes.id === targetId;
    }

    if (node.name === "title" && foundBook) {
      isTitleTag = true;
      currentTitle = "";
    }
  };

  parser.ontext = (text) => {
    if (isTitleTag) {
      currentTitle += text;
    }
  };

  parser.onclosetag = (name) => {
    if (name === "title" && foundBook) {
      isTitleTag = false;
      result = currentTitle.trim();
    }

    if (name === "book") {
      foundBook = false;
    }
  };

  parser.write(xml).close();

  return result;
}