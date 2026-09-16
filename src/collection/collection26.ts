/* 
	Создайте функцию groupProductsByPrice, которая группирует товары в категории: "дешевые" (<1000), "средние" (1000-5000), "дорогие" (>5000). В функции не должно быть циклов.
*/

type Product = {name: string, price: number};
type GroupedProducts = {cheap: Product[], medium: Product[], expensive: Product[]};

export function groupProductsByPrice(products: Product[]): GroupedProducts {
return products.reduce(
    (groups, product) => {
      if (product.price < 1000) {
        groups.cheap.push(product);
      } else if (product.price <= 5000) {
        groups.medium.push(product);
      } else {
        groups.expensive.push(product);
      }

      return groups;
    },
    {
      cheap: [],
      medium: [],
      expensive: []
    }
  );
}
