import React, { useContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link';
import Button from './Button';
import CartIcon from './icons/CartIcon';
import { CartContext } from './CartContext';

const ProductWrapper = styled.div`

`
const Title = styled(Link)`
  font-weight: normal;
  font-size:.9rem;
  color:inherit;
  text-decoration:none;
  margin:0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const WhiteBox = styled(Link)`
    background-color: #fff;
    padding: 20px;
    height:120px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius:10px;
    img{
        max-width: 100%;
        max-height: 80px;
    }
`

const Price = styled.div`
  font-size: 1rem;
  font-weight:400;
  text-align: right;

`;

const PriceRow = styled.div`
  display: block;
  align-items: center;
  justify-content:space-between;
  margin-top:2px;
`;

const ProductBox = ({ _id, title, description, price, images }) => {
  const {addProduct}= useContext(CartContext);
  const url='/product/'+_id;
  return (
    <ProductWrapper>
      <WhiteBox href={url}>

        <img src={images[0]} alt="" />
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button primary outline onClick={()=>{ addProduct(_id) }}><CartIcon/> Add to Cart</Button>
        </PriceRow>
        
      </ProductInfoBox>
      
    </ProductWrapper>

  )
}

export default ProductBox