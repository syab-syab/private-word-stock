import React from 'react'
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import DownloadIcon from '@mui/icons-material/Download';
import { CSVLink } from "react-csv";
import WordItem from './WordItem';


// pc画面で2列にするためにflex-grow: 1; display: flex; flex-wrap: wrap;
// モバイル表示ではblockのが良いかも
const Wrapper = styled.div`

  margin: 10% 5% 30%;
`

const AllItemsWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  @media (max-width: 700px) {
    display: flex;
    flex-wrap: wrap;
  }
`


const SelectCategoryWrapper = styled.div`
  font-size: 3rem;
`

const SelectCategory = styled.select`
  background-color: #D9D9D9;
  font-size: 3rem;
  @media (max-width: 700px) {
    width: 100%;

    margin-bottom: 2rem;
  }
`

const CategoryName = styled.h1`
  font-size: 4rem;
`

const EmptyMessage = styled.h1`
  font-size: 7rem;
  font-weight: 200;
  @media (max-width: 700px) {
    font-size: 3rem;
  }
`

const WordItemWrapper = () => {
  const csvData = [
    // 一番上がカテゴリ名
    ["カテゴリ: あいさつ"],
    ["おはようございます"],
    ["こんにちは"],
    ["こんばんは"],
    ["おやすみなさい"],
    ["ごきげんよう"]
  ];

  type Category = {
    id: number,
    name: string
  }

  const cCategory: Array<Category> = [
    {
      id: 1,
      name: "あいさつ"
    },
    {
      id: 2,
      name: "ネットスラング"
    },
    {
      id: 3,
      name: "世界のくたばりやがれ"
    }
  ]

  const fileName: string = "あいさつ"

  const deleteCategory = (): void => {
    // 紐づいているワードごと削除する
    const tmp = window.confirm("このカテゴリを削除しますか？")
    if (tmp) {
      alert("削除しました")
    }
  }

  type Word = {
    id: number,
    text: string
  }

  const cWord: Array<Word> = [
    {
      id: 1,
      text: "text"
    },
    {
      id: 2,
      text: "text"
    },
    {
      id: 3,
      text: "texttexttexttexttexttexttexttexttexttexttext"
    },
    {
      id: 4,
      text: "cc"
    },
    {
      id: 5,
      text: "testtsest"
    },
    {
      id: 6,
      text: "text"
    },
    {
      id: 7,
      text: "text"
    },
    {
      id: 8,
      text: "texttexttexttexttexttexttexttexttexttexttext"
    },
    {
      id: 9,
      text: "cc"
    },
    {
      id: 10,
      text: "testtsest"
    }
  ]

  // 本番でデータベースが空の時(カテゴリが全削除されている状態)
  const isCWord: boolean = true
  // const isCWord: boolean = false

  return isCWord ? (
    <Wrapper>
      <SelectCategoryWrapper>
        <SelectCategory>
          {
            cCategory.map(c => {
              return (
                <option value={c.name} key={c.id}>{c.name}</option>
              )
            })
          }
        </SelectCategory>
      </SelectCategoryWrapper>
      <CategoryName>
        <Tooltip title={<h1>CSV download</h1>} arrow>
          <span>
            <CSVLink data={csvData} filename={`my-private-${fileName}.csv`}>
              <DownloadIcon fontSize='large' />
            </CSVLink>
          </span>
        </Tooltip>
        カテゴリ名
        <Tooltip title={<h1>Category delete</h1>} arrow>
          <span onClick={deleteCategory}>
            <DeleteIcon fontSize='large' />
          </span>
        </Tooltip>
      </CategoryName>
      <AllItemsWrapper>
        {
          cWord.map((word) => {
            return (
              <WordItem itemIndex={word.id} itemWord={word.text} />
            )
          })
        }
    </AllItemsWrapper>
    </Wrapper>
  ) : (
    <Wrapper>
      <EmptyMessage>
        現在
        <br />
        登録されているワードは
        <br />
        ありません
      </EmptyMessage>
    </Wrapper>
  )
}

export default WordItemWrapper