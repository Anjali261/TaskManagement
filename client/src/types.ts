export type User = {
    _id: string
    name: string
    email: string
    token?: string
    }
    

export type Task = {
    _id: string;
    title: string;
    description: string;
    status: "Pending" | "Completed";
    user: {
      _id: string;
      name: string;
    } | string; 
    createdAt?: string;
    updatedAt?: string;
  };
  