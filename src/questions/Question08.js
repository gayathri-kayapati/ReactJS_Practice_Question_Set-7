import { useEffect, useState } from "react";

/*Adding on to the previous question, There should be three buttons for this purpose: "Low to High", "High to Low", and "Reset". When the user clicks on "Low to High", the products should be sorted by price in ascending order. When the user clicks on "High to Low", the products should be sorted by price in descending order. When the user clicks on "Reset", the products should be displayed in their original order. */
const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/products") {
        resolve({
          status: 200,
          message: "Success",
          data: {
            products: [
              {
                name: "Product 1",
                description: "This is the first product",
                price: 25.99,
                quantity: 10
              },
              {
                name: "Product 2",
                description: "This is the second product",
                price: 19.99,
                quantity: 15
              },
              {
                name: "Product 3",
                description: "This is the third product",
                price: 35.5,
                quantity: 5
              },
              {
                name: "Product 4",
                description: "This is the fourth product",
                price: 49.99,
                quantity: 20
              }
            ]
          }
        });
      } else {
        reject({
          status: 404,
          message: "Product list not found."
        });
      }
    }, 2000);
  });
};
export function SortProductsByPrice() {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/products");
      setData(response.data.products);
      setAllData(response.data.products);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortFromLowToHigh = () => {
    const dataCopy = [...data];
    setData(dataCopy.sort((a, b) => a.price - b.price));
  };

  const sortFromHighToLow = () => {
    const dataCopy = [...data];
    setData(dataCopy.sort((a, b) => b.price - a.price));
  };

  const resetData = () => {
    setData(allData);
  };

  return (
    <div>
      <h2>Products</h2>
      <button onClick={sortFromLowToHigh}>Low to High</button>
      <button onClick={sortFromHighToLow}>High to Low</button>
      <button onClick={resetData}>Reset</button>
      <ul>
        {data.map(({ name, description, price, quantity }) => (
          <li key={name}>
            <p>{name}</p>
            <p>{description}</p>
            <p>{price}</p>
            <p>{quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
