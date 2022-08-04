declare var __MONGO_URI__: string | undefined;
declare var __MONGO_DB__:
  | import("mongodb-memory-server").MongoMemoryReplSet
  | import("mongodb-memory-server").MongoMemoryServer
  | undefined;
