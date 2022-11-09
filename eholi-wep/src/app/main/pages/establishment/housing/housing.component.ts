import { Paginate } from 'app/auth/models/base.model'
import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { Room } from '../establishment.model'

@Component({
  selector: 'app-housing',
  templateUrl: './housing.component.html',
  styleUrls: ['./housing.component.scss'],
})
export class HousingComponent implements OnInit {
  rooms: Paginate<Room>

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.data.subscribe((data: { rooms: Paginate<Room> }) => {
      this.rooms = data.rooms
      console.log(this.rooms)
    })
  }
}
