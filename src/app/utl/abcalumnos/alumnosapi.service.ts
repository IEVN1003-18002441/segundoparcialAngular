import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlumnosUTL } from "./alumnosUTL";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProyectoapiService {
    constructor(private http: HttpClient) { }

    public getAlumnos(): Observable<any> {
        return this.http.get<any>('http://127.0.0.1:5000/api/alumnos');
    }

  agregarNuevoAlumno(datos: any) {
        // Agrega la diagonal (/) al final de 'alumnos/'
        return this.http.post('http://127.0.0.1:5000/api/alumnos/', datos);
    }

    // --- MÉTODOS AGREGADOS Y ADAPTADOS A TU BASE ---

    public getAlumno(mat: string): Observable<any> {
        console.log("matricula" + mat);
        return this.http.get<any>(`http://127.0.0.1:5000/api/alumnos/${mat}`);
    }

    modificarAlumno(mat: number, datos: AlumnosUTL) {
        return this.http.put('http://127.0.0.1:5000/api/alumnos/' + mat, datos);
    }

    public EliminaAlumno(mat: number): Observable<AlumnosUTL> {
        return this.http.delete<AlumnosUTL>('http://127.0.0.1:5000/api/alumnos/' + mat);
    }
}