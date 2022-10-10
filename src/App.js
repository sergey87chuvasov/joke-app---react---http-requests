import React, { useState, useEffect, useCallback } from 'react';

import JokeList from './components/JokeList';
import './App.css';
import AddJoke from './components/AddJoke';

function App() {
  //hadcore version
  // const dummyJokes = [
  //   {
  //     id: 1,
  //     type: "general",
  //     setup: "What do you call a bee that lives in America?",
  //     punchline: "A USB.",
  //   },
  //   {
  //     id: 2,
  //     type: "programming",
  //     setup: "What's the best thing about a Boolean?",
  //     punchline: "Even if you're wrong, you're only off by a bit.",
  //   },
  // ];

  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // get
  // function fetchJokesHandler(params) {
  //   fetch('https://official-joke-api.appspot.com/random_ten')
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setJokes(data);
  //     });
  // }

  // async // await
  // async function fetchJokesHandler(params) {
  //   setIsLoading(true);
  //   setError(null);

  const fetchJokesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    // catch mistake
    try {
      const response = await fetch(
        // 'https://official-joke-api.appspot.com/random_ten'
        'https://react-course-http-28f8d-default-rtdb.firebaseio.com/'
      );

      // or true or false - if false
      if (!response.ok) {
        throw new Error('something going wrong');
      }

      const data = await response.json();

      setJokes(data);
    } catch (e) {
      // get our message  - 'something going wrong'
      setError(e.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchJokesHandler();
  }, [fetchJokesHandler]); // указатель на функц фетч

  function addJokeHandler(joke) {
    console.log(joke);
  }

  let content = <p>Шуток не найдено...</p>;

  if (jokes.length > 0) {
    content = <JokeList jokes={jokes} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Загрузка шуток...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddJoke onAddJoke={addJokeHandler} />
      </section>
      <section>
        <button onClick={fetchJokesHandler}>Fetch Jokes</button>
      </section>
      <section>
        {content}
        {/* {!isLoading && jokes.length > 0 && <JokeList jokes={jokes} />}
        {!isLoading && jokes.length === 0 && !error && (
          <p>Шуток не найдено...</p>
        )}
        {isLoading && <p>Загрузка шуток...</p>}
        {!isLoading && error && <p>{error}</p>} */}
      </section>
    </React.Fragment>
  );
}

export default App;
