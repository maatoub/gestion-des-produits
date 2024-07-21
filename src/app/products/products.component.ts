import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../Types/product-type';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  public products: Array<Product> = [];
  public keyword: string = "";
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 4
  constructor(private productService: ProductService, private router: Router) {
  }
  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts(this.keyword, this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.products = data.body as Product[];
        let totalProducts: number = parseInt(data.headers.get('x-total-count')!);
        this.totalPages = Math.floor(totalProducts / this.pageSize);
        if (totalProducts % this.pageSize != 0) {
          this.totalPages = this.totalPages + 1
        }
      },
      error: err => console.log(err)
    })

    // this.products = this.productService.getProducts();
  }



  handleCheckProduct(product: any) {
    this.productService.checkProduct(product)
      .subscribe({
        next: productUpdated => {
          product.checked = !product.checked
        },
        error: err => console.log(err)
      });
  }

  handleDelete(product: Product) {
    if (confirm("Etes vous sûre?"))
      this.productService.deleteProduct(product).subscribe({
        next: value => {

          this.products = this.products.filter(p => p.id != product.id);
        }
      })
  }

  searchProducts() {
    this.currentPage = 1;
    this.pageSize = 4;
    this.getProducts();
  }

  handleGoToPage(page: number) {
    this.currentPage = page;
    this.getProducts();
  }

  handleUpdate(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`)
  }
}
