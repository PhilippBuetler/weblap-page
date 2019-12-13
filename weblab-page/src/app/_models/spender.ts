import { Role } from "./role";

export class Spender {
  public id: string;
  public prename: string;
  public lastname: string;
  public email: string;
  public password: string;
  public walletId: string;
  public walletPassword: string;
  public role: Role;
  public token?: string;

  constructor(prename: string, lastname: string, email: string, password: string) {
    this.prename = prename;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.walletId = "WalletId";
    this.walletPassword = "WalletPassword";
    this.role = Role.User;
  }
}
