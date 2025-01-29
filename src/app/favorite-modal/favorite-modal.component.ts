import { CommonModule } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatListModule, MatListOption, MatSelectionList } from '@angular/material/list';
import { Station } from '../main/radios';

@Component({
  selector: 'app-favorite-modal',
  standalone: true,
  imports: [ MatDialogModule,
    MatCheckboxModule,
    MatListModule,
    MatButtonModule,
    CommonModule],
  templateUrl: './favorite-modal.component.html',
  styleUrl: './favorite-modal.component.scss'
})
export class FavoriteModalComponent {
  @ViewChild('favoritesList') favoritesList!: MatSelectionList;
  stations: Station[] = [];
  selectedStations: Station[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {stations: Station[]},
    private dialogRef: MatDialogRef<FavoriteModalComponent>
  ) {
    this.stations = data.stations;
  }

  onGroupsChange(options: MatListOption[]) { 
     this.selectedStations = options.map(o => o.value);
  }
  save() {
    if (this.selectedStations.length === 0) {
      //all checked
      this.dialogRef.close(this.stations);
      return;
    }
     
    const selectedStations = this.selectedStations;
    this.dialogRef.close(selectedStations.map(s => s.url));
  }

}
