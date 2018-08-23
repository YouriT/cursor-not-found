import { Schema, Connection } from "mongoose";

const itemSchema = new Schema(
  {
    schemaName: { type: String, required: [true, "schemaName is required"] },
    contents: Schema.Types.Mixed,
    source: Schema.Types.ObjectId,
    hash: String,
    insertedAt: Date,
    unscreenTask: Schema.Types.Mixed,
    screened: {
      date: Date,
      usedFor: [String],
      fellows: [String],
      useful: Boolean,
      useless: Boolean,
      silent: Boolean,
      idEntity: Schema.Types.ObjectId
    }
  },
  { strict: true }
);

itemSchema.index(
  { hash: 1 },
  {
    background: true,
    unique: true
  }
);

itemSchema.index(
  { "unscreenTask.scheduledAt": 1 },
  {
    background: true,
    partialFilterExpression: {
      "unscreenTask.scheduledAt": { $exists: true }
    }
  }
);

itemSchema.index(
  {
    "contents.iid": 1,
    schemaName: 1,
    "contents.date": 1
  },
  {
    background: true,
    partialFilterExpression: {
      "contents.iid": { $exists: true },
      "contents.date": { $exists: true },
      schemaName: { $exists: true }
    }
  }
);

itemSchema.index(
  {
    "contents.iid": 1,
    schemaName: 1,
    "contents.exDate": 1
  },
  {
    background: true,
    partialFilterExpression: {
      "contents.iid": { $exists: true },
      "contents.exDate": { $exists: true },
      schemaName: { $exists: true }
    }
  }
);

itemSchema.index(
  {
    "contents.iid": 1,
    schemaName: 1
  },
  {
    background: true,
    partialFilterExpression: {
      "contents.iid": { $exists: true },
      "contents.date": null,
      "contents.exDate": null,
      schemaName: { $exists: true }
    }
  }
);

itemSchema.index(
  {
    "contents.iid": 1,
    "screened.date": 1
  },
  {
    background: true,
    partialFilterExpression: {
      "contents.iid": { $exists: true }
    }
  }
);

itemSchema.index(
  {
    "screened.useless": 1
  },
  {
    background: true,
    partialFilterExpression: {
      "screened.useless": { $exists: true }
    }
  }
);

itemSchema.index(
  {
    "screened.idEntity": 1
  },
  {
    background: true,
    partialFilterExpression: {
      "screened.idEntity": { $exists: true }
    }
  }
);

itemSchema.index(
  {
    schemaName: 1,
    "contents.iid": 1,
    "contents.newIid": 1,
    "contents.exDate": 1
  },
  {
    background: true,
    partialFilterExpression: {
      schemaName: "E_identificationChange_V1",
      "contents.iid": {
        $exists: true
      },
      "contents.newIid": {
        $exists: true
      },
      "contents.exDate": {
        $exists: true
      }
    }
  }
);

export function buildItem(connection: Connection) {
    return connection.model("Item", itemSchema);
}