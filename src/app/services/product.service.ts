import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../Types/product-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProducts(keyword: string = "", page: number = 1, size: number = 4) {
    return this.http.get<Product[]>(`http://localhost:8888/products?name_like=${keyword}&_page=${page}&_limit=${size}`, { observe: 'response' });
  }

  public checkProduct(product: Product): Observable<Product> {
    return this.http.patch<Product>(`http://localhost:8888/products/${product.id}`,
      { checked: !product.checked });
  }

  public deleteProduct(product: Product) {
    return this.http.delete<any>(`http://localhost:8888/products/${product.id}`);
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`http://localhost:8888/products`,
      product);
  }

  editProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`http://localhost:8888/products/${product.id}`,
      product);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:8888/products/${productId}`)
  }

  // public searchProducts(keyword: string, page: number, size: number): Observable<Array<Product>> {
  //   return this.http.get<Array<Product>>(`http://localhost:8888/products?name_like=${keyword}&_page=${page}&_limit=${size}`);
  // }

}
