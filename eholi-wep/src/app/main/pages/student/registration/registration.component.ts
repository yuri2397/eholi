import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public contentHeader: object

  constructor(
    private _toastrService: ToastrService,
    private _translateService: TranslateService,
  ) {}

  // LIVE CYCLE
  ngOnInit(): void {
    // transaltion service
    this._translateService
      .get(['content.title.registration'])
      .subscribe((data: string[]) => {
        this.contentHeader = {
          headerTitle: data['content.title.registration'],
          actionButton: false,
        }
      })
  }
}
