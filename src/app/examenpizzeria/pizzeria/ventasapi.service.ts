import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ventasBas } from "./ventasBas"; // Asegúrate de que el nombre del archivo donde guardaste la interfaz sea este

@Injectable({
    providedIn: 'root'
})
export class ProyectoapiService {
    
    private apiUrl = 'http://127.0.0.1:5000/api/pizzeria';

    constructor(private http: HttpClient) { }

    public getVentas(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    agregarNuevaVenta(datos: any) {
        return this.http.post(`${this.apiUrl}/`, datos);
    }

    public getVenta(idventa: string): Observable<any> {
        console.log("idventa " + idventa);
        return this.http.get<any>(`${this.apiUrl}/${idventa}`);
    }

    modificarVenta(idventa: number, datos: ventasBas) {
        return this.http.put(`${this.apiUrl}/${idventa}`, datos);
    }

    ActualizarVenta(idventa: number, datosActualizados: any) {
    // Usamos la ruta directa en lugar de this.baseUrl
        return this.http.put(`http://127.0.0.1:5000/api/pizzeria/${idventa}`, datosActualizados);
  }
    public EliminaVenta(idventa: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${idventa}`);
    }

    // --- MÉTODOS EXTRAS REQUERIDOS PARA LA PIZZERÍA ---

    public getDetalleVenta(idventa: string | number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/detalle/${idventa}`);
    }

    public consultarVentas(tipo: string, valor: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/consulta/${tipo}/${valor}`);
    }
}