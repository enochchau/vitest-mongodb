import { MongoMemoryReplSet, MongoMemoryServer } from "mongodb-memory-server";

type Options =
  | {
      type?: "default";
      serverOptions: NonNullable<
        Parameters<typeof MongoMemoryServer["create"]>[0]
      >;
    }
  | {
      type: "replSet";
      serverOptions: NonNullable<
        Parameters<typeof MongoMemoryReplSet["create"]>[0]
      >;
    };

export async function setup({ type, serverOptions }: Options) {
  if (!globalThis.__VITEST_MONGODB_DEFINED__) {
    if (type !== "replSet") {
      globalThis.__MONGO_DB__ = await MongoMemoryServer.create(serverOptions);
      globalThis.__MONGO_URI__ = globalThis.__MONGO_DB__.getUri();
    } else {
      globalThis.__MONGO_DB__ = await MongoMemoryReplSet.create(serverOptions);
      globalThis.__MONGO_URI__ = globalThis.__MONGO_DB__.getUri();
    }

    globalThis.__VITEST_MONGODB_DEFINED__ = true;
  }
}

export async function teardown() {
  await globalThis.__MONGO_DB__.stop();
}
