import {TestBed} from '@angular/core/testing';
import { NotesService } from './home.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('Notes Service', () => {
    let service: NotesService
    let httpMock: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [NotesService]
        })

        service = TestBed.inject(NotesService)
        httpMock = TestBed.inject(HttpTestingController)
    });


    afterEach(() => {
        httpMock.verify()
    })


    it('deberia obtener las notas (GET)', () => {
        const NotasFalsas = [
            {_id:'1', titulo: 'Nota 1', descripcion: 'Descripción de la nota 1', fecha: '2024-06-01'},
        ];

        service.getNotes().subscribe(notes => {
            expect(notes.length).toBe(1);
            expect(notes).toEqual(NotasFalsas)
        });

        const req =  httpMock.expectOne('http://localhost:3000/api/notas');
        expect(req.request.method).toBe('GET');

        req.flush(NotasFalsas)
    })
})