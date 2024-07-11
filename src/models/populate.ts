import { db } from "./db";

// デフォルトで入れるデータ
export async function populate() {

  const categoryId = await db.categories.add({
    name: "定型文"
  });

  await db.words.bulkAdd([
    {
      categoryId,
      content: "お世話になっております。"
    },
    {
      categoryId,
      content: "大変恐縮ですが、"
    },
    {
      categoryId,
      content: "ますますのご健康とご活躍をお祈りしております。"
    },
    {
      categoryId,
      content: "今後とも変わらぬお引き立てを賜りますようお願い申し上げます。"
    },
    {
      categoryId,
      content: "誠に残念ではございますが、"
    },
    {
      categoryId,
      content: "大変申し訳ございませんが、"
    },
    {
      categoryId,
      content: "これからのご活躍を心よりお祈り申し上げます。"
    },
    {
      categoryId,
      content: "私事ではありますが、"
    },
    {
      categoryId,
      content: "ご指導ご鞭撻のほど、"
    },
    {
      categoryId,
      content: "今後ともよろしくお願いいたします。"
    }
  ]);
}