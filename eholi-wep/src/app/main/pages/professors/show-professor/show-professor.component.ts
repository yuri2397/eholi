import { Professor } from './../professor'
import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-show-professor',
  templateUrl: './show-professor.component.html',
  styleUrls: ['./show-professor.component.scss'],
})
export class ShowProfessorComponent implements OnInit {
  professor: Professor

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.data.subscribe((data) => {
      console.log(data)

      this.professor = data.professor
    })
  }
}
