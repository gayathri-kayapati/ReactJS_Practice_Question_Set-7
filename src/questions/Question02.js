import { useEffect, useState } from "react";

/*Create a React component that fetches user data from an API endpoint using useEffect hook and displays the user's name, email, and phone number on the screen using the useState hook. Add a button which toggles the display of the user's address (street, suite, city, zipcode). */
const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/user") {
        resolve({
          status: 200,
          message: "Success",
          data: {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1 555-555-5555",
            address: {
              street: "123 Main St",
              suite: "Suite 456",
              city: "Anytown",
              zipcode: "12345"
            }
          }
        });
      } else {
        reject({
          status: 404,
          message: "User not found."
        });
      }
    }, 2000);
  });
};

export function UsersData() {
  const [data, setData] = useState({});
  const [flag, setFlag] = useState(true);
  const fetchData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/user");
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const hideAddress = () => {
    setFlag(!flag);
  };
  return (
    <div>
      <h1>User</h1>
      <ul style={{ listStyle: "none" }}>
        {Object.keys(data).map((key, idx) =>
          key !== "address" ? (
            <li key={idx}>
              {key.replace(/^./, key[0].toUpperCase())}:{data[key]}
            </li>
          ) : null
        )}
      </ul>
      <button onClick={hideAddress}>Hide Address</button>
      {!flag ? (
        <ul style={{ listStyle: "none" }}>
          {Object.keys(data.address).map((key, idx) => (
            <li key={idx}>
              {key}:{data.address[key]}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
