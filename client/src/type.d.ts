// interface ITodo {
//   id: number;
//   title: string;
//   description: string;
//   status: boolean;
// }

type GlobalContextType = {
  loading: boolean;
  loggedInEmail: string;

  getLoggedInEmail: () => void;
  addLoggedInEmail: (email: string) => void;
};

type ReleaseContextType = {
  loading: boolean;
  loggedInEmail: string;
};
