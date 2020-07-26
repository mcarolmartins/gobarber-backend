// import User from '../infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface Request {
  email: string;
}

@injectable()
class SendForgotPasswordEmail {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    ){};

  public async execute({ email }: Request): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if(!user){
      throw new AppError('User doesnt exists');
    }

    const {token} = await this.userTokensRepository.generate(user.id);

    await this.mailProvider.sendMail(email, `Pedido de recuperação de senha recebido: ${token}`);
  }
}

export default SendForgotPasswordEmail;
