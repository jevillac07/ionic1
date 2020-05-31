import { Lista } from './../../models/lista.model';
import { Component } from '@angular/core';
import { DeseosService } from 'src/app/service/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html'
})
export class Tab1Page {
  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertController: AlertController) {
  }

  agregarLista() {
    this.router.navigateByUrl('/tabs/agregar');
  }

  async muestraAlerta() {
    const alert = await this.alertController.create({
      header: 'Agregar',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Escriba el titulo'
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

            const lista = this.deseosService.agregarStorage(data.titulo);
            this.router.navigateByUrl(`/tabs/agregar/${ lista.id }/1`);
          }
        }
      ]
    });

    await alert.present();
  }
}
