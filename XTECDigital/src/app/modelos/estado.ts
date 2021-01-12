import { Estudiante } from "../Vistas/Profesor/ModelosProfesor/estudiante";

export class Estado {
    public constructor(
        public codigoCurso: string,
        public nombreGrupo: string,
        public numeroGrupo: number,
        public anio: string,
        public periodo: string,
        public numeroCedula: string,
        public estudiantes: Estudiante[],
        public nombreProfesor: string
    ){}
}
