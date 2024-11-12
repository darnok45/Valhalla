import { Component } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/modules/autentificacion/services/auth.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tableuser',
  templateUrl: './tableuser.component.html',
  styleUrls: ['./tableuser.component.css']
})
export class TableuserComponent {
// Creamos colección local de usuarios -> la definimos como array
coleccionUsuarios: Usuario[] = [];

usuarioSeleccionado!: Usuario; // ! <- tomar valores vacíos

modalVisibleUsuario: boolean = false;


usuarios: Usuario = {
  uid: '', // -> inicializamos con comillas simples porque es tipo STRING
  nombre: '',
  apellido: '',
  email: '',
  rol: '',
  password: ''
}

// Definimos formulario para los usuarios
/**
 * Atributos alfanuméricos (string) se inicializan con comillas simples
 * Atributos numéricos (number) se inicializan con cero ('0')
 */

usuario = new FormGroup({
  nombre: new FormControl('', Validators.required),
  apellido: new FormControl('', Validators.required),
  email: new FormControl('', Validators.required),
  rol: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required)
})

constructor(
  public servicioCrud: CrudService,
  public servicioAuth: AuthService,
  public servicioFirestore: FirestoreService
) { }

ngOnInit(): void {
  // subscribe -> método de notificación de cambios (observable)
  this.servicioCrud.obtenerUsuario().subscribe(usuario => {
    this.coleccionUsuarios = usuario;
  })
}

async agregarUsuario() {
  if (this.usuario.valid) {
    let nuevoUsuario: Usuario = {
      uid: '',
      nombre: this.usuario.value.nombre!,
      apellido: this.usuario.value.apellido!,
      email: this.usuario.value.email!,
      rol: this.usuario.value.rol!,
      password: this.usuario.value.password!
    }

    await this.servicioCrud.crearUsuario(nuevoUsuario)
      .then(usuario => {
        alert("Ha agregado un nuevo usuario con éxito.");

        // Resetea el formulario y las casillas quedan vacías
        this.usuario.reset();
      })
      .catch(error => {
        alert("Ha ocurrido un error al cargar un nuevo usuario.");

        this.usuario.reset();
      })
  }
}

// ELIMINAR USUARIOS
// función vinculada al modal y el botón de la tabla
mostrarBorrar(usuarioSeleccionado: Usuario){
  this.modalVisibleUsuario = true;

  this.usuarioSeleccionado = usuarioSeleccionado;
}

borrarUsuario(){
  this.servicioCrud.eliminarUsuario(this.usuarioSeleccionado.uid)
  .then(respuesta => {
    alert("Se ha eliminado con exito.");
  })
  .catch(error => {
    alert("Ha ocurrido un error al eliminar un usuario: \n"+error);
  })
}

// EDITAR USUARIOS
// Se envía y llama al momento que tocamos botón "Editar" de la tabla
mostrarEditar(usuarioSeleccionado: Usuario){
  this.usuarioSeleccionado = usuarioSeleccionado;
  /*
    Toma los valores del usuario seleccionado y los va a
    autocompletar en el formulario del modal (menos el ID)
  */
  this.usuario.setValue({
    nombre: usuarioSeleccionado.nombre,
    apellido: usuarioSeleccionado.apellido,
    email: usuarioSeleccionado.email,
    rol: usuarioSeleccionado.rol,
    password: usuarioSeleccionado.password
  })
}

// VINCULA A BOTÓN "editarUsuario" del modal de "Editar"
editarUsuario(){
  let datos: Usuario = {
    // Solo uId no se modifica por el usuario
    uid: this.usuarioSeleccionado.uid,
    /* Los demás atributos reciben nueva información/ 
    valor desde el formulario */
    nombre: this.usuario.value.nombre!,
    apellido: this.usuario.value.apellido!,
    email: this.usuario.value.email!,
    rol: this.usuario.value.rol!,
    password: this.usuario.value.password!
  }

  // Enviamos al método el id del usuario seleccionado y los datos actualizados
  this.servicioCrud.modificarUsuario(this.usuarioSeleccionado.uid, datos)
  .then(usuario => {
    alert("El usuario se ha modificado con éxito.");
  })
  .catch(error => {
    alert("Hubo un problema al modificar el usuario: \n"+error);
  })
  }

}
