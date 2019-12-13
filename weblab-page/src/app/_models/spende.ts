export class Spende {
  public projectName: string;
  public donation: string;
  public projectId: string;
  public spenderId: string;

  constructor(projectId: string, projectName: string, donation: string, spenderId: string) {
    this.projectId = projectId;
    this.donation = donation;
    this.projectName = projectName;
    this.spenderId = spenderId;
  }
}
