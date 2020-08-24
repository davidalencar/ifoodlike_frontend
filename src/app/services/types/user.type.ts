import { TokenType } from './token.type'

export class UserType{
    token: TokenType;
    name: string;
    email: string;
    phone: string;
    password?: string;
    plan:string;    
  }