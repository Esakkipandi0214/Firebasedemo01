import React, { useEffect, useState } from 'react';

// Define the interface for the item structure
interface Item {
  _id: string;
  name: string;
  quantity: number;
  createdAt: string;
}

const FetchDataMyApi: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]); // State to store the array of items

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/items`);
      const data: Item[] = await response.json(); // Use Item array interface for the response
      setItems(data); // Set the fetched data in state
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Item List</h2>
      <div className="grid grid-cols-3 justify-center items-center">
        {items.length > 0 ? (
          items.map(item => (
            <div key={item._id} style={{ marginBottom: '20px' }}>
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Created At:</strong> {new Date(item.createdAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default FetchDataMyApi;
