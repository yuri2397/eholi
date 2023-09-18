import { finalize } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ayah, ProgressionDetails } from '../progression';
import { RecitationsService } from '../services/recitations.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProgressionItemDetailsComponent } from '../progression-item-details/progression-item-details.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recitation-details',
  templateUrl: './recitation-details.component.html',
  styleUrls: ['./recitation-details.component.scss']
})
export class RecitationDetailsComponent implements OnInit {

  details: ProgressionDetails;  
  loadDetails = false;
  currentProgressionDetails: { data: Ayah[], config: any };
  selectedData: any;
  constructor(
    private _route: ActivatedRoute,
    private _progressionService: RecitationsService,
    private _modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this._route.data.subscribe( (data) => {
      this.details = data.progression as ProgressionDetails;
      console.log(this.details)
    } )
  }

  onPanelChange(data: any, panel: any){
    let id: number = data.panelId.substring(2);
    let progression = this.details.progressions.filter((e)  => {
      if(e.surah.number == id){
        return e;
      }
    })[0];

    console.log(progression);
    this.loadDetails = true;
    this._progressionService.studentProgressionDetails(progression.id)
    .pipe(finalize(() => {this.loadDetails = false}))
    .subscribe({
      next: (response: any) => {
        console.log(response)
        this.currentProgressionDetails = response.ayahs;
        console.log(this.currentProgressionDetails);
      },
      error: errors => {
        console.log(errors);
      }
    });
  }

  showDetailsItem(modal: any, data: any){
    this.selectedData= data;
    this._modalService
      .open(modal, {
        centered: true,
        windowClass: 'modal modal-primary',
        size: 'xl',
        keyboard: false,
      })
      .result.then((result) => {
        console.log(result, 'result')

      })
      .catch((_) => {})
  }

}
