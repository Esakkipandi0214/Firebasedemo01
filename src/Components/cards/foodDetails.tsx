import React, { useState } from 'react';
import FoodModel from './FoodModel';
import { useDetailsContext } from '../../Provider/DataContext';

interface CardsDetail {
  id: string;          // Changed to string to match new data structure
  name: string;       
  Price: string;      // Kept as string to match new data structure
  Quantity: string;   // Kept as string to match new data structure
}

const FoodDetails = () => {
  const { FoodItemsNew } = useDetailsContext();
  console.log("Data Context Cards:", FoodItemsNew);

  const [searchQuery, setSearchQuery] = useState("");
  const [isCardShow, setIsCardShow] = useState(false);
  const [cardDetail, setCardDetail] = useState<CardsDetail | undefined>();

//   // Updated orderDetails with new structure
//   const orderDetails: CardsDetail[] = [
//     {
//       "name": "magiie",
//       "Price": "12",
//       "Quantity": "12",
//       "id": "ZONA1u2OFTf9r4767TG2"
//     },
//     {
//       "name": "Porotta idli",
//       "Price": "20",
//       "Quantity": "4",
//       "id": "rrspzlZhEid4HgczhdLR"
//     },
//     {
//       "name": "magiie",
//       "Price": "12",
//       "Quantity": "12",
//       "id": "ZONA1u2OFTf9r4767TG2"
//     },
//     {
//       "name": "Porotta idli",
//       "Price": "20",
//       "Quantity": "4",
//       "id": "rrspzlZhEid4HgczhdLR"
//     }
//   ];

  const handleCardsShow = (cardItem: CardsDetail) => {
    setIsCardShow(true);
    setCardDetail(cardItem);
    console.log("clicked Card Item:", cardItem);
  };

  const handleCloseItemModel = () => {
    setIsCardShow(false);
  };

  console.log("Query:", searchQuery);

  return (
    <div className='h-full flex justify-center items-center p-1 w-full'>
      <div className='h-full bg-slate-500 py-7 w-[20%] flex'>
        <div className='flex px-1 w-[100px] h-[20px]'>
          <p className='w-full text-black flex'>
            Search:
            <input
              className='w-[160px]'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
            />
          </p>
        </div>
      </div>

      <div className='h-full pl-10 grid grid-cols-3 gap-2 py-2 overflow-y-auto w-full'>
        {FoodItemsNew
          .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((details) => (
            <div key={details.id} onClick={() => handleCardsShow(details)} className='bg-yellow-500 p-5 h-[200px] w-[200px]'>
              <h1>{details.id}</h1>
              <p>{details.name}</p>
              <p>Price: ${details.Price}</p>
              <p>Quantity: {details.Quantity}</p>
            </div>
          ))}
      </div>
      {isCardShow && cardDetail && <FoodModel setHanldeCardShow={handleCloseItemModel} cardDetail={cardDetail} />}
    </div>
  );
};

export default FoodDetails; // Keep the export statement the same
