import { db } from "./db";

// デフォルトで入れるデータ
export async function populate() {

  const categoryId = await db.categories.add({
    name: "あいさつ"
  });

  await db.words.bulkAdd([
    {
      categoryId,
      content: "おはようございます"
    },
    {
      categoryId,
      content: "こんにちは"
    },
    {
      categoryId,
      content: "ごきげんよう"
    },
    {
      categoryId,
      content: "さようなら"
    },
    {
      categoryId,
      content: "こんばんは"
    },
    {
      categoryId,
      content: "おやすみなさい"
    },
    {
      categoryId,
      content: "はじめまして"
    },
    {
      categoryId,
      content: "よろしくお願いします"
    },
    {
      categoryId,
      content: "失礼します"
    }
  ]);
}