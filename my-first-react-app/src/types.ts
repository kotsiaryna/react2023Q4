export type Response = {
  status: string;
  totalResults: number;
  articles: IArticle[];
};

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
