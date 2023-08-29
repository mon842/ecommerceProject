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
  const [properties, setProperties] = useState([]);


  // functions


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
    const data = {
      name,
      parentCategory,
      properties:properties.map(p => ({
        pname:p.pname,
        values:p.values.split(','),
      })),
    };

    if (editedCategory) {
      const res = await axios.put('/api/categories', { ...data, _id: editedCategory._id });
      setEditedCategory(null);
    } else {
      const res = await axios.post('/api/categories', data);
    }

    setName('');
    setParentCategory('');
    setProperties([]);
    fetchCategories();
  };

  const editCategory = (category) => {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category?.parent?._id);
    setProperties(
      category.properties.map(({pname,values}) => ({
      pname,
      values:values.join(',')
    }))
    );
  }

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

  function addProperty() {
    setProperties(prev => {
      return [...prev, { pname: '', values: '' }];
    });
  }
  function handlePropertyNameChange(index, property, newName) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].pname = newName;
      return properties;
    });
  }
  function handlePropertyValuesChange(index, property, newValues) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToRemove) {
    setProperties(prev => {
      return [...prev].filter((p,pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }
  return (

    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory ? 'edit category' : 'Create new Category'}
      </label>

      <form onSubmit={saveCategory}>
        <div className='flex gap-1'>
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
        </div>

        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            onClick={addProperty}
            type="button"
            className="btn-default text-sm mb-2">
            Add new property
          </button>
          {properties.length > 0 && properties.map((property, index) => (
            <div key={property.name} className="flex gap-1 mb-2">
              <input type="text"
                value={property.pname}
                className="mb-0"
                onChange={ev => handlePropertyNameChange(index, property, ev.target.value)}
                placeholder="property name (example: color)" />

              <input type="text"
                className="mb-0"
                onChange={ev =>
                  handlePropertyValuesChange(
                    index,
                    property, ev.target.value
                  )}
                value={property.values}
                placeholder="values, comma separated" />
              <button
                onClick={() => removeProperty(index)}
                type="button"
                className="btn-red">
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-1">
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName('');
                setParentCategory('');
                setProperties([]);
              }}
              className="btn-default">Cancel</button>
          )}
          <button type="submit"
                  className="btn-primary py-1">
            Save
          </button>
        </div>
      </form>
      

      {!editedCategory && (
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
                <button onClick={() => { editCategory(category) }} className='btn-default'>edit</button>
                <button onClick={() => { deleteCategory(category) }} className='btn-red ml-1'>delete</button>
              </td>
            </tr>
          ))}


        </tbody>
      </table>
      )}
    </Layout>
  )
}


export default withSwal(({ swal }, ref) => (
  <Categories swal={swal} />
));