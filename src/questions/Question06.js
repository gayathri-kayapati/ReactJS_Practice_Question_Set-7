import { useEffect, useState } from "react";

/*Create a React component that fetches a list of movies from an API endpoint using useEffect hook and displays the title, year, and genre of each movie on the screen using the useState hook. Add a dropdown which filters the movies by genre. */
const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/movies") {
        resolve({
          status: 200,
          message: "Success",
          data: [
            {
              title: "The Godfather",
              year: 1972,
              genre: "Crime"
            },
            {
              title: "The Shawshank Redemption",
              year: 1994,
              genre: "Drama"
            },
            {
              title: "The Dark Knight",
              year: 2008,
              genre: "Action"
            },
            {
              title: "Forrest Gump",
              year: 1994,
              genre: "Comedy"
            },
            {
              title: "The Matrix",
              year: 1999,
              genre: "Science Fiction"
            },
            {
              title: "Jurassic Park",
              year: 1993,
              genre: "Science Fiction"
            },
            {
              title: "Star Wars: Episode IV - A New Hope",
              year: 1977,
              genre: "Science Fiction"
            },
            {
              title: "The Terminator",
              year: 1984,
              genre: "Action"
            },
            {
              title: "Die Hard",
              year: 1988,
              genre: "Action"
            },
            {
              title: "Pulp Fiction",
              year: 1994,
              genre: "Crime"
            }
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

export function FilterMoviesByGenre() {
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
      : setData(allData.filter(({ genre }) => genre === e.target.value));
  };
  return (
    <div>
      <h2>Movies</h2>
      Filter movies by genre:{" "}
      <select onChange={changeHandler}>
        <option value="All">All</option>
        <option value="Crime">Crime</option>
        <option value="Drama">Drama</option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Science Fiction">Science Fiction</option>
      </select>
      <ul>
        {data.map(({ title, year, genre }) => (
          <li key={title}>
            <p>{title}</p>
            <p>{year}</p>
            <p>{genre}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
