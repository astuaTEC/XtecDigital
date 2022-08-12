import { EstudianteGrupo } from 'src/app/modelos/administrador/estudiante-grupo';
import { ProfesorGrupo } from 'src/app/modelos/administrador/profesor-grupo';

export class Grupo {
numero: number;
codigoCurso: string;
periodo: string;
anio: string;
estudianteGrupos: EstudianteGrupo[];
profesorGrupos: ProfesorGrupo[];
}
