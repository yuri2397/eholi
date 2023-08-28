import { Utils } from "./../../../../../auth/helpers/utils";
import { DeliberationService } from "./../../services/deliberationservice";
import { Deliberation } from "./../../models/test-exam.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import Swal from "sweetalert2";
import { Location } from "@angular/common";

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
    private _deliService: DeliberationService,
    private location: Location
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

  removeDeliberation() {
    Swal.fire({
      title: "Attention !!!",
      text: "Vous êtes entrain de supprimer un déliberation. Cette action entrainne la suppression définitive de la délibération. Si vous voulez continuer, clique sur 'valider'",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Valider",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        this._removeDeliberation();
      }
    });
  }
  private _removeDeliberation() {
    this._deliService
      .delete(this.deliberation.id)
      .pipe()
      .subscribe({
        next: (response) => {
          Swal.fire({
            title: "Félicitation",
            text: "Déliberation supprimé avec succès",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Fermer",
          }).then((_) => {
            this.location.back();
          });
        },
        error: (errors) => {
          console.log(errors);
          Swal.fire({
            title: "Oups !!!",
            text: "Une erreur s'est produit lors de la suppression.",
            icon: "error",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Fermer",
          })
        },
      });
  }
}
