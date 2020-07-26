import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

interface Message {
  to: string;
  body: string;
}

export default class FakeMailProvider implements IMailProvider{
  private messages: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void>{
    this.messages.push(message);
  }
}