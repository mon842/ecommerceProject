import React from 'react'
import styled from 'styled-components'

const Sdiv = styled.div`
    background-color: gray;
    color: white;
    font-size: 0.9rem;
    padding: 0.3rem;
    border-radius: 0.2rem;
    display: flex;
    justify-content: center;
    margin: 0.5rem;
    width: 23%;
`


const Tag = ({children}) => {
  return (
    <Sdiv>#{children}</Sdiv>
  )
}

export default Tag