import Button from '@/components/Button';
import { CartContext } from '@/components/CartContext'
import Center from '@/components/Center';
import Header from '@/components/Header'
import Input from '@/components/Input';
import Layout from '@/components/Layout';
import Table from '@/components/Table';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img{
      max-width: 80px;
      max-height: 80px;
    }
  }
`;
const QuantityLabel = styled.span`
  padding: 0 15px;
  display: inline-block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;

const CartPage = () => {
    const { cartProducts, addProduct, removeProduct, clearCartProducts, setCartProducts } = useContext(CartContext);
    const { data: session } = useSession();
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [country, setCountry] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {

        const ip = async () => {
            try {
                const res = await fetch('https://api.ipify.org');
                // setIpaddress(res);
                const ipadd = await res.text();
                const loc = await fetch(`http://ip-api.com/json/${ipadd}`);
                const data = await loc.json();
                console.log(data);
                setCountry(data?.country);
                setCity(data?.city);
                setPostalCode(data?.zip);
                setStreetAddress(data?.regionName);
            } catch (error) {
            }
        }
        ip();
        setName(session?.user?.name);
        setEmail(session?.user?.email);

    }, [])


    useEffect(() => {
        if (cartProducts?.length > 0) {
            axios.post('/api/cart', { ids: cartProducts }).then((response) => {
                setProducts(response.data);
            });
        }
        else {
            setProducts([])
        }

    }, [cartProducts])

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        if (window?.location.href.includes('success')) {
            // setCartProducts([]);
            clearCartProducts();
            clearCartProducts();
            setIsSuccess(true);
            
        }
    }, []);

    let total = 0;
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }
    async function goToPayment() {
        const response = await axios.post('/api/checkout', {
            name, email, city, postalCode, streetAddress, country,
            cartProducts,
        });
        if (response.data.url) {
            window.location = response.data.url;
        }
    }
    if (isSuccess) {
        return (
            <Layout>
                <Header />
                <Center>
                    <ColumnsWrapper>
                        <Box>
                            <h1>Thanks for your order!</h1>
                            <p>We will email you when your order will be sent.</p>
                        </Box>
                    </ColumnsWrapper>
                </Center>
            </Layout>
        );
    }
    return (
        <Layout>
            <Header />
            <Center>
                <ColumnsWrapper>
                    <Box>
                        {!cartProducts?.length &&
                            <div>Your cart is empty</div>
                        }
                        {
                            !!cartProducts?.length > 0 && (
                                <>
                                    <h1>Cart</h1>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>product</th>
                                                <th>quantity</th>
                                                <th>price</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {products.map((product) => (
                                                <tr key={product._id}>
                                                    <ProductInfoCell>
                                                        <ProductImageBox>
                                                            <img src={product.images[0]} alt="" />
                                                        </ProductImageBox>


                                                        {product.title}

                                                        :
                                                    </ProductInfoCell>
                                                    <td>
                                                        <Button onClick={() => { removeProduct(product._id) }} >-</Button>
                                                        <QuantityLabel>{cartProducts.filter(id => id === product._id).length}</QuantityLabel>
                                                        <Button onClick={() => { addProduct(product._id) }} >+</Button>
                                                    </td>
                                                    <td>
                                                        $ {(cartProducts.filter(id => id === product._id).length) * product.price}
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td>$ {total}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </>
                            )
                        }
                    </Box>
                    {!!cartProducts?.length > 0 && (
                        <Box>
                            <h2>Your Order Information</h2>
                            {/* <form  method="post" action="/api/checkout"> */}
                            <Input type="text" name="name" onChange={(e) => setName(e.target.value)} value={name} placeholder="Name" />
                            <Input type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
                            <CityHolder>
                                <Input type="text" name="city" onChange={(e) => setCity(e.target.value)} value={city} placeholder="City" />
                                <Input type="text" name="postalCode" onChange={(e) => setPostalCode(e.target.value)} value={postalCode} placeholder="Postal Code" />
                            </CityHolder>

                            <Input type="text" name="streetAddress" onChange={(e) => setStreetAddress(e.target.value)} value={streetAddress} placeholder="Address" />
                            <Input type="text" name="country" onChange={(e) => setCountry(e.target.value)} value={country} placeholder="Country" />

                            <input type="hidden" name='products' value={cartProducts.join(',')} />
                            <Button black block size={'l'} onClick={goToPayment}>Click to pay</Button>
                            {/* </form> */}

                        </Box>
                    )}


                </ColumnsWrapper>
            </Center>


        </Layout>
    )
}

export default CartPage

