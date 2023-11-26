export type Resp = {
  status: string;
  totalResults: number;
  articles: IArticle[];
  id?: string;
};

export interface IArticle {
  index: number;
  source?: { id: string; name: string };
  author: string;
  title: string;
  description?: string;
  url?: string;
  urlToImage?: string;
  publishedAt?: string;
  content?: string;
}
