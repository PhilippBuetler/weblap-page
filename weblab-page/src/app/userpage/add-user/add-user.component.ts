import { Component, OnInit } from '@angular/core';
import { Spender } from 'src/app/_models/spender';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private userService: UserService) { }

  model = new Spender('', '', '', '',0);

  ngOnInit() {
  }

  addUserToDb() {
    console.log("providedModel");
    console.log(this.model);
    this.userService.addUser(this.model);
  }

  togglePopup() {
    let userPopup = document.getElementById('userpopup');
    userPopup.classList.toggle("is-active");
  }
}
