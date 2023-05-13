import { Address } from "./address.model";

interface IClient {
  clientId?: number;
  email?: string;
  name?: string;
  surname?: string;
  address?: Address;
  birthDate?: string;
  pesel?: string;
  phoneNumber?: string;
  gender?: string;
}

export class Client implements IClient {
  constructor(
  public clientId?: number,
  public email?: string,
  public name?: string,
  public surname?: string,
  public address?: Address,
  public birthDate?: string,
  public pesel?: string,
  public phoneNumber?: string,
  public gender?: string
  ) {}
}
