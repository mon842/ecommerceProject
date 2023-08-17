import Layout from '@/components/Layout'
import ProductForm from '@/components/ProductForm'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const EditProductPage = () => {

    const router= useRouter();
    const [productInfo, setProductInfo] = useState(null);
    
    const {id}=router.query;
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/products?id='+id).then((response) => {
            // console.log(response.data);
            setProductInfo(response.data);
        })
    }, [])
    
    return (
        <Layout>
            <h1 >edit Product</h1>
            {productInfo && <ProductForm {...productInfo}/>}
            
        </Layout>
    )
}

export default EditProductPage