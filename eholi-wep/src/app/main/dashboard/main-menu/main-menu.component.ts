import { AfterViewInit, Component, OnInit } from "@angular/core";
import { School } from "app/modules/establishment/establishment.model";
import { SchoolYear } from "app/modules/establishment/models/school-year.model";

@Component({
  selector: "app-main-menu",
  templateUrl: "./main-menu.component.html",
  styleUrls: ["./main-menu.component.scss"],
})
export class MainMenuComponent implements OnInit, AfterViewInit {
  currentSchoolYear: SchoolYear;
  school: School;
  constructor() {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.currentSchoolYear = JSON.parse(localStorage.getItem("school_year"));
      this.school = JSON.parse(localStorage.getItem("school_data"));
    }, 1);
  }

  ngOnInit(): void {}
}
