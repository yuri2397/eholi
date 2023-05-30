import { Utils } from './../../../../../auth/helpers/utils';
import { DeliberationService } from "./../../services/deliberationservice";
import { Deliberation } from "./../../models/test-exam.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-class-level-deliberation-resultats",
  templateUrl: "./class-level-deliberation-resultats.component.html",
  styleUrls: ["./class-level-deliberation-resultats.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ClassLevelDeliberationResultatsComponent implements OnInit {
  contentHeader = {
    headerTitle: "Résultats de la délibération",
  };
  deliberation: Deliberation;
  results: any[] = [];
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _deliService: DeliberationService
  ) {}

  ngOnInit(): void {
    this._route.data.subscribe((data) => {
      console.log(data);
      this.deliberation = data.deliberation?.deliberation;
      this.results = data.deliberation?.results;
    });
  }

  downloadResult() {
    this._deliService.downloadResults(this.deliberation).subscribe({
      next: (response) => {
        console.log(response);
        Utils.printContentHtml(response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
