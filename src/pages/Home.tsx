import React, { useState} from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPeople } from '../apis/api';

function Home() {
    const [page, setPage] = useState(1);
    const { data, error, isLoading } = useQuery({
      queryKey: ['people', page],
      queryFn: () => fetchPeople(page),
    });
  
  
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
  return (
    <div className="App">
        <h1>Star Wars Characters</h1>
        <ul>
        {data.results.map((person: any) => (
            <li key={person.name}>{person.name}</li>
        ))}
        </ul>
        <div>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
            Previous
        </button>
        <button onClick={() => setPage((prev) => (data.next ? prev + 1 : prev))} disabled={!data.next}>
            Next
        </button>
        </div>
    </div>
  );
}

export default Home