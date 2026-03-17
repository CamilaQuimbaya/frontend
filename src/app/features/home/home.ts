import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotesService, Note } from './home.service';

@Component({
    selector:'app-home',
    standalone:true,
    imports:[CommonModule, FormsModule, HttpClientModule],
    templateUrl:'./home.html',
    styleUrl:'./home.css'
})

export class Home implements OnInit{
    notas: Note[] = [];
    loading: boolean = false;
    errormensaje: string = '';
    isEditing:boolean = false;
    selectNoteId:string | null = null;

    form = {
        titulo:'',
        descripcion:''
    }

    constructor(private notesService: NotesService){}

    ngOnInit():void{
        this.loadNotes();
    }


    loadNotes():void{
        this.loading = true;
        this.errormensaje = '';
        this.notesService.getNotes().subscribe({
            next: (data) => {
                this.notas = data.sort(
                    (a,b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
                );
                console.log(this.notas);
                this.loading = false;
            },
            error: (err) => {
                console.error(err);
                this.errormensaje = "Error al cargar las notas";
                this.loading = false;
            }
        })
    }

    resetForm():void{
       this.form = {
            titulo:'',
            descripcion:''
       };
        this.isEditing = false;
        this.selectNoteId = null;
    }

    submitForm():void{
        const titulo = this.form.titulo.trim();
        const descripcion = this.form.descripcion.trim();

        if(!titulo || !descripcion){
            this.errormensaje = "Todos los campos son obligatorios";
            return;
        }

        if(this.isEditing && this.selectNoteId){
            this.notesService.updateNote(this.selectNoteId, {titulo, descripcion}).subscribe({
                next: () => {
                    this.resetForm();
                    this.loadNotes();
                },
                error: (err) => {
                    console.error(err);
                    this.errormensaje = "Error al actualizar la nota";
                }
            })
        }else{
            this.notesService.createNote({titulo, descripcion}).subscribe({
                next: () => {
                    this.resetForm();
                    this.loadNotes();
                },
                error: (err) => {
                    console.error(err);
                    this.errormensaje = "Error al crear la nota";
                }
            })
        }
    }


    editNote(nota: Note):void{
        this.isEditing = true;
        this.selectNoteId = nota._id
        this.form={
            titulo:nota.titulo,
            descripcion:nota.descripcion
        }

        window.scrollTo({top:0, behavior:'smooth'});
    }

    cancelEdit():void{
        this.resetForm();
    }

    deleteNote(id:string):void{
        const confirmDelete = confirm("¿Estás seguro de que deseas eliminar esta nota?");
        if(!confirmDelete) return;

        this.notesService.deleteNote(id).subscribe({
            next:() => {
                this.notas = this.notas.filter((n) => n._id !== id)
            },
            error:(err) => {
                console.error(err);
                this.errormensaje = "Error al eliminar la nota";
            }
        })
    }
}