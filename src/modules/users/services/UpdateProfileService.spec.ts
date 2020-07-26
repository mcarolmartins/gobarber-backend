import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Maria Carolina',
      email: 'carol-martins7@hotmail.com',
      password: '123456'
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Maria Carolina Martins',
      email: 'mcarolmartins@hotmail.com',
    });

    expect(updatedUser.name).toBe('Maria Carolina Martins');
    expect(updatedUser.email).toBe('mcarolmartins@hotmail.com');
  });

  it('should not be able to update profile from non-existing user', async () => {
    expect(
      updateProfile.execute({
      user_id: 'non-existing',
      name: 'Maria Carolina Martins',
      email: 'mcarolmartins@hotmail.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should no be able to change to another user email already existing', async () => {
    await fakeUsersRepository.create({
      name: 'Maria Carolina',
      email: 'carol-martins7@hotmail.com',
      password: '123456'
    });

    const user = await fakeUsersRepository.create({
      name: 'MC Arol',
      email: 'mcarolmartins@hotmail.com',
      password: '123456'
    });
  
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'MC Arol Martins',
      email: 'carol-martins7@hotmail.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Maria Carolina',
      email: 'carol-martins7@hotmail.com',
      password: '123456'
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Maria Carolina Martins',
      email: 'mcarolmartins@hotmail.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Maria Carolina',
      email: 'carol-martins7@hotmail.com',
      password: '123456'
    });

    await expect(
      updateProfile.execute({
      user_id: user.id,
      name: 'Maria Carolina Martins',
      email: 'mcarolmartins@hotmail.com',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should be able to update the password with worng old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Maria Carolina',
      email: 'carol-martins7@hotmail.com',
      password: '123456'
    });

    await expect(
      updateProfile.execute({
      user_id: user.id,
      name: 'Maria Carolina Martins',
      email: 'mcarolmartins@hotmail.com',
      old_password: '111111',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError);

  });
});