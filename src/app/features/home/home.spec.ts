import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Home } from "./home";
import { NotesService } from "./home.service";
import { of, throwError } from "rxjs";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";


describe('Home Component', () => {
    let component: Home;
    let fixture: ComponentFixture<Home>;
    let mockService: jasmine.SpyObj<NotesService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('NotesService', ['getNotes', 'createNote', 'updateNote', 'deleteNote']);

    await TestBed.configureTestingModule({
      imports: [Home, FormsModule, HttpClientModule],
      providers: [
        { provide: NotesService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
  });

  it('Deberia cargar notas al iniciar', () => { 
        const mockNotas = [
            {_id:'1', titulo: 'Nota 1', descripcion: 'Descripción de la nota 1', fecha: '2024-06-01'},
        ]

        mockService.getNotes.and.returnValue(of(mockNotas));

        component.ngOnInit();

        expect(component.notas.length).toBe(1);
  })
})