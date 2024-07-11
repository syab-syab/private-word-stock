import React, { useState } from 'react'
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import DownloadIcon from '@mui/icons-material/Download';
import { CSVLink } from "react-csv";
import WordItem from './WordItem';
import { db } from '../models/db';
import { useLiveQuery } from 'dexie-react-hooks';
import AddIcon from '@mui/icons-material/Add';
import AddCategory from './modal/AddCategory';
import { Add } from '@mui/icons-material';


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
  width: 60%;
  @media (max-width: 700px) {
    width: 100%;

    margin-bottom: 2rem;
  }
`

const IconWrapper = styled.div`
  font-size: 4rem;
  display: flex;
  justify-content: space-around;
  margin: 1rem 0;
`

const EmptyMessage = styled.h1`
  font-size: 7rem;
  font-weight: 200;
  @media (max-width: 700px) {
    font-size: 3rem;
  }
`

const MainContents = () => {
  const csvData = [
    ["おはようございます"],
    ["こんにちは"],
    ["こんばんは"],
    ["おやすみなさい"],
    ["ごきげんよう"]
  ];


  const [selectedCategory, setSelectedCategory] = useState<string>("1")
  const [showModal, setShowModal] = useState<boolean>(false)

  const toggleSelectedCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value)
    console.log(selectedCategory)
  }

  const toggleShowModal = (): void => {
    setShowModal(!showModal)
  }

  const allCategories = useLiveQuery(() => db.categories.toArray());

  const deleteCategory = (): void => {
    // 紐づいているワードごと削除する
    const tmp = window.confirm("このカテゴリを削除しますか？")
    if (tmp) {
      // db.deleteCategory(Number(selectedCategory))
      alert("削除しました")
    }
  }

  const selectedWords = useLiveQuery(
    () => db.words.where({ categoryId: Number(selectedCategory) }).toArray(),
    [Number(selectedCategory)]
  );

  // 本番でデータベースが空の時(カテゴリが全削除されている状態)
  const hasAnyCategory = useLiveQuery(async () => {
    const categoryCount = await db.categories.count();
    return categoryCount > 0;
  });

  return hasAnyCategory ? (
    <Wrapper>
      <SelectCategoryWrapper>
        <SelectCategory onChange={toggleSelectedCategory}>
          {/* <option value="0" key={0}>セレクトしてください</option> */}
          {
            allCategories?.map(c => {
              return (
                <option value={c.id} key={c.id}>{c.name}</option>
              )
            })
          }
        </SelectCategory>
      </SelectCategoryWrapper>
      <IconWrapper>
        <Tooltip title={<h1>CSV Download</h1>} arrow>
          <span>
            <CSVLink data={csvData} filename={`my-private-words.csv`}>
              <DownloadIcon fontSize='large' />
            </CSVLink>
          </span>
        </Tooltip>
        <Tooltip title={<h1>Category Delete</h1>} arrow>
          <span onClick={deleteCategory}>
            <DeleteIcon fontSize='large' />
          </span>
        </Tooltip>
        <Tooltip title={<h1>Add Category </h1>} arrow>
          <span onClick={toggleShowModal}>
            <AddIcon fontSize='large' />
          </span>
        </Tooltip>
      </IconWrapper>
      <AllItemsWrapper>
        {
          selectedWords?.map((word) => {
            return (
              <WordItem itemIndex={word.id} itemWord={word.content} />
            )
          })
        }
    </AllItemsWrapper>
    <AddCategory show={showModal} func={toggleShowModal} />
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

export default MainContents