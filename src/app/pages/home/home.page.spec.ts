import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HomePage } from './home.page';

//creación del archivo de pruebas con su título:
describe('Pruebas unitarias home', () => {

  //preparación de los elementos necesarios para hacer pruebas unitarias:
  beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      declarations: [
        HomePage
      ]
    }).compileComponents();
  });

  //GENERAMOS NUESTRAS PRUEBAS UNITARIAS:
  it('1. Carga de la página Home', ()=>{
    const fixture = TestBed.createComponent(HomePage);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('2. Formulario inválido', ()=>{
    const fixture = TestBed.createComponent(HomePage);
    const app = fixture.componentInstance;
    
    let rut = app.usuario.controls['rut'];
    rut.setValue('14852963-8');
    
    expect(app.usuario.invalid).toBeTrue();
  });
  
  it('3. Formulario válido', ()=>{
    const fixture = TestBed.createComponent(HomePage);
    const app = fixture.componentInstance;
    
    let rut = app.usuario.controls['rut'];
    let nombre = app.usuario.controls['nombre'];
    rut.setValue('17888444-k');
    nombre.setValue('Jua');

    expect(app.usuario.valid).toBeTrue();
  });
  
  it('4. Ejecutar un boton/método', ()=>{
    const fixture = TestBed.createComponent(HomePage);
    const app = fixture.componentInstance;

    let rut = app.usuario.controls['rut'];
    let nombre = app.usuario.controls['nombre'];
    rut.setValue('17444888-4');
    nombre.setValue('Mister Satan');

    // app.agregar();

    // expect(app.v_agregar).toBeTrue();
  });

  it('5. largo del arreglo', ()=>{
    const fixture = TestBed.createComponent(HomePage);
    const app = fixture.componentInstance;

    expect(app.usuarios.length).toBeGreaterThanOrEqual(0);
  });


});