interface ITravel {
  travelId?: number;
}

export class Travel implements ITravel {
  constructor(
    public travelId?: number
  ) {}
}
