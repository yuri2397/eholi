import { Component, OnInit } from '@angular/core';
import { School, SchoolYear } from 'app/main/pages/establishment/establishment.model';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  currentSchoolYear: SchoolYear;
  school: School;
  constructor() { }

  ngOnInit(): void {
    this.currentSchoolYear = JSON.parse(localStorage.getItem("school_year"));
    this.school = JSON.parse(localStorage.getItem("school_data"));
  }

}
