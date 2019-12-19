export class Spende {
  public projectName: string;
  public donation: string;
  public projectId: string;
  public spenderId: string;
  public date: string;

  constructor(projectId: string, projectName: string, donation: string, spenderId: string, date:string) {
    this.projectId = projectId;
    this.donation = donation;
    this.projectName = projectName;
    this.spenderId = spenderId;
    this.date = date;
  }
}
