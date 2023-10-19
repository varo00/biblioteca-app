/*
la contraseña no se guarda en los objetos de tipo usuario porque 
al utilizar firebase tengo la opcion de usar la parte de Authentication 
que por si solo me encripta las contraseñas y las guarda junto con el email
*/

export interface Usuario {
    nombre: string,
    apellidos: string,
    email: string,
    id:string, // identificador de autenticacion --> es el mismo que el uid en la parte de Authentication de Firebase
    doc?:string //el id del documento al que hace referencia el registro en firebase
}
