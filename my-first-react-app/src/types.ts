export interface IShip {
  name: string;
  model: string;
  length: string;
  manufacturer: string;
  starship_class: string;
  cost_in_credits: string;
  url: string;
  handleClick: () => void;
}

export type Response = {
  status: string;
  totalResults: number;
  articles: IArticle[];
};
// export type Response = {
//   count: number;
//   next: null | string;
//   previous: null | string;
//   results: IShip[];
// };

export interface IArticle {
  index: number;
  source?: { id: string; name: string };
  author: string;
  title: string;
  description: string;
  url?: string;
  urlToImage?: string;
  publishedAt?: string;
  content?: string;
  handleClick: () => void;
}
