export type FormsState = {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  tc: boolean;
  country?: string; //TODO change to list of countries
  file: string;
};

export type DataType = {
  name: string;
  age: number;
  email: string;
  password1: string;
  password2: string;
  gender: string;
  tc: boolean;
  country?: string; //TODO change to list of countries
  file: FileList;
};

export type StateType = {
  form: FormsState[];
};
