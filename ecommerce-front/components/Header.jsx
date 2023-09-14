import Link from 'next/link'
import React, { useContext } from 'react'
import styled from 'styled-components'
import Center from './Center';
import { CartContext } from './CartContext';


const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  color:#fff;
  text-decoration:none;
  position: relative;
  z-index: 3;
`;

const Wrapper = styled.div`
  display :flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const NavLink = styled(Link)`
  display: block;
  color:#aaa;
  text-decoration:none;
`;


const StyledNav= styled.nav`
  display : flex;
  gap: 15px;
`; 

const Header = () => {
  const {cartProducts} = useContext(CartContext);
  console.log(cartProducts);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}>Ecommerce</Logo>
          <StyledNav>
            <NavLink href={'/'} >Home</NavLink>
            <NavLink href={'/products'}>All Products</NavLink>
            <NavLink href={'/categories'}>Categories</NavLink>
            <NavLink href={'/account'}>Accounts</NavLink>
            <NavLink href={'/cart'}>Cart ( {cartProducts?.length} )</NavLink>
          </StyledNav>
        </Wrapper>


      </Center>
    </StyledHeader>
  )
}

export default Header