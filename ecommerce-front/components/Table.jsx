import React from 'react'
import styled from 'styled-components'

const Styledtable = styled.table`
    width: 100%;
    th{
        text-align: left;
        text-transform: uppercase;
        color: #ccc;
        font-weight: 600;
        font-size: .7rem;
      }
      td{
        border-top: 1px solid rgba(0,0,0,.1);
      }
      tr{
        width: 100%;
      }
`


const Table = (props) => {
  return (
    <Styledtable {...props}/>
  )
}

export default Table