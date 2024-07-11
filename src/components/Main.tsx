import React, { useState} from 'react'
import styled from 'styled-components'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import MainContents from './MainContents';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AddWord from './modal/AddWord';
import { Tooltip } from '@mui/material';


//   height: 100vw;にするか否か
// const Wrapper = styled.main`

// `

// Contents内にあるWordItemはスクロールさせる
// PC画面で2列並びにするためにdisplay: flex;
const Contents = styled.div`

  @media (max-width: 700px) {
    height: 100vh;
    overflow: scroll;
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


const Main = () => {

  // const categoryItem: Array<string> = [
  //   "あいさつ",
  //   "ネットスラング",
  //   "世界のくたばりやがれ"
  // ]

  const [showModal, setShowModal] = useState<boolean>(false)

  const toggleShowModal = (): void => {
    setShowModal(!showModal)
  }

  const reset = (): void => {

    if (window.confirm("初期化しますか？")) {
      alert("初期化しました。")
    }
  }

  return (
    <main>
      <Contents>

        <MainContents />

        <ResetBtnWrapper>
          <Tooltip title={<h1>Reset</h1>} arrow>
            <Fab onClick={() => reset()} color="secondary">
              <RestartAltIcon  fontSize='large' />
            </Fab>
          </Tooltip>
        </ResetBtnWrapper>
        <BtnWrapper>
          <Tooltip title={<h1>Add Word</h1>} arrow>
            <Fab onClick={() => toggleShowModal()} color="primary" aria-label="add">
              <AddIcon  fontSize='large' />
            </Fab>
          </Tooltip>
        </BtnWrapper>
      </Contents>

      <AddWord show={showModal} func={toggleShowModal} />
    </main>
  )
}

export default Main