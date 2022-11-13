import { Paginate } from 'app/auth/models/base.model'
import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { SchoolYear } from '../establishment.model'

@Component({
  selector: 'app-school-years',
  templateUrl: './school-years.component.html',
  styleUrls: ['./school-years.component.scss'],
})
export class SchoolYearsComponent implements OnInit {
  school_years: Paginate<SchoolYear>

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.data.subscribe(
      (data: { school_years: Paginate<SchoolYear> }) => {
        this.school_years = data.school_years
        console.log(this.school_years)
      },
    )
  }
}
