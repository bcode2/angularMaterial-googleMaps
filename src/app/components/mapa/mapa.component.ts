import { MapaEditComponent } from './mapa-edit.component';
import { Marcador } from './../../class/marcador.class';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  title = 'mapa google';
  lat = 51.67848;
  lng = 7.809007;

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {
    if (localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
  }

  ngOnInit() {
  }

  addMarker(event) {
    const coords: { lat: number, lng: number } = event.coords;
    const newMarker = new Marcador(coords.lat, coords.lng);
    this.marcadores.push(newMarker);
    this.saveStorage();
    this.snackBar.open('Marcador agregado', 'Cerrar', { duration: 3000 });
  }


  saveStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }

  removeMarker(i: number) {
    this.marcadores.splice(i, 1);
    this.saveStorage();
    this.snackBar.open('Marcador Borrado', 'Cerrar', { duration: 3000 });
  }

  editMarker(marcador: Marcador) {
    const dialogRef = this.dialog.open(MapaEditComponent, {
      width: '250px',
      data: { titulo: marcador.titulo, desc: marcador.desc }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //console.log(result);

      if (!result) {
        return;
      }

      marcador.titulo = result.titulo;
      marcador.desc = result.desc;
      this.saveStorage();
      this.snackBar.open('Marcador Actualizado', 'Cerrar', { duration: 3000 });
    });
  }

}
