/* 
	Реализовать функцию calculateOrderTotal(xmlDoc), которая принимает XML-документ xmlDoc и возвращает общую стоимость заказа.

	Пример XML:
<order id="123">
  <items>
    <item productId="1" price="100" quantity="2"/>
    <item productId="2" price="50" quantity="3"/>
    <item productId="3" price="200" quantity="1"/>
  </items>
</order>
*/

export interface OrderWithPrices {
  id: string;
  items: {
    productId: string;
    price: number;
    quantity: number;
  }[];
}

export function calculateOrderTotal(xmlDoc: Document): number {
  const items = xmlDoc.getElementsByTagName("item");
  let total = 0;

  for (const item of Array.from(items)) {
    const price = item.getAttribute("price");
    const quantity = item.getAttribute("quantity");

    if (price !== null && quantity !== null) {
      total += Number(price) * Number(quantity);
    }
  }

  return total;
}
