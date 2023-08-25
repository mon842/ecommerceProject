import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import Spinner from './Spinner';
import { ReactSortable } from 'react-sortablejs';

const ProductForm = ({
  _id,
  title: existingTitle,
  category: existingCategory,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
}) => {

  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [price, setPrice] = useState(existingPrice || '');
  const [images, setImages] = useState(existingImages || []);
  const [categories, setCategories] = useState( [] );
  const [category, setCategory] = useState( existingCategory || '' );
  const [goToProducts, setGoToProducts] = useState(false);
  const [isuploading, setIsuploading] = useState(false);

  const router = useRouter();

  
  async function saveProduct(e) {
    e.preventDefault();
    const data = {
      title,
      category,
      description,
      price,
      images
    }
    if (_id) {
      const res = await axios.put('/api/products', { ...data, _id });

    } else {
      const res = await axios.post('/api/products', data);
      console.log(res);
    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push('/products');
  }

  async function uploadImages(e) {
    const files = e.target?.files;
    if (files?.length > 0) {
      setIsuploading(true);
      const data = new FormData();

      for (const file of files) {
        data.append('file', file);
      }

      // const res=await fetch('/api/upload', {
      //   method: 'POST',
      //   body: data
      // })
      const res = await axios.post('/api/upload', data)

      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      })

      setIsuploading(false);
    }
  }

  const updateImagesOrder = (images) => {
    setImages(images)
  }

  useEffect(() => {
    axios.get('/api/categories').then((response) => {
      setCategories(response.data);
    });
  }, [])
  

  return (
    <form onSubmit={saveProduct}>

      <label htmlFor="">products</label>
      <input
        type="text"
        placeholder='product name'
        value={title}
        onChange={event => setTitle(event.target.value)}
      />

      <label >category</label>
      <select value={category} 
      onChange={(e)=>{setCategory(e.target.value)}}>
      <option value="">uncategorized</option>
        {categories.length>0 && categories.map((category) =>(
          <option key={category._id} value={category._id}>{category.name}</option>
        ))}
      </select>

      <label htmlFor="">photos</label>
      <div className='mb-2 flex flex-wrap gap-2'>

        <ReactSortable className='flex flex-wrap gap-1' list={images} setList={updateImagesOrder}>
          {!!images?.length && (
            images.map((link) => (
              <div key={link} className='h-20'>
                <img className='h-20 rounded' src={link} alt="" />
              </div>

            ))
          )}
        </ReactSortable>



        {isuploading &&
          (<div>
            <Spinner />
          </div>)
        }
        <label className='w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>

          <div>
            upload
          </div>

          <input type="file" onChange={uploadImages} className='hidden' />
        </label>

        {!images?.length && (
          <div>
            No photos of product
          </div>
        )}


      </div>

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