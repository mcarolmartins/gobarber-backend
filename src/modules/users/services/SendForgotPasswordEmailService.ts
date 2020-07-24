// import User from '../infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserRepository from '../repositories/IUsersRepository';

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
    ){};

 public async execute({ email }: Request): Promise<void> {
    this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido');
  }
}

export default SendForgotPasswordEmail;
