import { connect, model, Schema, createConnection, Model } from "mongoose";
import { buildItem } from "./item";

(async () => {
  const connection = await createConnection(process.env.DB_URI, {
    keepAlive: 30000,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 120000,
    autoReconnect: false
  });

  const ItemModel = buildItem(connection);
  await ItemModel.remove({});
  await generateRecords(ItemModel);

  console.log("start");
  const cursor = await ItemModel.find({})
    .batchSize(2)
    .cursor();
  let doc: any;
  try {
    while ((doc = await cursor.next()) != null) {
      await new Promise(resolve => {
        setTimeout(() => resolve(), 1000);
      });
      console.log(doc);
    }
  } catch (e) {
    console.error(e);
    process.exit();
  }
  console.log("finished");
  process.exit();
})();

async function generateRecords(model: any) {
  const records = new Array(5).fill(1).map((d, i) => {
    return {
      schemaName: "test",
      contents: {
        id: "test"
      },
      hash: i
    };
  });
  await model.create(records);
}
