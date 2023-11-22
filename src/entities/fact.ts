import { User } from './user.js';

export type Fact = {
  id: string;
  author: User;
  title: string;
  fact: string;
  isVeryImportant: boolean;
};
