import React from 'react'
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import { db } from '../models/db';


const Wrapper = styled.div`
  vertical-align: middle;
  display: block;
  width: 100%;

  @media (max-width: 700px) {
    width: 100%;
  }
`

const Item = styled.div`
  background-color: #D9D9D9;
  display: flex;
  border: 0.3rem black solid;
  border-radius: 0.4rem;

  @media (max-width: 700px) {
    width: auto;
    font-size: 3rem;
    margin-bottom: 2rem;
  }
  margin: 1rem;
  font-size: 3rem;
`

const WordItemDelBtn = styled.div`
  flex-grow: 1;
  border-right: 0.3rem black solid;
`

// widthを指定しないとoverflow: hidden;が効かない
const WordItemSpace = styled.div`
  width: 0;
  height: 4rem;
  overflow: hidden;
  flex-grow: 7;
  font-size: 2rem;
  @media (max-width: 700px) {
    height: auto;
  }
`

const WordItemCopyBtn = styled.div`
  flex-grow: 1;
  border-left: 0.3rem black solid;
`


type Props = {
  itemIndex: number | undefined,
  itemWord: string
}

const WordItem = (props: Props) => {

  const deleteItem = (id: number | undefined): void => {
    const tmp = window.confirm("このワードを削除しますか？")
    if (tmp) {
      db.words.delete(id)
      alert("削除しました。")
    }
  }

  const copyItem = (word: string): void => {
    navigator.clipboard.writeText(word)
    alert(`${word}をコピーしました`)
  }

  return (
    <Wrapper key={props.itemIndex}>
      <Item>
        <Tooltip title={<h1>Delete</h1>} arrow>
          <WordItemDelBtn onClick={() => deleteItem(props.itemIndex)}>
            <DeleteIcon fontSize='large' />
          </WordItemDelBtn>                
        </Tooltip>
        <Tooltip title={<h1>{props.itemWord}</h1>} arrow>
          <WordItemSpace>{props.itemWord}</WordItemSpace>
        </Tooltip>
        <Tooltip title={<h1>Copy</h1>} arrow>
          <WordItemCopyBtn onClick={() => copyItem(props.itemWord)}>
            <ContentCopyIcon fontSize='large' />
          </WordItemCopyBtn>
        </Tooltip>
      </Item>
    </Wrapper>
  )
}

export default WordItem