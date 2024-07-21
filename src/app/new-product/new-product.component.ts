import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../Types/product-type';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit {

  public productForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private router: Router) {

  }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: this.fb.control("", Validators.required),
      price: this.fb.control(0, Validators.min(1)),
      checked: this.fb.control(false),
    });
  }

  saveProduct() {
    let product: Product = this.productForm.value;
    this.productService.saveProduct(product).subscribe(
      {
        next: saved => {
          this.router.navigate(['/products'])
        },
        error: err => console.log(err)
      });
  }
}
