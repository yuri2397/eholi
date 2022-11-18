import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import Stepper from 'bs-stepper'

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdmissionComponent implements OnInit {
  // Translate Object
  translateObject: { title: string; sub_title?: string }[] = []
  public contentHeader: object
  public TDNameVar: any
  public TDEmailVar: any
  public TDFirstNameVar: any
  public TDLastNameVar: any
  public twitterVar: any
  public facebookVar: any
  public googleVar: any
  public linkedinVar: any
  public landmarkVar: any
  public addressVar: any

  public selectBasic = [
    { name: 'UK' },
    { name: 'USA' },
    { name: 'Spain' },
    { name: 'France' },
    { name: 'Italy' },
    { name: 'Australia' },
  ]

  constructor(private _translateService: TranslateService) {
    // transaltion service
    this._translateService
      .get(['content.title.admission', 'content.admission.stepper'])
      .subscribe((data: string[]) => {
        console.log(data)
        this.translateObject = data['content.admission.stepper']

        this.contentHeader = {
          headerTitle: data['content.title.admission'],
          actionButton: false,
        }
      })
  }

  // private
  private horizontalWizardStepper: Stepper

  /**
   * Horizontal Wizard Stepper Next
   *
   * @param data
   */
  horizontalWizardStepperNext(data) {
    if (data.form.valid === true) {
      this.horizontalWizardStepper.next()
    }
  }
  /**
   * Horizontal Wizard Stepper Previous
   */
  horizontalWizardStepperPrevious() {
    this.horizontalWizardStepper.previous()
  }

  /**
   * On Submit
   */
  onSubmit() {
    alert('Submitted!!')
    return false
  }

  ngOnInit(): void {
    this.horizontalWizardStepper = new Stepper(
      document.querySelector('#stepper1'),
      {},
    )
  }
}
