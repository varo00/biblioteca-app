export interface Libro{
    autor       : string,
    titulo      : string,
    imagen      : string,
    leido       : boolean,
    comentario  : string,
    doc         ?:string //el id del documento al que hace referencia el registro en firebase no es necesario al crear uno porque este campo me lo traigo de la base de datos
}