import { Evaluacion } from './evaluacion';

export class EvaluacionContenedor {
    public constructor(
        public nombre: string,
        public porcentaje: number,
        public mostrar: boolean,
        public agregarActivado: boolean,
        public nombreNuevaEvaluacion: string,
        public evaluaciones: Evaluacion[]
    ){}
}
