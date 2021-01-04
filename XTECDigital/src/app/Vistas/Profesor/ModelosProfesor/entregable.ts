import { Estudiante } from "./estudiante";

export class Entregable {
    public constructor(
        public id: number,
        public idSubGrupo: number,
        public estudiantes: Estudiante[]
    ){}
}
