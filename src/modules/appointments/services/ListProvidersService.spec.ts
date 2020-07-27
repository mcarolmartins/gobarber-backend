import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const loggedUser = await fakeUsersRepository.create({
      name: 'Maria Carolina',
      email: 'carol-martins7@hotmail.com',
      password: '123456'
    });

    const userTest = await fakeUsersRepository.create({
      name: 'Giullyana Belchior',
      email: 'giullybel@hotmail.com',
      password: '123456'
    });

    const userTest2 = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password: '123456'
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
      
    });

    expect(providers).toEqual([
      userTest,
      userTest2,
    ]);
  });
});