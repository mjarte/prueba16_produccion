import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit {
  products: Product[] = [];

  isLoading: boolean = false;
  hasLoadedOnce: boolean = false;

  modalRef: NgbModalRef | null = null;
  productForm!: FormGroup;
  productToEdit: Product | null = null;

  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {

    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.required, Validators.min(1)]),
      stock: new FormControl(0, [Validators.required, Validators.min(0)])
    });
  }


  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
        this.hasLoadedOnce = true;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.isLoading = false;
        this.hasLoadedOnce = true;
      }
    });
  }


  loadDataOnClick(): void {
    this.loadProducts();
  }

  deleteProduct(id: number): void {
    const confirmacion = confirm('¿Estás seguro de que quieres eliminar este producto?');
    if (!confirmacion) { return; }

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: (err) => {
        console.error('Error al eliminar el producto:', err);
      }
    });
  }

  get f() { return this.productForm.controls; }
  get modalTitle() { return this.productToEdit ? 'Editar Producto' : 'Agregar Nuevo Producto'; }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formData = this.productForm.value;

    if (this.productToEdit) {
      const updatedProduct = { ...formData, id: this.productToEdit.id };
      this.productService.updateProduct(updatedProduct).subscribe({
        next: () => {
          this.modalRef?.close();
          this.loadProducts();
        },
        error: (err) => {
          console.error('Error al actualizar el producto:', err);
          alert('Hubo un error al actualizar el producto.');
        }
      });
    } else {
      this.productService.addProduct(formData).subscribe({
        next: () => {
          this.modalRef?.close();
          this.loadProducts();
        },
        error: (err) => {
          console.error('Error al agregar el producto:', err);
          alert('Hubo un error al agregar el producto.');
        }
      });
    }
  }

  openModal(content: TemplateRef<any>) {
    this.productToEdit = null;
    this.productForm.reset();
    this.modalRef = this.modalService.open(content, {
      centered: true,
      scrollable: true,
      size: 'lg'
    });
  }

  openModalForEdit(product: Product, content: TemplateRef<any>) {
    this.productToEdit = product;
    this.productForm.patchValue({
      name: product.name,
      price: product.price,
      stock: product.stock
    });
    this.modalRef = this.modalService.open(content, {
      centered: true,
      scrollable: true,
      size: 'lg'
    });
  }
}




