import { useEffect, useState } from "react";

/*Create a React component that fetches a list of products from an e-commerce API endpoint using useEffect hook and displays the product name, description, price, and quantity on the screen using the useState hook. Add a button which allows the user to sort the products by price (lowest to highest). */
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
  const fetchData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/products");
      setData(response.data.products);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const clickHandler = () => {
    let dataCopy = [...data];
    setData(dataCopy.sort((a, b) => a.price - b.price));
  };

  return (
    <div>
      <h2>Products</h2>
      <button onClick={clickHandler}>Sort by Price</button>
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
