import { Estudiante } from "./estudiante";

export class Entregable {
    public constructor(
        public id: number,
        public idSubGrupo: number,
        public estudiantes: Estudiante[],
        public observaciones: string,
        public retroalimentacion: any,
        public calificacion: number,
        public drop: boolean
    ){}
}
