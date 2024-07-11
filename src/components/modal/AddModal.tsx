import React, {useState} from 'react'
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

const SubHeading = styled.h2`
  font-size: 3rem;
  margin-bottom: 0;
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

const MiniMessage = styled.span`
  color: red;
  font-weight: bold;
`

const TextArea = styled.textarea`
  appearance: auto;
  background-color: #D9D9D9;
  width: 100%;
  font-size: 2rem;
  resize: none;
  border: 0.2rem solid black;
`

// ラジオボタンはnameに同じ文字列を指定する
const InputRadio = styled.input`
  appearance: auto;
  background-color: #D9D9D9;
`

const Select = styled.select`
  font-size: 3rem;
  background-color: #D9D9D9;
  width: 100%;
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
}

const AddModal = (props: Props) => {
  const [word, setWord] = useState<string>("")
  const [selectedRadio, setSelectedRadio] = useState<string>("existing")
  const [existingCategoryName, setExistingCategoryName] = useState<string>("")
  const [newCategoryName, setNewCategoryName] = useState<string>("")

  const handleWordChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setWord(e.target.value)
  }

  const handleRadioChange = (val: string): void => {
    setSelectedRadio(val);
  }

  const handleExistingCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setExistingCategoryName(e.target.value)
  }

  const handleNewCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewCategoryName(e.target.value)
  }


  // 入力された文に改行があったら複数のワードを一気に登録できる
  const subscribeNewWord = (): void => {
    // 実際はindexedDBに格納する際に文字数を確認する
    // 改行が無いものもあるものも配列にする
    // 作成された配列を回して格納していく
    // ただし、配列の要素に一文字以下のモノがあればやり直し
    const tmp: Array<string> = word.includes("\n") ? word.split("\n") : [word]
    const check: boolean = tmp.some(t => t.length <= 1)
    if (check) {
      alert('一文字以上でお願いします。')
    } else {
      console.log(tmp)
      if (selectedRadio==="existing") {
        console.log(existingCategoryName)
      } else if (selectedRadio==="new") {
        console.log(newCategoryName)
        setNewCategoryName("")
      } else {
        alert("エラー")
      }
    }
    setWord("")
    setSelectedRadio("existing")
    props.func()
  }

  if (props.show) {
    return (
      <Wrapper>
        <Modal>
          <Heading>新規追加</Heading>
          <InputWrapper>
            <Label htmlFor='text'>
                ワード              
            </Label>
            <br />
            <MiniMessage>*改行で複数個登録できます。</MiniMessage>
            <br />
            <MiniMessage>*一文字以上でお願いします。</MiniMessage>
            <br />
            <TextArea onChange={handleWordChange} value={word} id="text" />
          </InputWrapper>
          <InputWrapper>
            <SubHeading>カテゴリ</SubHeading>
            <InputRadio
              checked={selectedRadio === "existing"}
              type="radio"
              name="category"
              value="existing"
              id="existing"
              onChange={() => handleRadioChange("existing")}
              />
            <Label>既存</Label>
            <br />
            <Select disabled={selectedRadio !== "existing"} onChange={handleExistingCategoryChange}>
              <option value="test">test</option>
              <option value="test2">test2</option>
            </Select>
            <br />
            <InputRadio
              checked={selectedRadio === "new"}
              type="radio"
              name="category"
              value="new"
              id="new"
              onChange={() => handleRadioChange("new")}
            />
            <Label>新規</Label>
            <br />
            <InputText
              disabled={selectedRadio !== "new"}
              type="text" value={newCategoryName}
              onChange={handleNewCategoryNameChange}
            />
          </InputWrapper>
          <BtnWrapper>
            <SubscribeBtn onClick={subscribeNewWord}>
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

export default AddModal