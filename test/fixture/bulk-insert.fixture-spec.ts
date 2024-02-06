import { DataSource } from 'typeorm';

import { FixtureFactory } from 'test/utils/fixture-factory';
import { Bulk } from 'test/utils/bulk';

describe('Bulk Inserts', () => {
  let dataSource: DataSource;

  beforeAll(async () => {
    dataSource = await FixtureFactory.createDataSource().initialize();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it(
    'Insert',
    async () => {
      await Bulk.insertMembers(dataSource);
      await Bulk.insertPosts(dataSource);

      expect(1).toEqual(1);
    },
    Bulk.TIMEOUT * 2,
  );
});
