export class IncomeOutcome {
  constructor(
    public description: string,
    public amount: number,
    public income: boolean,
    public uid?: number
  ) {}
}
