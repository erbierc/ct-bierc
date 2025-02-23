import Dexie, { type EntityTable } from 'dexie';

interface AdType {
  id: number;
  name: string;
  content: string;
  startDate: Date;
  endDate: Date;
}

const db = new Dexie('AdsDatabase') as Dexie & {
  ads: EntityTable<
  AdType,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  ads: '++id, &name, content, startDate, endDate' // primary key "id" (for the runtime!)
});

export type { AdType };
export { db };
