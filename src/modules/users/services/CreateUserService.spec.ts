import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Maria Carolina',
      email: 'carol-martins7@hotmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be not able to create a new user with same email', async () => {
    await createUser.execute({
      name: 'Maria Carolina',
      email: 'carol-martins7@hotmail.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Maria Carolina',
        email: 'carol-martins7@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});