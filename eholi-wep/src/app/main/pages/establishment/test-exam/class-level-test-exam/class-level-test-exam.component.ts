import { Component, OnInit } from '@angular/core';
import {ClassLevelTestExamService} from '../../services/class-level-test-exam.service';
import {TestExam} from '../../models/test-exam.model';
import {TranslateService} from '@ngx-translate/core';
import {Param} from '../../../../../auth/models/data.model';
import {Room} from '../../models/room.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Paginate} from '../../../../../auth/models/base.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ClassLevel} from '../../models/class-level.model';

@Component({
  selector: 'app-class-level-test-examen',
  templateUrl: './class-level-test-exam.component.html',
  styleUrls: ['./class-level-test-exam.component.scss']
})
export class ClassLevelTestExamComponent implements OnInit {

  queryParams: Param = {};
  tests: TestExam[] = [];
  searchTimeout: NodeJS.Timeout;
  classLevel: number;

  contentHeader: { headerTitle: string; actionButton: boolean };
  selectedRow: Room;
  deletedRow: Room;
  constructor(
      private _classLevelTestExamService: ClassLevelTestExamService,
      private translate: TranslateService,
      private _modalService: NgbModal,
      private _route: ActivatedRoute,
      private _router: Router,
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe((data) => this.classLevel = data.uuid);
    this._route.data.subscribe(data => {
      console.log(data);
        this.tests = data.test_exams;
        this.tests = this.tests.sort((a, b) => a.semester.number - b.semester.number)
    });
  }

  openCreateModal(createModal: any) {
    this._modalService
        .open(createModal, {
          centered: true,
          windowClass: 'modal modal-primary',
          size: 'md',
          keyboard: false,
        })
        .result.then((result) => {
      console.log(result);
      if (result) {
        this._router.navigate([], { relativeTo: this._route, queryParams: this._route.queryParams })
      }
    }).catch((_) => {});
  }

  onSearch(value: any) {
  }

  paginate(page?: number) {
  }

  deleteTestExam(id) {
  }

  openEditModal(editModal: any, row: any) {
  }

  ConfirmTextOpen() {
  }
}
