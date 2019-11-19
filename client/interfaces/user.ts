import Chat from './chat';
import Message from './message';

export default interface User {
  id: string;
  name: string;
  password: string;
  messages: Message[];
  chats: Chat[];
}
