import { CartContext } from '@/components/CartContext'
import Header from '@/components/Header'
import React, { useContext } from 'react'

const CartPage = () => {
    const {cartProducts}=useContext(CartContext);

    return (
        <>
            <Header />
            
        </>
    )
}

export default CartPage