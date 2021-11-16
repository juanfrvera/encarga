export class Item {
    id: string;
    titulo: string;
    precio?: number;
    descripcion?: string;

    constructor(
        id: string, titulo: string, precio?: number, descripcion?: string){
            this.id = id;
            this.titulo = titulo;
            this.precio = precio;
            this.descripcion = descripcion;
    }
}
