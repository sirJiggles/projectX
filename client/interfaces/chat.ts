import User from './user';
import Message from './message';

export default interface Chat {
  name: string;
  members: User[];
  messages: Message[];
  owner: User;
}
