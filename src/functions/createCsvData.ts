import { Word } from "../models/Word"

const createCsvData = (arr: Array<Word> | undefined) => {
  let tmp: string[][] = []
  if (arr) {
    arr.forEach(w => {
      tmp.push([w.content])
    })
    return tmp
  } else {
    return [["登録されていません"]]
  }
}

export default createCsvData