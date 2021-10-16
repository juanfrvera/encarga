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

    /**
     * Verdadero si en ambos arrays están los mismos valores, sin importar el orden
     * @param array1 
     * @param array2 
     * @returns 
     */
    public static tienenLosMimosValores(array1: any[], array2: any[]) {
        if (
            !Array.isArray(array1)
            || !Array.isArray(array2)
            || array1.length !== array2.length
        ) {
            return false;
        }

        // .concat() to not mutate arguments
        const arr1 = array1.concat().sort();
        const arr2 = array2.concat().sort();

        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }

        return true;
    }
}
