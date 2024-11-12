import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  // Definimos colección para los productos de la web
  private productosCollection: AngularFirestoreCollection<Producto>

  private usuariosCollection: AngularFirestoreCollection<Usuario>

  constructor(private database: AngularFirestore) {
    this.productosCollection = database.collection('producto');
    this.usuariosCollection = database.collection('usuarios')
  }

  // CREAR productos
  crearProducto(producto: Producto){
    return new Promise(async(resolve, reject) => {
      try{
        // Creamos número identificativo para el producto en la base de datos
        const idProducto = this.database.createId();

        // Asignamos ID creado al atributo idProducto de la interfaz Producto
        producto.idProducto = idProducto;

        const resultado = await this.productosCollection.doc(idProducto).set(producto);

        resolve(resultado);
      } catch (error){
        reject(error);
      }
    })
  }

  // OBTENER productos
  obtenerProducto(){
    /*
      snapshotChanges => toma captura del estado de los datos
      pipe => tuberías que retornan un nuevo arreglo
      map => "mapea" o recorre esa nueva información
      a => resguarda la nueva información y la envía como un documento 
    */
    return this.productosCollection.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())))
  }

  // EDITAR productos
  modificarProducto(idProducto: string, nuevaData: Producto){
    /*
      Accedemos a la colección "productos" de la Base de Datos, buscamos el ID del 
      producto seleccionado y lo actualizamos con el método "update", enviando la 
      nueva información
    */
    return this.database.collection('producto').doc(idProducto).update(nuevaData);
  }

  // ELIMINAR productos
  eliminarProducto(idProducto: string){
    return new Promise((resolve, reject) => {
      try{
        const respuesta = this.productosCollection.doc(idProducto).delete();

        resolve (respuesta);
      }
      catch(error){
        reject (error);
      }
    })
  }



/*
  Función para crear usuarios desde administración
*/


  crearUsuario(usuario: Usuario){
    return new Promise(async(res,rej) => {
      try{
        // Genera un ID para el usuario
        const idUsuario = this.database.createId();

        // Lo asigna a UID
        usuario.uid = idUsuario;

        // Agrega el usuario a firestore
        const resultado = await this.usuariosCollection.doc(idUsuario).set(usuario)

        res(resultado)
      }
      catch(error){
        rej(error)
      }
    })
  }

  // CRUD -> Función para obtener un usuario
  /*
    snapshotChanges -> Toma captura del estado de los datos
    pipe -> funciona como tuberia, retorna el nuevo arreglo
    map -> "mapea" o recorre esa nueva información
    a -> resguarda la nueva información y la envia
  */
  obtenerUsuario(){
    return this.usuariosCollection.snapshotChanges().pipe(map(Action => Action.map(a => a.payload.doc.data())))
  }

  // CRUD -> Función para editar un usuario
  modificarUsuario(uid: string, nuevaData: Usuario){
    // Actualiza los datos del usuario en la colección con la funcion .update
    return this.database.collection('usuarios').doc(uid).update(nuevaData);
  }
  
  // CRUD -> Función para eliminar un usuario
  eliminarUsuario(uid: string){
    return new Promise((resolve, reject) => {
      try{
        // Elimina un usuario por el ID utilizando el metodo .delete
        const resp = this.usuariosCollection.doc(uid).delete()
        resolve(resp)
      }
      catch(error){
        reject(error)
      }
    })
  }
}