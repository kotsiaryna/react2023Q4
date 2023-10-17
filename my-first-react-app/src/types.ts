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
  count: number;
  next: null | string;
  previous: null | string;
  results: IShip[];
};
