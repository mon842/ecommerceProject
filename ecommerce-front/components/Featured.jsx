import React, { useContext } from 'react'
import Center from './Center'
import styled from 'styled-components';
import Button from './Button';
import ButtonLink from './ButtonLink';
import CartIcon from './icons/CartIcon';
import { CartContext } from './CartContext';


const Bg = styled.div`
  background-color: #222;
  color:#fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin:0;
  font-weight:normal;
  font-size:1.5rem;

  }
`;
const Desc = styled.p`
  color:#aaa;
  font-size:.8rem;
`;

const ColumnsWrapper = styled.div`
display: grid;
grid-template-columns: 0.8fr 1.2fr;
img{
    max-width:100%;
}
`

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap:10px;
  margin-top:25px;
`;

const Featured = ({product}) => {
    const img=product.images[0];
    const {addProduct}= useContext(CartContext);

    const addFeaturedToCart=()=>{
        addProduct(product._id);
    }

    return (
        <Bg>
            <Center>
                <ColumnsWrapper>
                    <Column>
                        <div>
                            <Title>{product.title}</Title>
                            <Desc>
                                {product.description}
                            </Desc>
                            <ButtonsWrapper>
                                <ButtonLink white={1} outline={1} href={'/products/'+product._id} >Read More</ButtonLink>
                                <Button primary={1} onClick={addFeaturedToCart} >
                                    <CartIcon/>

                                    Add to cart
                                </Button>
                            </ButtonsWrapper>

                        </div>
                    </Column>


                    <Column>
                        <img src={img} alt="" />
                    </Column>

                </ColumnsWrapper>

            </Center>
        </Bg>
    )
}

export default Featured