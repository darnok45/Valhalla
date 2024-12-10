import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/modules/admin/services/crud.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnChanges{
  // Colección local para almacenar productos obtenidos desde el servicio
  coleccionProductos: Producto[] = [];

  // Lista de productos filtrados que se mostrarán en la vista
  productosFiltrados: Producto[] = [];

  // Producto actualmente seleccionado
  productoSeleccionado!: Producto; // ! <- tomar valores vacíos

  // Formulario para manejar los datos de un producto
  producto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required)
  })

  // Importamos el servicio crud
  constructor(public servicioCrud: CrudService) { }

  // Método que se ejecuta al iniciar el componente
  ngOnInit(): void {
    // Suscripción al servicio crud para obtener la lista de productos
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto; // Almacena la lista completa de productos
      this.filtrar(); // Llama a la función para aplicar el filtro inicial
    }) 
  }


  @Input() filter: string = 'todo';   // Filtro inicial con el valor por defecto 'todo'

  // Detecta cambios en las propiedades de entrada del componente
  ngOnChanges(changes: SimpleChanges) {
    if (changes['filter']) { // Verifica si el filtro cambió
      this.filtrar(); // Aplica el filtro actualizado
    }
  }

  // Filtra los productos según la categoria seleccionada
  filtrar() {
    if (this.filter === 'todo') {
      // Mostrar todos los productos
      this.productosFiltrados = this.coleccionProductos;
    } else {
      // Filtra los productos por categoría según `filter`
      this.productosFiltrados = this.coleccionProductos.filter(
        producto => producto.categoria === this.filter
      );
    }
  }
}
