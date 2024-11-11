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
  coleccionProductos: Producto[] = [];
  productosFiltrados: Producto[] = [];

  productoSeleccionado!: Producto; // ! <- tomar valores vacíos

  producto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required)
  })

  constructor(public servicioCrud: CrudService) { }

  ngOnInit(): void {
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto;
      this.filtrar();
    }) 
  }

  @Input() filter: string = 'todo'; // Valor por defecto es 'Todo'

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filter']) {
      this.filtrar();
    }
  }

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
