import { Paginate } from 'app/auth/models/base.model'
import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { ClassLevel } from '../establishment.model'

@Component({
  selector: 'app-class-levels',
  templateUrl: './class-levels.component.html',
  styleUrls: ['./class-levels.component.scss'],
})
export class ClassLevelsComponent implements OnInit {
  class_levels: Paginate<ClassLevel>

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.data.subscribe(
      (data: { class_levels: Paginate<ClassLevel> }) => {
        console.log(data.class_levels)
        this.class_levels = data.class_levels
      },
    )
  }
}
