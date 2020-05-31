import { Lista } from './../models/lista.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
  listas: Lista[] = [];

  constructor() {
    this.cargarStorage();
  }

  agregarStorage(titulo: string) {
    const lista = new Lista(titulo);
    this.listas.push(lista);
    this.guardarStorage();

    return lista;
  }

  guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  obtenerLista(id: string): Lista {
    const idLista = Number(id);

    return this.listas.find(element => element.id === idLista);
  }

  eliminarLista(lista: Lista) {
    const indice = this.listas.indexOf(lista);
    this.listas.splice(indice, 1);
  }

  cargarStorage() {
    if (localStorage.getItem('data') != null) {
      this.listas = JSON.parse(localStorage.getItem('data'));
    }
  }
}
