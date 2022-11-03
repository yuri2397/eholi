import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-ecard',
  templateUrl: './ecard.component.html',
  styleUrls: ['./ecard.component.scss'],
})
export class EcardComponent implements OnInit {
  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.data.subscribe((data: { ecards: any }) => {
      console.log(data.ecards)
    })
  }
}
