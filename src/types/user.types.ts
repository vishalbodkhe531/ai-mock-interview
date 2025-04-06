export interface formType {
  role: string;
  jobDesc: string;
  experience: string;
}

export interface UserDataType {
  userId: string;
  userName: string;
  profilePic: string;
}

export interface ParseResultType {
  question: string;
  isCompleted: boolean;
  answer: string;
  aifeed?: {
    rating: number;
    feedback: string;
  };
}

export interface PropesType {
  parseResult: ParseResultType[];
  userInfo: UserDataType;
}
