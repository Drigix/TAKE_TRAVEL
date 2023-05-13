interface ITravelRoute {
  routeId?: number;
  name?: string;
  startingPoint?: string;
  endingPoint?: string;
  distance?: number
}

export class TravelRoute implements ITravelRoute {
  constructor(
    public routeId?: number,
    public name?: string,
    public startingPoint?: string,
    public endingPoint?: string,
    public distance?: number
  ) {}
}
