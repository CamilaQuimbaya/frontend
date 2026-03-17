import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"


export interface Note{
    _id: string;
    titulo:string;
    descripcion: string;
    fecha: string;
}

@Injectable({
    providedIn: "root"
})
export class NotesService{
    private apiUrl = "http://localhost:3000/api";

    constructor(private http:HttpClient){}

    getNotes(): Observable<Note[]>{
        return this.http.get<Note[]>(`${this.apiUrl}/notas`)
    }

    createNote(body:{titulo:string, descripcion:string}):Observable<Note>{
        return  this.http.post<Note>(`${this.apiUrl}/notas`, body)
    }

    updateNote(id:string, body:{titulo:string, descripcion:string}):Observable<Note>{
        return this.http.put<Note>(`${this.apiUrl}/notas/${id}`, body)
    }

    deleteNote(id:string):Observable<{msg:string}>{
        return this.http.delete<{msg:string}>(`${this.apiUrl}/notas/${id}`)
    }
}