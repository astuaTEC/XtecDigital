import { Grupo } from './grupo';

export class AnioContenedor {
    public constructor(
        public anio: string,
        public periodo: string,
        public grupos: Grupo[] 
    ){

    }
}
