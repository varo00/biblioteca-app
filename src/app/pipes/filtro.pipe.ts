import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(coleccion: any[], texto: string, columna:string): any[] {

    
    if(texto === ''){
      return coleccion;
    }else{
      texto = texto.toLowerCase().trim();

      return coleccion.filter(elem => {
        return elem[columna].toLowerCase().includes(texto);
      });
    }
  }

}
