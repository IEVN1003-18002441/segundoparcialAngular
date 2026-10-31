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

    agregarNuevoAlumno(datos: AlumnosUTL) {
        return this.http.post('http://127.0.0.1:5000/api/alumnos', datos);
    }
}