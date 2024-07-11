import React, { useState } from 'react'
import styled from 'styled-components'


const Wrapper = styled.div`
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Modal = styled.div`
  background-color: #D9D9D9;
  color: black;
  z-index:2;
  width:50%;
  padding: 2rem 7rem 4.5rem;
  border: 0.2rem black solid;
  border-radius: 0.8rem;
  @media (max-width: 1000px) {
    width: 70%;
  }
  @media (max-width: 800px) {
    width: 80%;
  }
  @media (max-width: 700px) {
    width: 90%;
  }
  @media (max-width: 500px) {
    width: 95%;
    padding: 3rem 1rem 4rem;
  }
`

const Heading = styled.h1`
  &{
    font-size: 4rem;
    position: relative;
    display: inline-block;
  }
  &:before {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: 2px;
    background-color: black;
  }
  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: black;
  }
`

const InputWrapper = styled.div`
  text-align: left;
  margin-bottom: 1rem;
`

const Label = styled.label`
  font-size: 3rem;
  font-weight: 700;
`

const InputText = styled.input`
  appearance: auto;
  background-color: #D9D9D9;
  width: 100%;
  font-size: 2rem;
  border: 0.2rem solid black;
`

const BtnWrapper = styled.div`
  text-align: center;
`

const SubscribeBtn = styled.div`
  background-color: #003C8D;
  font-size: 3rem;
  color: white;
  margin-bottom: 1rem;
`

const CloseBtn = styled.div`
  background-color: #f8d05d;
  font-size: 3rem;
  color: white;
`

type Props = {
  show: boolean,
  func: () => void
  // カテゴリを追加したらそのカテゴリをすぐに表示できるようにMainContentsからsetSelectedCategoryを渡してもらう
}


const AddCategory = (props: Props) => {
  const [name, setName] = useState<string>("")
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value)
  }
  const subscribeNewCategory = (): void => {
    const tmp = window.confirm("カテゴリを新規追加しますか？")
    if (tmp) {
      alert("追加しました")
      props.func()
    }
  }

  if (props.show) {
    return (
      <Wrapper>
        <Modal>
          <Heading>新規カテゴリ追加</Heading>
          <InputWrapper>
            <Label htmlFor='text'>
              カテゴリ名     
            </Label>
            <br />
            <InputText onChange={handleNameChange} value={name} id="text" />
          </InputWrapper>
          
          <BtnWrapper>
            <SubscribeBtn onClick={subscribeNewCategory}>
              登録
            </SubscribeBtn>
            <CloseBtn onClick={props.func}>
              閉じる
            </CloseBtn>            
          </BtnWrapper>

        </Modal>
      </Wrapper>
    )    
  } else {
    return null;
  }
}

export default AddCategory