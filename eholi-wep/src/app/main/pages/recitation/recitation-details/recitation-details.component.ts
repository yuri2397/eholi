import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recitation-details',
  templateUrl: './recitation-details.component.html',
  styleUrls: ['./recitation-details.component.scss']
})
export class RecitationDetailsComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._route.data.subscribe( (data) => {
      console.log(data)
    } )
  }

}
