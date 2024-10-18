import React from 'react';
import { FaTimes } from 'react-icons/fa';


interface CardsDetail {
  id: number;
  name: string;
  category: string;
  price: number;
  calories: number;
  ingredients: string[];
}

interface FoodModelProps {
  cardDetail: CardsDetail;
  setHanldeCardShow:()=>void;
}

const FoodModel: React.FC<FoodModelProps> = ( {cardDetail,setHanldeCardShow }) => {
  console.log("Passed CardItem:", cardDetail);

  return (
    <div className="fixed inset-1 bg-black/55 flex  items-center justify-center w-full h-full">
      <button onClick={setHanldeCardShow} className=' absolute top-5 right-6 text-red-500'> <FaTimes size={24} /></button>
      <div className="bg-yellow-500 grid grid-cols-1 justify-center items-center p-5 h-[300px] border border-white rounded-lg w-[400px]">
        <h2 className=' flex justify-center items-center text-white text-lg font-medium'>FoodItem</h2>
        <div className=' bg-white grid grid-cols-2 justify-center items-center p-3 border border-none rounded-xl h-[80%]'>
        <h1 className=' flex gap-x-2 '>FoodId: <h2>{cardDetail.id}</h2></h1>
        <p className=' flex gap-x-2 '>Food Name: <p>{cardDetail.name}</p></p>
        <p className=' flex gap-x-2 '>Catogary: <p>{cardDetail.category}</p></p>
        <p className=' flex gap-x-2 '>Price: <p>${cardDetail.price}</p></p>
        <p className=' flex gap-x-2 '>Calories: <p>{cardDetail.calories}</p></p>
        <p className=' flex gap-x-2 '>Ingredients: <p>{cardDetail.ingredients.join(', ')}</p></p>
        </div>
      </div>
    </div>
  );
};

export default FoodModel;
