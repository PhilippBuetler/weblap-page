import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/_models/article';
import { CommunicationService } from 'src/app/_services/communication.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  selectedFile: File;

  constructor(private communicationService: CommunicationService) { }

  model = new Article('', '', '', '','');

  ngOnInit() {
  }

  uploadFile() {
    this.communicationService.postFile(this.selectedFile).subscribe(data => {
      console.log('uploaded filename: ' + data.filepath);
      let backendApi = this.communicationService.getBackendAPIPath();
      this.model.imagepath = backendApi +  data.filepath;
      this.addArticleToDb();
    }, error => {
      console.log(error);
    });
  }

  addArticle() {
    if (this.selectedFile == null) {
      this.addArticleToDb();
    }
    else {
      this.uploadFile();
    }
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  addArticleToDb() {
    this.communicationService
      .addArticle(this.model)
      .subscribe(() => location.reload());
  }

  togglePopup() {
    let articlePopup = document.getElementById('articlepopup');
    articlePopup.classList.toggle("is-active");
  }
}
