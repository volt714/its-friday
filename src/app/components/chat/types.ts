export interface Message {
  id: number;
  body: string;
  createdAt: Date | string;
  user: {
    name: string;
  };
}
