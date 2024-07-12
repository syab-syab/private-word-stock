import Dexie, { Table } from 'dexie';
import { populate } from './populate';
import { Word } from './Word';
import { Category } from './Category';

export class WordStock extends Dexie {
  categories!: Table<Category>
  words!: Table<Word>;

  constructor() {
    super('WordStock');
    this.version(1).stores({
      categories: '++id',
      words: '++id, categoryId'
    });
  }

  // 本番時はdeleteCategoryに改名した方が良いかも
  deleteCategory(categoryId: number | undefined) {
    return this.transaction('rw', this.words, this.categories, () => {
      this.words.where({ categoryId }).delete();
      this.categories.delete( categoryId );
    });
  }
}

export const db = new WordStock();

// デフォルトで入れるデータ
db.on('populate', populate);


// 本番で入れるかどうか迷う
export function resetData() {
  return db.transaction('rw', db.categories, db.words, async () => {
    await Promise.all(db.tables.map(table => table.clear()))
    console.log("reset1")
    await populate()
    console.log("reset2")
  });
}