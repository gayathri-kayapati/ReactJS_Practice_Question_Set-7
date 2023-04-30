import { useEffect, useState } from "react";

/*Adding on to the previous question, Add a search bar to the component that allows users to filter the products by name. The search bar should update the list of displayed products in real-time as the user types. The search functionality should be case-insensitive. */
const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/products") {
        resolve({
          status: 200,
          message: "Success",
          data: {
            products: [
              { name: "Color Pencils", price: 50, quantity: 40, rating: 4.5 },
              { name: "Sketchpens", price: 110, quantity: 20, rating: 3.8 },
              { name: "Eraser", price: 20, quantity: 20, rating: 4.2 },
              { name: "Sharpener", price: 22, quantity: 30, rating: 4.7 }
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

export function SearchProducts() {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);

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

  const changeHandler = (e) =>
    e.target.value.length > 0
      ? setAllData(
          data.filter(({ name }) =>
            name.toUpperCase().includes(e.target.value.toUpperCase())
          )
        )
      : null;

  return (
    <div>
      <h2>Products</h2>
      <input type="search" onChange={changeHandler} />
      <ul style={{ listStyle: "none" }}>
        {allData.map(({ name, price, quantity, rating }) => (
          <li
            key={name}
            style={{
              border: "1px solid gray",
              marginBottom: 5,
              paddingLeft: 5,
              borderRadius: 8,
              display: "flex",
              justifyContent: "space-around"
            }}
          >
            <div>
              <p>{name}</p>
              <p>Price: {price}</p>
              <p>Quantity: {quantity}</p>
            </div>
            <div>
              <p>Rating: {rating}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
