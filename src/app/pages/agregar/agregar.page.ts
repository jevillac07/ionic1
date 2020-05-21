import { ListaItem } from './../../models/lista-item.model';
import { Lista } from './../../models/lista.model';
import { Component, OnInit } from '@angular/core';
import { DeseosService } from 'src/app/service/deseos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  listaObtenida: Lista;
  descripcion = '';

  constructor(private deseosService: DeseosService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const idLista = this.route.snapshot.paramMap.get('idLista');
    this.listaObtenida = this.deseosService.obtenerLista(idLista);
  }

  agregarListaItem() {
    if (this.descripcion !== '') {
      const lista = new ListaItem(this.descripcion);
      this.listaObtenida.items.push(lista);
      this.descripcion = '';
      this.deseosService.guardarStorage();
    }
  }

  onClick(lista: ListaItem) {
    const faltan = this.listaObtenida.items.filter(element => !element.completado).length;

    if (faltan === 0) {
      this.listaObtenida.fechaTermino = new Date();
      this.listaObtenida.completado = true;
    } else {
      this.listaObtenida.fechaTermino = null;
      this.listaObtenida.completado = false;
    }

    this.deseosService.guardarStorage();
  }
}
