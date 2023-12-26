import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingComponent } from './building.component';
import { ContentHeaderModule } from "../../../layout/components/content-header/content-header.module";
import { SharedModule } from 'app/shared/shared.module';
import { CreateBuildingComponent } from './create-building/create-building.component';
import { EditBuildingComponent } from './edit-building/edit-building.component';



@NgModule({
    declarations: [
        BuildingComponent,
        CreateBuildingComponent,
        EditBuildingComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class BuildingModule { }
