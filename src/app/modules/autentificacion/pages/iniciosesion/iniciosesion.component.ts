import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from '../../services/auth.service';
import {FirestoreService} from 'src/app/modules/shared/services/firestore.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent {
hide = true
constructor(
  public servicioAuth: AuthService,
  public servicioFirestore: FirestoreService,
  public servicioRutas: Router
) { }

// ############################# INGRESADO
// Definimos la interfaz de usuario
usuarios: Usuario = {
  uid: '',
  nombre: '',
  apellido: '',
  email: '',
  rol: '',
  password: ''
}

// Función para iniciar sesión
async iniciarSesion() {
  const credenciales = {
    email: this.usuarios.email,
    password: this.usuarios.password
  }

  try {
    // obtenemos usuario de la Base de Datos
    const usuarioBD = await this.servicioAuth.obtenerUsuario(credenciales.email);

    // Condicional verificada que ese usuario de la BD existiera o que sea igual al de nuestra colección
    if (!usuarioBD || usuarioBD.empty) {
      Swal.fire({
        title: "¡Oh no!",
        text: "Correo electrónico no registrado",
        icon: "error"
      });
      this.limpiarInputs();
      return;
    }

    // Vinculaba al primer documento de la colección "usuarios" que se obtenía desde la BD
    const usuarioDoc = usuarioBD.docs[0];

    /*
      Extrae los datos del documento en forma de "objeto" y se específica que va a ser del 
      tipo "Usuario" (se refiere a la interfaz Usuario de nuestros modelos)
    */
    const usuarioData = usuarioDoc.data() as Usuario;
    console.log(usuarioData.rol)

    // Encripta la contraseña que el usuario envía mediante "Iniciar Sesión"
    const hashedPassword = CryptoJS.SHA256(credenciales.password).toString();

    /*
      Condicional que compara la contraseña que acabamos de encriptar y que el usurio 
      envío con la que recibimos del "usuarioData"
    */
    if (hashedPassword !== usuarioData.password) {
      Swal.fire({
        title: "¡Oh no!",
        text: "Contraseña incorrecta",
        icon: "error"
      });

      this.usuarios.password = '';
      return;
    }

    // Intenta iniciar sesión con las credenciales proporcionadas
    const res = await this.servicioAuth.iniciarSesion(credenciales.email, credenciales.password)
      .then(res => {
        // Alerta de éxito si se cumple el inicio de sesión
        Swal.fire({
          title: "¡Buen trabajo!",
          text: "¡Se pudo ingresar con éxito :)!",
          icon: "success"
        });
        // Guarda el rol en un almacenamiento local si el usuario es admin
        if(usuarioData.rol == "admin"){
          localStorage.setItem("rol", "admin")
        }
        // Marca al usuario como conectado
        localStorage.setItem("connected", "yes")
        // Navega a la pagina de inicio
        this.servicioRutas.navigate(['/inicio']); 
      })
      .catch(err => {
        // Alerta de error si hay algun problema al iniciar sesion
        Swal.fire({
          title: "¡Oh no!",
          text: "Hubo un problema al iniciar sesión :( " + err,
          icon: "error"
        });

        this.limpiarInputs();
      })
  } catch(error){
    // Captura cualquier otro error inesperado
    this.limpiarInputs();
  }
}

// Función para limpiar los inputs
limpiarInputs() {
  const inputs = {
    email: this.usuarios.email = '',
    password: this.usuarios.password = ''
  }
}
}
