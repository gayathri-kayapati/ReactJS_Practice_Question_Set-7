import { useEffect, useState } from "react";

/*Create a React component that uses the useEffect hook to fetch the product data from the API endpoint using the fakeFetch function provided below. The component should use the useState hook to store the fetched data and a second state variable to store the sorted data. The sorted data should be sorted in descending order by rating. */
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
    }, 0);
  });
};

export function SortProductdByRating() {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);

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

  useEffect(() => {
    if (data.length > 0) {
      setSortedData(data.sort((a, b) => b.rating - a.rating));
    }
  }, [data]);

  return (
    <div>
      <h2>Products</h2>
      <ul style={{ listStyle: "none" }}>
        {sortedData.map(({ name, price, quantity, rating }) => (
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
