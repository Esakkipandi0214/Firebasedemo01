import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDetailsContext } from '../../Provider/DataContext';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Product {
  name: string;
  Price: string;
  Quantity: string;
  id: string;
}

interface DemoHeaderProps {
  FoodItems: Product[]; // Define the type for the FoodItems prop
}

const DemoHeader: React.FC<DemoHeaderProps> = () => {
  const route = useRouter();
  const { FoodItemsNew, addFoodITems } = useDetailsContext();

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
      // Add each product individually using addFoodITems
        // Add each product individually using addFoodITems
        if(FoodItemsNew.length === 0){
          fetchedData.forEach(({ name, Price, Quantity, id }) => {
            addFoodITems(name, Price, Quantity, id);
          });
        }

      console.log('Fetched Data Header Context 1:', fetchedData);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
      fetchData();
  }, []);

  
  console.log('Fetched Data Header Context 2:', FoodItemsNew);

  const HeaderData = [
    { Label: "Food", Link: "/Food" },
    { Label: "GetFoodItems", Link: "/GetFoodItems" },
    { Label: "UpdateFoodItem", Link: "/UpdateFoodItem" },
    { Label: "Cards", Link: "/Cards" }
  ];

  const handleLogout = () => {
    localStorage.removeItem("Mhytoken");
    localStorage.removeItem("MhytokenUserId");
    route.push("/");
  };

  return (
    <div className='flex w-full justify-between bg-blue-500'>
      <div className='p-4 gap-4 flex'>
        {HeaderData.map((header) => (
          <div key={header.Label} className='bg-red-500 border border-none p-2 rounded-xl outline-none'>
            <a className='text-white' href={`${header.Link}`}>{header.Label}</a>
          </div>
        ))}
      </div>
      <div className='flex justify-center items-center p-3'>
        <button onClick={handleLogout} className='text-white bg-violet-500 p-2 border border-none rounded-lg'>Logout</button>
      </div>
    </div>
  );
};

export default DemoHeader;
