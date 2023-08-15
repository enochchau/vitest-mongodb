# vitest-mongodb

Run your tests with Vitest and MongoDB Memory server.

## Installation

```
yarn add -D vitest-mongodb
npm i -D vitest-mongodb
pnpm i -D vitest-mongodb
```

## Usage

An example project can be found at [`/example`](/example).

1. Create a setup file.

```typescript
// ./setup/mongo-memory-server.ts
import { afterAll, beforeAll } from "vitest";
import { setup, teardown } from "vitest-mongodb";

beforeAll(async () => {
  await setup();
});

afterAll(async () => {
  await teardown();
});
```

2. Include that setup file in your Vitest config.

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./setup/mongo-memory-server.ts"],
  },
});
```

3. Connect to the server in tests using the `globalThis.__MONGO_URI__` global variable.

```typescript
import { MongoClient } from "mongodb";
import { it, expect } from "vitest";
it("connects to mongodb", () => {
  expect(async () => {
    const client = new MongoClient(globalThis.__MONGO_URI__);
    try {
      const db = client.db("test");
      await db.command({ ping: 1 });
    } finally {
      await client.close();
    }
  }).not.toThrow();
});
```

### Configuration

The setup function provides some configuration options.

- [MongoMemoryServer](https://github.com/nodkz/mongodb-memory-server#available-options-for-mongomemoryserver)
- [MongoMemoryReplSet](https://github.com/nodkz/mongodb-memory-server#available-options-for-mongomemoryreplset)

**Setup Options**:

```typescript
type Options =
  | {
      type?: "default";
      serverOptions?: Partial<MongoMemoryServerOpts>;
    }
  | {
      type: "replSet";
      serverOptions?: Partial<MongoMemoryReplSetOpts>;
    };
```

**Example:** create a ReplSet

```typescript
// ./setup/mongo-memory-server.ts
import { afterAll } from "vitest";
import { setup, teardown } from "vitest-mongodb";

beforeAll(async () => {
  await setup({ type: "replSet", serverOptions: { replSet: { count: 4 } } });
});

afterAll(async () => {
  await teardown();
});
```

### TypeScript

To get `__MONGO_URI__` on your `globalThis` object, add the follow file:

```typescript
// test/global.d.ts
declare var __MONGO_URI__: string;
```

## Comparison to [jest-mongodb](https://github.com/shelfio/jest-mongodb)

These two packages are fairly similar with slightly different configuration.

### jest-mongodb Options

The following is how to get the desired effect as jest-mongodb options.

- `useSharedDBForAllJestWorkers`: Run vitest with option `--no-threads` so that the [setup file](https://vitest.dev/config/#setupfiles) is only called once.
- `mongoURLEnvName`: No plans to implement.
