import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  coleccionProductos: Producto[] = [];

  /* ngOnInit(): void {
    this.coleccionProductos = [
      {
        idProducto: '1',
        nombre: 'Producto A',
        precio: 10.99,
        descripcion: 'Este es el producto A',
        categoria: 'Categoría 1',
        imagen: 'https://via.placeholder.com/150',
        alt: 'Imagen del producto A'
      },
      {
        idProducto: '2',
        nombre: 'Producto B',
        precio: 15.99,
        descripcion: 'Este es el producto B',
        categoria: 'Categoría 2',
        imagen: 'https://via.placeholder.com/150',
        alt: 'Imagen del producto B'
      },
      {
        idProducto: '3',
        nombre: 'Producto C',
        precio: 15.99,
        descripcion: 'Este es el producto B',
        categoria: 'Categoría 2',
        imagen: 'https://via.placeholder.com/150',
        alt: 'Imagen del producto B'
      },
      {
        idProducto: '4',
        nombre: 'Producto D',
        precio: 15.99,
        descripcion: 'Este es el producto B',
        categoria: 'Categoría 2',
        imagen: 'https://via.placeholder.com/150',
        alt: 'Imagen del producto B'
      }
    ];
  } */

}
