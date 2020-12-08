import { Estudiante } from './estudiante';

export class Evaluacion {
    public constructor(
        public nombre: string,
        public porcentaje: number,
        public fechaEntrega: string,
        public horaEntrega: string,
        public especificacion: any,
        public participacion: string,
        public nombreEspecificacion: string,
        public grupos: Estudiante[]
    ){}
}
