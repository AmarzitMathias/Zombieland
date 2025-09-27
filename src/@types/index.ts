// fichier dans lequel on définit les types de données que l'on va manipuler les interfaces 

export interface IAttraction {
  [x: string]: any;
  id: number;
  name: string;
  description: string;
  category: string;
}

export interface IInscription {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
}

export interface IConnect {
  email: string;
  password: string;
}

export interface IActivity {
  id: number;
  name: string;
  image: string;
  description: string;
  id_category: number;  
}

export interface IReservation {
  id: number;
  selectedDate: string;
}