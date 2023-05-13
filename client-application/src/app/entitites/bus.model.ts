interface IBus {
  id?: number;
  name?: string;
  surname?: string;
  email?: string;
  phoneNumber?: string;
  birthDate?: string;
  gender?: string;
  pesel?: string;
  addressId?: number;
  targetObjectId?: number;
  roleId?: number;
}

interface IBusPassword {
  oldPassword?: string;
  password?: string;
}

export class Bus implements IBus {
  constructor(
   public id?: number,
   public name?: string,
   public surname?: string,
   public email?: string,
   public birthDate?: string,
   public phoneNumber?: string,
   public gender?: string,
   public pesel?: string,
   public addressId?: number,
   public targetObjectId?: number,
   public roleId?: number
  ) {}
}

export class BusPassword implements IBusPassword {
  constructor(
    public oldPassword?: string,
    public password?: string
  ) {}
}
