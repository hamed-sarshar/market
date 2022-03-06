import Dexie from "dexie";

export const db = new Dexie('buffet');

db.version(1).stores({
    listCardShops: '++id, imgSrc, name, title, price, dateBuy',
    archiveListCardShops: '++id, totalAmount, archiveDate, count, archiveList',
});