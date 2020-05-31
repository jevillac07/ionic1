import { AlertController, IonList } from '@ionic/angular';
import { Lista } from './../../models/lista.model';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/service/deseos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  listas: Lista[] = [];
  @Input() pendientes: boolean;
  @ViewChild(IonList, {static: true}) tagIonList: IonList;

  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertController: AlertController) {
  }

  ngOnInit() {
    this.listas = this.deseosService.listas;
  }

  onClick(lista: Lista) {
    const url = `/tabs/agregar/${ lista.id }/` + ((this.pendientes) ? '1' : '2');
    this.router.navigateByUrl(url);
  }

  eliminarLista(lista: Lista) {
    this.deseosService.eliminarLista(lista);
    this.deseosService.guardarStorage();
  }

  async editarNombreLista(lista: Lista) {
    const alert = await this.alertController.create({
      header: 'Editar Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Escriba el titulo',
          value: lista.titulo
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            if (data.titulo.length < 1) {
              return;
            }

            lista.titulo = data.titulo;
            this.deseosService.guardarStorage();
            this.tagIonList.closeSlidingItems();
          }
        }
      ]
    });

    await alert.present();
  }
}
