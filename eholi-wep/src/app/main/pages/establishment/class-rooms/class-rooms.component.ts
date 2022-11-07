import { Paginate } from 'app/auth/models/base.model'
import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { ClassRoom } from '../establishment.model'

@Component({
  selector: 'app-class-rooms',
  templateUrl: './class-rooms.component.html',
  styleUrls: ['./class-rooms.component.scss'],
})
export class ClassRoomsComponent implements OnInit {
  class_rooms: Paginate<ClassRoom>

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.data.subscribe((data: { class_rooms: Paginate<ClassRoom> }) => {
      this.class_rooms = data.class_rooms
      console.log(this.class_rooms)
    })
  }
}
