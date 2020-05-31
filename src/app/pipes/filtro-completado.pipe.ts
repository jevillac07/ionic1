import { Lista } from './../models/lista.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroCompletado',
  pure: false
})
export class FiltroCompletadoPipe implements PipeTransform {

  transform(listas: Lista[], completado: boolean = true): Lista[] {
    return listas.filter(element => element.completado === !completado);
  }

}
