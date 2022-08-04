import { afterAll } from "vitest";
import { setup, teardown } from "vitest-mongodb";

setup();

afterAll(async () => {
  await teardown();
});

