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
import AddWord from './modal/AddWord';
import Fab from '@mui/material/Fab';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { resetData } from '../models/db';
import { Category } from '../models/Category';
import { localSetItem, localGetItem } from '../functions/localStorageFunc';
import firstCategoryId from '../functions/firstCategoryId';
import { Word } from '../models/Word';
import createCsvData from '../functions/createCsvData';



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

const BtnWrapper = styled.div`
  position: fixed;
  bottom: 5rem;
  right: 3rem;
  @media (max-width: 700px) {
    bottom: 3rem;
    right: 3rem;
  }
`

const ResetBtnWrapper = styled.div`
  position: fixed;
  bottom: 13rem;
  right: 3rem;
  @media (max-width: 700px) {
    bottom: 10rem;
    right: 3rem;
  }
`

const MainContents = () => {

  const [showAddWord, setShowAddWord] = useState<boolean>(false)
  const [showAddCategory, setShowAddCategory] = useState<boolean>(false)


  const toggleShowAddWord = (): void => {
   setShowAddWord(!showAddWord) 
  }

  const toggleShowAddCategory = (): void => {
    setShowAddCategory(!showAddCategory)
  }

  const allCategories: Array<Category> | undefined = useLiveQuery(() => db.categories.toArray());

  // カテゴリIDの状態管理が一番の問題児
  const localSelectedCategory: string = "localSelectedCategory"
  
  const localSelectedCVal: string | any = localGetItem(localSelectedCategory)

  const [selectedCategory, setSelectedCategory] = useState<string>(
    !!localSelectedCVal === false ? "1" : localSelectedCVal
  )


  const toggleSelectedCategory = (val: string) => {
    setSelectedCategory(val)
    localSetItem(localSelectedCategory, val)
  }

  // 本番でデータベースが空の時(カテゴリが全削除されている状態)
  const hasAnyCategory = useLiveQuery(async () => {
    const categoryCount = await db.categories.count();
    return categoryCount > 0;
  });


  const deleteCategory = (): void => {
    // 紐づいているワードごと削除する
    const tmp = window.confirm("このカテゴリを削除しますか？")
    if (tmp) {
      db.deleteCategory(Number(selectedCategory))
      alert("削除しました")
      hasAnyCategory ? toggleSelectedCategory(String(firstCategoryId(allCategories)[0])) : toggleSelectedCategory("1")
    }
  }

  const selectedWords: Array<Word> | undefined = useLiveQuery(() => 
    db.words.where({ categoryId: Number(selectedCategory) }).toArray(),[selectedCategory]
  );


  const reset = () => {

    if (window.confirm("初期化しますか？")) {
      resetData()
      alert("初期化しました。")
      // const tmp = String(firstCategoryId(allCategories)[0])
      // toggleSelectedCategory(tmp)
      toggleSelectedCategory("0")
    }
  }

  return hasAnyCategory ? (
    <Wrapper>
      <SelectCategoryWrapper>
        <label>カテゴリ</label>
        <Tooltip title={<h1>Add Category </h1>} arrow>
          <span onClick={toggleShowAddCategory}>
            <AddIcon fontSize='large' color="primary" />
          </span>
        </Tooltip>
        <br />
        <SelectCategory onChange={(e) => toggleSelectedCategory(e.target.value)} value={selectedCategory}>
          <option value="0">カテゴリ選択</option>
          {
            allCategories?.map(c => {
              return (
                <option value={c.id} key={c.id} onClick={() => console.log("テスト")}>{c.name}</option>
              )
            })
          }
        </SelectCategory>
      </SelectCategoryWrapper>
      <IconWrapper>
        {
          selectedCategory !== "0" && 
          <>
          <Tooltip title={<h1>CSV Download</h1>} arrow>
            <span>
              <CSVLink data={createCsvData(selectedWords)} filename={`my-private-words.csv`}>
                <DownloadIcon fontSize='large' />
              </CSVLink>
            </span>
          </Tooltip>
            <Tooltip title={<h1>Category Delete</h1>} arrow>
              <span onClick={deleteCategory}>
                <DeleteIcon fontSize='large' />
              </span>
            </Tooltip>
          </>
        }
      </IconWrapper>
      <AllItemsWrapper>
        {
          selectedWords?.map((word) => {
            return (
              <WordItem key={word.id} itemIndex={word.id} itemWord={word.content} />
            )
          })
        }
    </AllItemsWrapper>
    <ResetBtnWrapper>
      <Tooltip title={<h1>Reset</h1>} arrow>
        <Fab onClick={() => reset()} color="secondary">
          <RestartAltIcon  fontSize='large' />
        </Fab>
      </Tooltip>
    </ResetBtnWrapper>
    <BtnWrapper>
      <Tooltip title={<h1>Add Word</h1>} arrow>
        <Fab onClick={() => toggleShowAddWord()} color="primary" aria-label="add">
          <AddIcon  fontSize='large' />
        </Fab>
      </Tooltip>
    </BtnWrapper>
    <AddCategory show={showAddCategory} func={toggleShowAddCategory} />
    <AddWord show={showAddWord} func={toggleShowAddWord} allCategories={allCategories} setState={setSelectedCategory} />
    </Wrapper>
  ) : (
    <Wrapper>
      <EmptyMessage>
        現在
        <br />
        登録されているワードは
        <br />
        ありません。
      </EmptyMessage>
      <div>
        <h1 onClick={toggleShowAddCategory}>カテゴリ追加</h1>
      </div>
      <ResetBtnWrapper>
        <Tooltip title={<h1>Reset</h1>} arrow>
          <Fab onClick={() => reset()} color="secondary">
            <RestartAltIcon  fontSize='large' />
          </Fab>
        </Tooltip>
      </ResetBtnWrapper>
      <BtnWrapper>
      <Tooltip title={<h1>Add Word</h1>} arrow>
        <Fab onClick={() => toggleShowAddWord()} color="primary" aria-label="add">
          <AddIcon  fontSize='large' />
        </Fab>
      </Tooltip>
    </BtnWrapper>
    <AddCategory show={showAddCategory} func={toggleShowAddCategory} />
    </Wrapper>
  )
}

export default MainContents