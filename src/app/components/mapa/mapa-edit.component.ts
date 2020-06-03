import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mapa-edit',
  templateUrl: './mapa-edit.component.html',
  styleUrls: ['./mapa-edit.component.css']
})
export class MapaEditComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MapaEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder) {
      console.log(data);
      this.forma = fb.group({
        'titulo': data.titulo,
        'desc': data.desc
      });
    }


  ngOnInit() {
  }

  saveChanges() {
    //console.log(this.forma.value);
    this.dialogRef.close(this.forma.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
