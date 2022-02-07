import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import {
  createConnection,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  const testConnectionName = 'testConnection';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();
    const connection = await createConnection({
      type: 'postgres',
      database: 'postgres',
      username: 'docker',
      password: 'docker',
      entities: [User],
      synchronize: true,
      logging: false,
      name: testConnectionName,
    });

    repository = getRepository(User, testConnectionName);
    service = new UsersService(repository);

    return connection;

    service = module.get<UsersService>(UsersService);
  });

  afterEach(async () => {
    await getConnection(testConnectionName).close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return user info for findOne', async () => {
    // prepare data, insert them to be tested
    const userInfoData: { firstName: string; lastName: string; password: string; id: number; userName: string; isActive: boolean } = {
      id: 1,
      firstName: 'ale',
      lastName: 'silva',
      userName:'alesoft',
      password:'password',
      isActive: true,
    };
    //await repository.insert(userInfoData);
    // test data retrieval itself
    expect(await service.findOne(userInfoData.userName)).toEqual(userInfoData);
  });

  it('should return length to array for findAll', async () => {
    expect(await service.findAll()).toHaveLength(2);
  });

  // it('shuoul return a user update', async () => {
  //
  // })
});
