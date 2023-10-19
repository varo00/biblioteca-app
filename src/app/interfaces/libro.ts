export interface Libro{
    usuario: string,
    autor: string,
    titulo: string,
    imagen: string,
    leido: boolean,
    comentario: string,
    doc?:string //el id del documento al que hace referencia el registro en firebase
}