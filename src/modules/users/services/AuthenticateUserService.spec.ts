import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService
let authenticateUser: AuthenticateUserService;


describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'Maria Carolina',
      email: 'carol-martins7@hotmail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'carol-martins7@hotmail.com',
      password: '123456'
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
      email: 'carol-martins7@hotmail.com',
      password: '123456',
    }),
    ).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'Maria Carolina',
      email: 'carol-martins7@hotmail.com',
      password: '123456',
    });

    await expect(authenticateUser.execute({
      email: 'carol-martins7@hotmail.com',
      password: '654321'
    })).rejects.toBeInstanceOf(AppError);
  });
});