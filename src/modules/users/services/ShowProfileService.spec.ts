import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('showProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Maria Carolina',
      email: 'carol-martins7@hotmail.com',
      password: '123456'
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Maria Carolina');
    expect(profile.email).toBe('carol-martins7@hotmail.com');
  });

  it('should not be able to show profile non-existing', async () => {
    expect(showProfile.execute({
      user_id: 'non-existing',
    })).rejects.toBeInstanceOf(AppError);
  });
});