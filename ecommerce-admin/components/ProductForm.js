import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';


const ProductForm = ({
  _id,
  title:existingTitle,
  description:existingDescription,
  price:existingPrice
}) => {
  
  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [price, setPrice] = useState( existingPrice || '');
  const [goToProducts,setGoToProducts] = useState(false);

  // console.log(_id);
  const router = useRouter();

  const data={
    title,
    description,
    price
  }
  async function saveProduct(e) {
    e.preventDefault();
    if (_id) {
      await axios.put('/api/products',{...data,_id});
    } else {
      await axios.post('/api/products',data);
    }
    
    setGoToProducts(true);
  }
  if(goToProducts){
    router.push('/products');
  }

  return (
      <form onSubmit={saveProduct}>
        
        <label htmlFor="">products</label>
        <input
          type="text"
          placeholder='product name'
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <label htmlFor="">description</label>
        <textarea
          placeholder='description'
          value={description}
          onChange={event => setDescription(event.target.value)}
        />

        <label htmlFor="">price</label>
        <input
          type="text"
          placeholder='price'
          value={price}
          onChange={event => setPrice(event.target.value)}
        />

        <button type='submit' className='btn-primary'>save</button>
      </form>
  )
}

export default ProductForm