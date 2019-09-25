import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { CommunicationService } from '../../communication.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  popup_active: boolean = false;

  selectedFile: File;

  constructor(private communicationService: CommunicationService) { }

  model = new Article('', '', '', '');

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  onSubmit() {
    this.communicationService
      .addArticle(this.model)
      .subscribe(article => console.log(article));
  }

  togglePopup() {
    return this.popup_active = !this.popup_active;
  }
}
