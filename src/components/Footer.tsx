import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.footer`
  background-color: transparent;
`

const CopyRight = styled.span`
  color: grey;
`

const Footer = () => {
  return (
    <Wrapper>
      <CopyRight>©Private Word Stock</CopyRight>
    </Wrapper>
  )
}

export default Footer