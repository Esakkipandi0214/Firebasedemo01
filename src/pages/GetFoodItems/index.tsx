import { db } from '@/firebase';
import { useEffect, useState } from 'react';
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore';
// import Header from '@/Components/DemoSubComponents/DemoHeader';
import { useRouter } from 'next/router';
import { useDetailsContext } from '../../Provider/DataContext';

interface Product {
  name: string;
  Price: string;
  Quantity: string;
  id: string;
}

export default function ProductTable() {
  const [FoodItems, setFoodItem] = useState<Product[]>([]); // Corrected the state function name
  const [Message, setMessage] = useState('');
  const router = useRouter();
  const { FoodItemsNew,addFoodITems } = useDetailsContext();

  useEffect(() => {
    const authToken = localStorage.getItem('Mhytoken');
    const userauth = localStorage.getItem('MhytokenUserId');
    if (!authToken && !userauth) {
      router.push('/');
    }
  }, [router]);

  const fetchData = async () => {
    try {
      const foodIdget = await getDocs(collection(db, 'FoodOrder'));
      const fetchedData = foodIdget.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Product)
      );
      setFoodItem(fetchedData);
      // Add each product individually using addFoodITems
        // Add each product individually using addFoodITems
        if(FoodItemsNew.length === 0){
          fetchedData.forEach(({ name, Price, Quantity, id }) => {
            addFoodITems(name, Price, Quantity, id);
          });
        }

      console.log('Fetched Data:', fetchedData);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteFoodItem = async (FoodId: string) => {
    try {
      const userDocRef = doc(db, 'FoodOrder', FoodId);
      await deleteDoc(userDocRef);
      setMessage(`Food item successfully deleted for id: ${FoodId}`);
      fetchData(); // Optionally refetch data after deletion
    } catch (error) {
      setMessage(`Delete failed for id: ${FoodId}, error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("Fetch Context data:", FoodItemsNew);

  return (
    <>
      {/* <Header FoodItems={FoodItems} /> */}
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <caption className="caption-top text-lg font-semibold py-2">
          A simple table of product inventory
        </caption>
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 w-[200px] text-left border border-gray-300">
              Name
            </th>
            <th className="px-4 py-2 text-right border border-gray-300">
              Price
            </th>
            <th className="px-4 py-2 text-right border border-gray-300">
              Quantity
            </th>
            <th className="px-4 py-2 text-right border border-gray-300">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {FoodItems.map((product) => (
            <tr key={product.id}>
              <td className="px-4 py-2 border border-gray-300 font-medium">
                <a href={`/FoodSingle/${product.name}/${product.id}`}>
                  {product.name}
                </a>
              </td>
              <td className="px-4 py-2 text-right border border-gray-300">
                ${product.Price}
              </td>
              <td className="px-4 py-2 text-right border border-gray-300">
                {product.Quantity}
              </td>
              <td className="px-4 py-2 text-right border border-gray-300">
                <button
                  onClick={() => handleDeleteFoodItem(product.id)}
                  className="bg-red-500 text-white p-2 border rounded-lg w-[50%]"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center w-[600px] items-center p-3">
        {Message && (
          <div className="p-3 bg-green-500/45">
            <p className="text-white">{Message}</p>
          </div>
        )}
      </div>
    </>
  );
}
