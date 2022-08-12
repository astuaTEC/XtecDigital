import { EMS } from "./ems";

export class ES {
    public constructor(
        public Id: number,
        public nombreEvaluacion: string,
        public nombreRubro: string,
        public numeroGrupo: number,
        public codigoCurso: string,
        public periodo: string,
        public anio: string,
        public estudianteSubgrupos: EMS[]
    ){}
}
