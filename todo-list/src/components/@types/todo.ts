export interface Todo {
  _id?: string;
  text: string;
  completed: boolean;
  isImportant: boolean;
  createdAt: Date;
}
