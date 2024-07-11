import React from 'react'
import styled from 'styled-components'
import MainContents from './MainContents';



//   height: 100vw;にするか否か
// const Wrapper = styled.main`

// Contents内にあるWordItemはスクロールさせる
// PC画面で2列並びにするためにdisplay: flex;
const Contents = styled.div`

  @media (max-width: 700px) {
    height: 100vh;
    overflow: scroll;
  }
`


const Main = () => {

  return (
    <main>
      <Contents>
        <MainContents />
      </Contents>
    </main>
  )
}

export default Main