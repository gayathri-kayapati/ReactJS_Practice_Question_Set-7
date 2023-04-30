import { useEffect, useState } from "react";

/*Create a component that displays a random quote from an API using the useEffect and useState hooks. The component should fetch a new quote when the user clicks a button. */
const fakeFetch = () => {
  const quotes = [
    {
      content: "Be yourself; everyone else is already taken.",
      author: "Oscar Wilde"
    },
    {
      content:
        "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
      author: "Albert Einstein"
    },
    {
      content: "So many books, so little time.",
      author: "Frank Zappa"
    },
    {
      content: "A room without books is like a body without a soul.",
      author: "Marcus Tullius Cicero"
    },
    {
      content:
        "In three words I can sum up everything I've learned about life: it goes on.",
      author: "Robert Frost"
    }
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      resolve(randomQuote);
    }, 500);
  });
};
export function RandomQuote() {
  const [data, setData] = useState({});
  const fetchData = async () => {
    try {
      const response = await fakeFetch();
      setData(response);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <p>"{data.content}"</p>
      <p>-{data.author}</p>
      <button onClick={fetchData}>New Quote</button>
    </div>
  );
}
