import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Maria Carolina',
      email: 'carol-martins7@hotmail.com',
      password: '123456'
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'maria',
    });

    expect(user.avatar).toBe('maria');
  });

  it('should not be able to update a avatar with non existing user', async () => {
    await expect( updateUserAvatar.execute({
      user_id: 'nonexist',
      avatarFilename: 'maria',
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should be able to delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile'); //espionar esse comando.

    const user = await fakeUsersRepository.create({
      name: 'Maria Carolina',
      email: 'carol-martins7@hotmail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'maria',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'maria.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('maria');
    expect(user.avatar).toBe('maria.jpg');
  });
});