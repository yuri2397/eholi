import { Component, Input, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { first, finalize } from "rxjs/operators";
import { BuildingService } from "../../services/building.service";
import { Building } from "../../establishment.model";

@Component({
  selector: "app-edit-building",
  templateUrl: "./edit-building.component.html",
  styleUrls: ["./edit-building.component.scss"],
})
export class EditBuildingComponent implements OnInit {
  @Input("modal") modal: any;
  @Input("item") item: Building;
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
      name: new FormControl(this.item?.name ?? "", [Validators.required]),
    });
  }

  get name() {
    return this.form.get("name");
  }

  submit(form: any) {
    this.createdLoad = true;
    this._buildingService
      .update(this.item.id, form)
      .pipe(
        first(),
        finalize(() => (this.createdLoad = false))
      )
      .subscribe({
        next: (response) => {
          this._translateService
            .get([
              "buildings.edit_success_title",
              "buildings.edit_success_body",
            ])
            .subscribe((data: string[]) => {
              this._toastrService.success(
                data["buildings.edit_success_body"],
                data["buildings.edit_success_title"]
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
