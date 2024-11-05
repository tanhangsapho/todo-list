export interface Todo {
  text?: string;
  completed?: boolean;
  isImportant?: boolean;
  createdAt?: Date;
}

export interface IUpdate {
  completed?: boolean;
  isImportant?: boolean;
}
