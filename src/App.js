
import './App.css';
import * as React from 'react';
import { useState, useEffect } from 'react';

export default function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUsers] = useState([]);

  useEffect(() => {
    const search = ""
    fetch("https://api.github.com/users/" + search)
      .then(res => res.json())
      .then(
        (data) => {
          console.log(data)
          setIsLoaded(true);
          setUsers(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const search = e.target.search.value

    fetch("https://api.github.com/users/" + search)
      .then(res => res.json())
      .then(
        (data) => {
          console.log(data)
          setIsLoaded(true);
          setUsers(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )


  }


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-50 p-8 sm:p-12'>

        <div className="w-full max-w-4xl rounded-md border-2 border-gray-100 bg-white p-14">
          <div className="flex flex-col items-center">
            <span className="-rotate-1 rounded-lg bg-yellow-100 py-px px-2 text-sm text-yellow-800">learn to be king</span>
            <h3 className="mt-2 max-w-2xl text-center text-2xl font-bold leading-tight sm:text-3xl md:text-4xl md:leading-tight capitalize">Small project to get github profiles</h3>
            <form onSubmit={handleSubmit} className="mx-auto mt-4 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:gap-0">
              <input type="text" name="search" id="email" className="grow rounded border-2 border-gray-300 py-3 px-3 focus:border-emerald-500 focus:outline-none sm:rounded-l-md sm:rounded-r-none sm:border-r-0" placeholder="Enter the Username" />
              <button type="submit" className="rounded bg-blue-500 px-5 py-4 font-bold text-white sm:rounded-l-none sm:rounded-r-md">Search</button>
            </form>
          </div>
        </div>

        <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
          <div className="flex justify-center md:justify-end -mt-16">
            <img alt='img' className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500" src={user.avatar_url} />
          </div>
          <div>
            <h2 className="text-gray-800 text-3xl font-semibold">{user.login}</h2>
            <p className="mt-2 text-gray-700 text-semibold">{user.type}</p>
            <p className="mt-2 text-gray-600">{user.login} is a github user since {user.created_at} he has {user.public_repos} public repositories for more info click on Read More to go to the main profile</p>

          </div>
          <div className="flex justify-end mt-4">
            <a href={user.html_url} target='blank' className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Read More</a>
          </div>
        </div>
        <ul>

          <li key={user.id}>

          </li>

        </ul>
      </div >

    );
  }
}



