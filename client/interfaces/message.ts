import User from './user';

export default interface Message {
  content: string;
  id: string;
  author: User;
}
