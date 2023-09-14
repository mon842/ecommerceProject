import React from 'react'
import styled from 'styled-components';
import Center from './Center';
import ProductBox from './ProductBox';

const Title = styled.h2`
  font-size: 2rem;
  margin:30px 0 20px;
  font-weight: normal;
`;

const ProductGrid=styled.div`
    display: grid;
    grid-template-columns:1fr 1fr 1fr 1fr;
    gap: 40px;
    margin-top:20px;
`

const NewProducts = ({ products }) => {
    // console.log(products);
    return (
        <Center>
            <Title>New Arrivals</Title>
            <ProductGrid>
                {
                    products?.length>0 && products.map(product =>(
                        <div key={product._id}>
                            <ProductBox {...product}/>
                        </div>
                        
                    ))
                }
            </ProductGrid>
        </Center>
    )
}

export default NewProducts