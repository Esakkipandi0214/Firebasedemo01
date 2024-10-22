import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface CardsDetail {
  id: string;          // Changed to string to match new data structure
  name: string;
  Price: string;      // Kept as string to match new data structure
  Quantity: string;   // Kept as string to match new data structure
}

interface FoodModelProps {
  cardDetail: CardsDetail;
  setHanldeCardShow: () => void;
}

const FoodModel: React.FC<FoodModelProps> = ({ cardDetail, setHanldeCardShow }) => {
  console.log("Passed CardItem:", cardDetail);

  return (
    <div className="fixed inset-1 bg-black/55 flex items-center justify-center w-full h-full">
      <button onClick={setHanldeCardShow} className='absolute top-5 right-6 text-red-500'>
        <FaTimes size={24} />
      </button>
      <div className="bg-yellow-500 grid grid-cols-1 justify-center items-center p-5 h-[300px] border border-white rounded-lg w-[400px]">
        <h2 className='flex justify-center items-center text-white text-lg font-medium'>Food Item</h2>
        <div className='bg-white grid grid-cols-2 justify-center items-center p-3 border border-none rounded-xl h-[80%]'>
          <h1 className='flex gap-x-2'>Food ID: <span>{cardDetail.id}</span></h1>
          <p className='flex gap-x-2'>Food Name: <span>{cardDetail.name}</span></p>
          <p className='flex gap-x-2'>Price: <span>${cardDetail.Price}</span></p>
          <p className='flex gap-x-2'>Quantity: <span>{cardDetail.Quantity}</span></p>
          {/* Removed the category and calories fields as they are no longer part of the new structure */}
          {/* <p className='flex gap-x-2'>Ingredients: <span>{cardDetail.ingredients.join(', ')}</span></p> */}
        </div>
      </div>
    </div>
  );
};

export default FoodModel;
