export class Util {
    /** Devuelve una copia produnda del objeto */
    public static copiaProfunda<T>(objeto: T): T {
        return JSON.parse(JSON.stringify(objeto));
    }

    /** Elimina el item en la posición indicada del arreglo */
    public static eliminarEn(arreglo: any[], indice: number) {
        arreglo.splice(indice, 1);
    }

    /** Elimina el item del arreglo */
    public static eliminarItem<T>(arreglo: T[], item: T) {
        const indice = arreglo.indexOf(item);

        // Si fue encontrado en el arreglo
        if (indice !== -1) {
            this.eliminarEn(arreglo, indice);
        }
    }
}
