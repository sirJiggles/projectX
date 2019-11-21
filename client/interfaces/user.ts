import Chat from './chat';
import Message from './message';

export default interface User {
  id: string;
  name: string;
  number: string;
  password: string;
  messages: Message[];
  chats: Chat[];
}
