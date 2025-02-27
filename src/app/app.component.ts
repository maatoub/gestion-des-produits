import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  actions: Array<any> = [
    {
      title: "home",
      route: "/home",
      icon: "house"
    },
    {
      title: "New Product",
      route: "/newProduct",
      icon: "safe"
    },
    {
      title: "Products",
      route: "/products",
      icon: "search"
    },
  ];
  currentAction: any;
  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}
