import { useEffect, useState } from "react";

/*Create a React component that fetches a list of movies from an API endpoint using useEffect hook and displays the title, year, and rating of each movie on the screen using the useState hook. Add a dropdown which filters the movies by year. You can keep 5 dropdown values - 2005 to 2010. */
const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/movies") {
        resolve({
          status: 200,
          message: "Success",
          data: [
            { title: "The Dark Knight", year: 2008, rating: 9.0 },
            { title: "Inception", year: 2009, rating: 8.8 },
            { title: "Interstellar", year: 2010, rating: 8.6 },
            { title: "Tenet", year: 2009, rating: 7.5 },
            { title: "Real Steal", year: 2007, rating: 7.5 }
          ]
        });
      } else {
        reject({
          status: 404,
          message: "Movies list not found."
        });
      }
    }, 2000);
  });
};
export function ListOfMovies() {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/movies");
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
    e.target.value === "All"
      ? setData(allData)
      : setData(
          allData.filter(({ year }) => year.toString() === e.target.value)
        );
  };

  return (
    <div>
      <h2>Movies</h2>
      Filter By Year:{" "}
      <select onChange={changeHandler}>
        <option value="All">All</option>
        <option value="2005">2005</option>
        <option value="2006">2006</option>
        <option value="2007">2007</option>
        <option value="2008">2008</option>
        <option value="2009">2009</option>
        <option value="2010">2010</option>
      </select>
      <ul>
        {data.map(({ title, year, rating }) => (
          <li key={title}>
            <p>Name: {title}</p>
            <p>Year: {year}</p>
            <p>Rating: {rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
