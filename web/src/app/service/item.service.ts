import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  //Datos falsos
  public promos = {
    titulo: 'Promos',
    items: [
      {
        id: "1",
        title: "Choripan",
        description: "Chorizo, salsa a eleccion",
        price: 200
      },
      {
        id: "2",
        title: "Docena de empanadas surtidas",
        description: "carne, pollo, verdura",
        price: 300
      },
      {
        id: "3",
        title: "2 Muzzas + 1 docena de empanadas",
        description: "jamon y queso, pollo o verdura",
        price: 600
      },
      {
        id: "4",
        title: "2 Muzzas + 1 Especial",
        price: 500
      },
    ]
  }
  public pizzas = {

    titulo: "Pizzas",
    items:
      [
        {
          id: "5",
          title: "Muzzarella",
          description: "muzarrella, salsa, oregano",
          price: 200
        },
        {
          id: "6",
          title: "Fugazzetta",
          description: "muzarrella, salsa, cebolla grillada",
          price: 320
        },
        {
          id: "7",
          title: "Pepperoni",
          description: "muzarrella, salsa, salame milan",
          price: 400
        },
        {
          id: "8",
          title: "Rellena",
          description: "rellena con jamon y queso, exterior muzarrella y tomate",
          price: 600
        }
      ]
  }

  public minutas = {
    titulo: "Minutas",
    items:
      [
        {
          id: "9",
          title: "Sandwich de miga",
          description: "jamon y queso, mayonesa",
          price: 200
        },
        {
          id: "10",
          title: "Sandwich de milanesa",
          description: "milanesa de ternera, lechuga, tomate, jamon y queso",
          price: 320
        },
        {
          id: "11",
          title: "Hamburguesa completa",
          description: "hamburguesa de ternera, lechuga, tomate, jamon y queso",
          price: 400
        },
        {
          id: "12",
          title: "Milanesa napolitana",
          description: "milanesa de ternera, tomate, jamon y queso",
          price: 600
        }
      ]
  }

  public empanadas = {
    titulo: "Empanadas",
    items:
      [
        {
          id: "13",
          title: "Jamon y queso",
          price: 100
        },
        {
          id: "14",
          title: "Carne",
          price: 100
        },
        {
          id: "15",
          title: "Verdura",
          price: 100
        },
        {
          id: "16",
          title: "Pollo",
          price: 100
        }
      ]
  }

  public bebidas = {
    titulo: "Bebidas",
    items:
      [
        {
          id: "17",
          title: "Gaseosa chica",
          price: 100
        },
        {
          id: "18",
          title: "Gaseosa grande",
          price: 200
        },
        {
          id: "19",
          title: "Agua chica",
          price: 100
        },
        {
          id: "20",
          title: "Agua saborizada",
          price: 200
        },
        {
          id: "21",
          title: "Exprimido de naranja",
          price: 200
        }
      ]
  }


  private get Items() {
    return [...this.promos.items, ...this.pizzas.items, ...this.minutas.items, ...this.empanadas.items, ...this.bebidas.items];
  }

  /**Obtiene la lista de categorias */
  public get Categorias() {
    return [this.promos, this.pizzas, this.minutas, this.empanadas, this.bebidas]
  }

  constructor() { }

  public getItems(itemIds?: string[]) {
    if (itemIds)
      return this.Items.filter(item => itemIds.includes(item.id));
    else return this.Items;
  }

}
