import React, { useEffect, useState } from 'react';

// Define the interface for the data structure
interface Todo {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const FetchDataFreeApi: React.FC = () => {
  const [todo, setTodo] = useState<Todo | null>(null); // State to store a single todo
  const [itemId, setItemId] = useState<number>(1); // State to store the selected id for fetching

  const fetchData = async (id: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const data: Todo = await response.json(); // Use Todo interface for the response
      setTodo(data); // Set the fetched data in state
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }
  };

  useEffect(() => {
    fetchData(itemId); // Fetch data based on the current itemId
  }, [itemId]);

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemId(Number(e.target.value)); // Update itemId when the input changes
  };

  return (
    <div>
      <h2>Fetch Specific Todo Item</h2>
      <div className="mb-4">
        <label htmlFor="itemId" className="mr-2">Enter Todo ID:</label>
        <input
          type="number"
          id="itemId"
          value={itemId}
          onChange={handleItemChange}
          className="border p-2"
          min="1"
        />
        <button onClick={() => fetchData(itemId)} className="ml-2 p-2 bg-blue-500 text-white rounded">Fetch Data</button>
      </div>

      {todo ? (
        <div className="border p-4 rounded shadow">
          <p><strong>Title:</strong> {todo.title}</p>
          <p><strong>Body:</strong> {todo.body}</p>
          <p><strong>User ID:</strong> {todo.userId}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FetchDataFreeApi;
