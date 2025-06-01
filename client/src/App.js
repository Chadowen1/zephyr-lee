import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(response => response.json())
      .then(data => setData(data.message))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Welcome to My Next.js App</h1>
      <p>Data from backend: {data}</p>
    </div>
  );
}