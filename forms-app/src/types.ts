export type UncontrolledFormState = {
  name: string;
  age: number;
  email: string;
  password: string;
  // gender: 'male' | 'female';
  gender: string;
  tc: boolean;
  country?: string; //TODO change to list of countries
  file?: string;
};

export type StateType = {
  uncontrolled: UncontrolledFormState;
};
