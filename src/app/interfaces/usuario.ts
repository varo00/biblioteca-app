/*
la contraseña no se guarda en los objetos de tipo usuario porque 
al utilizar firebase tengo la opcion de usar la parte de Authentication 
que por si solo me encripta las contraseñas y las guarda junto con el email
*/

export interface Usuario {
    nombre: string,
    apellidos: string,
    email: string,
    doc?:string, //clave del documento y uid del usuario autenticado
}
