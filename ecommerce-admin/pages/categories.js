import Layout from '@/components/Layout'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { withSwal } from 'react-sweetalert2';



const Categories = ({ swal }) => {
  // data variables
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState('');


  // functions

  const editCategory = (category) => {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category?.parent?._id);
  }

  useEffect(() => {
    fetchCategories();
  }, [])
  const fetchCategories = () => {
    axios.get('/api/categories').then((result) => {
      setCategories(result.data);
    });
  }


  const saveCategory = async (ev) => {
    ev.preventDefault();
    const data = { name, parentCategory };
    if (editedCategory) {
      const res = await axios.put('/api/categories', { ...data, _id: editedCategory._id });
      setEditedCategory(null);
    } else {
      const res = await axios.post('/api/categories', data);
    }

    setName('');
    setParentCategory('')
    fetchCategories();
  };

  const deleteCategory = async (category) => {
    swal.fire({
      title: 'Are you sure you want to delete this category?',
      text: `Are you sure about ${category.name}`,
      showCancelButton: true,
      confirmButtonText: 'Yes,delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d55'

    }).then(async result => {
      if (result.isConfirmed) {
        const { _id } = category;
        await axios.delete('/api/categories?_id=' + _id);
        fetchCategories();
      }
    })
  }


  return (

    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory ? 'edit category' : 'Create new Category'}
      </label>

      <form className='flex gap-1' onSubmit={saveCategory}>
        <input
          type="text"
          placeholder='category name'
          onChange={(e) => { setName(e.target.value) }}
          value={name}
        />

        <select value={parentCategory}
          onChange={(ev) => { setParentCategory(ev.target.value) }}>
          <option value="">no parent category</option>
          {categories?.length > 0 && categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <button
          type='submit'
          className='btn-primary'>save
        </button>
      </form>

      <table className='basic'>
        <thead >
          <tr>
            <td>
              category name
            </td>
            <td>
              parent category
            </td>
            <td>
              function
            </td>
          </tr>
        </thead>
        <tbody>
          {categories?.length > 0 && categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>{category?.parent?.name}</td>
              <td>
                <button onClick={() => { editCategory(category) }} className='btn-primary'>edit</button>
                <button onClick={() => { deleteCategory(category) }} className='btn-primary ml-1'>delete</button>
              </td>
            </tr>
          ))}


        </tbody>
      </table>
    </Layout>
  )
}

// export default categories


export default withSwal(({ swal }, ref) => (
  <Categories swal={swal} />
));