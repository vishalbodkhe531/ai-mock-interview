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

interface ParseResultType {
  question: string;
  isCompleted: boolean ;
  answer: string;
}

export interface PropesType {
  parseResult: ParseResultType[];
  userInfo: UserDataType;
}
