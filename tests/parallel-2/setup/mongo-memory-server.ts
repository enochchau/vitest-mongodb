import { afterAll, beforeAll } from "vitest";
import { setup, teardown } from "vitest-mongodb";

beforeAll(async () => {
  await setup();
});

afterAll(async () => {
  await teardown();
});
