import { useEffect, useState } from "react";

/*Create a React component that fetches a list of users from an API endpoint using useEffect hook and displays the name, email, and website of each user on the screen using the useState hook. Add a dropdown which filters the users by company name. */
const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/users") {
        resolve({
          status: 200,
          message: "Success",
          data: [
            {
              name: "John Doe",
              email: "john@example.com",
              website: "example.com",
              company: "ABC Inc"
            },
            {
              name: "Jane Doe",
              email: "jane@example.com",
              website: "example.com",
              company: "XYZ Corp"
            },
            {
              name: "Bob Smith",
              email: "bob@example.com",
              website: "example.com",
              company: "ABC Inc"
            },
            {
              name: "Alice Brown",
              email: "alice@example.com",
              website: "example.com",
              company: "ACME Corp"
            },
            {
              name: "Charlie Green",
              email: "charlie@example.com",
              website: "example.com",
              company: "XYZ Corp"
            }
          ]
        });
      } else {
        reject({
          status: 404,
          message: "Users list not found."
        });
      }
    }, 2000);
  });
};
export function EmployeesFilterdByCompany() {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/users");
      setData(response.data);
      setAllData(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const changeHandler = (e) => {
    e.target.value === "All Companies"
      ? setData(allData)
      : setData(allData.filter(({ company }) => company === e.target.value));
  };
  return (
    <div>
      <h2>Users</h2>
      Filter By Company:
      <select onChange={changeHandler}>
        <option value="All Companies">All Companies</option>
        <option value="ABC Inc">ABC Inc</option>
        <option value="XYZ Corp">XYZ Corp</option>
        <option value="ACME Corp">ACME Corp</option>
      </select>
      <ul>
        {data.map(({ name, email, website, company }) => (
          <li key={email}>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Website: {website}</p>
            <p>Company: {company}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
