export class Article {
  public title: string;
  public subtitle: string;
  public content: string;
  public id: string;
  public imagepath: string;

  constructor(id: string, title: string, subtitle: string, content: string, imagepath: string) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.content = content;
    this.imagepath = imagepath;
  }
}
