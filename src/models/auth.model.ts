export interface IAuth extends Document {
  email: string;
  passwordHash: string;
}
