# vitest-mongodb

Run your tests with Vitest and MongoDB Memory server.

## Comparison to [jest-mongodb](https://github.com/shelfio/jest-mongodb)

These two packages are fairly similar with slightly different configuration.

### jest-mongodb Options

The follow is how to get the desired effect as jest-mongodb options.

- `useSharedDBForAllJestWorkers`: Run vitest with option `--no-threads` so that the [setup file](https://vitest.dev/config/#setupfiles) is only called once.
- `mongoURLEnvName`: No plans to implement.
