import { Estudiante } from './estudiante';

export class Evaluacion {
    public constructor(
        public nombre: string,
        public porcentaje: number,
        public fechaHoraEntrega: string,
        public participacion: string,

    ){}
}
