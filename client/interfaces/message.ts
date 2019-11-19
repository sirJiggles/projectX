import User from './user';
import Chat from './chat';

export default interface Message {
  content: string;
  id: string;
  author: User;
  chat: Chat;
}
