import { Category } from "../models/Category"

const firstCategoryId = (arr: Array<Category> | undefined) => {
  let idArr: Array<any> | undefined = []
  if (arr !== undefined) {
        arr?.forEach(a => {
    idArr?.push(a.id)
  })
  }
  return idArr
}


export default firstCategoryId