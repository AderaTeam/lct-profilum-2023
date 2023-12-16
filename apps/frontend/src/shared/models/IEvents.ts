export interface IAuthor {
  username: string;
  nickname: string;
  avataruri: string;
}

export interface IEvents {
  title: string;
  author: IAuthor;
  status: string;
  date: string;
}
