import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { BuildingService } from "../../services/building.service";
import { finalize, first } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-create-building",
  templateUrl: "./create-building.component.html",
  styleUrls: ["./create-building.component.scss"],
})
export class CreateBuildingComponent implements OnInit {
  @Input("modal") modal: any;
  form: FormGroup;
  createdLoad = false;

  constructor(
    private _fb: FormBuilder,
    private _buildingService: BuildingService,
    private _translateService: TranslateService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
    })
  }

  get name() {
    return this.form.get('name')
  }

  submit(form: any) {
    this.createdLoad = true;
    this._buildingService
      .create(form)
      .pipe(
        first(),
        finalize(() => (this.createdLoad = false))
      )
      .subscribe({
        next: (response) => {
          this._translateService
            .get([
              "buildings.create_success_title",
              "buildings.create_success_body",
            ])
            .subscribe((data: string[]) => {
              this._toastrService.success(
                data["buildings.create_success_title"],
                data["buildings.create_success_body"]
              );

              this.modal.close(response);
            });
        },
        error: (errors) => {
          console.log(errors);
          this.modal.close(errors);
        },
      });
  }
}
