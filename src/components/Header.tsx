import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.header`
  background: #003C8D;
  color: white;
`

const TitleWrapper = styled.div`
  & {
    padding: 2rem 0 2rem;
    width: 30%;
    padding: 0.5em;
    background-color: #f8d05d;
    margin: 0 auto;
    position: relative;
    @media (max-width: 700px) {
      width: 50%;
    }
  }
  &:after {
    position: absolute;
    content: '';
    border-top: 20px solid #f8d05d;
    border-right: 20px solid transparent;
    border-left: 20px solid transparent;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }

`

const ImageWrapper = styled.a`
  text-decoration: inherit;
`

const Image = styled.img`
  & {
    width: 7rem;
    height: 7rem;
  }
  &:hover {
    border: 1px solid grey;
  }

`

const Title = styled.h1`
  margin: 1rem 0 0;
  font-size: 3rem;
  letter-spacing: 1.2rem;
  font-weight: 500;
  @media (max-width: 700px) {
    letter-spacing: 0.3rem;
  }
`

const Header = () => {
  return (
    <Wrapper>
      <TitleWrapper>
        <ImageWrapper href='https://homemade-apps.vercel.app/' target='_blank'>
          {/* <Image src="./images/ps-favicon.png" alt="" /> */}
          <Image src="./images/200.png" alt="" />
        </ImageWrapper>
        <Title>
          Private Word Stock
        </Title>
      </TitleWrapper>
    </Wrapper>
  )
}

export default Header