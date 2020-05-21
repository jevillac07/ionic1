import { ListaItem } from './lista-item.model';

export class Lista {
    id: number;
    titulo: string;
    fechaCreacion: Date;
    fechaTermino: Date;
    completado: boolean;
    items: ListaItem[];

    constructor(tit: string) {
        this.id = new Date().getTime();
        this.titulo = tit;
        this.fechaCreacion = new Date();
        this.completado = false;
        this.items = [];
    }
}
