import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-iniciarclase',
  templateUrl: './iniciarclase.page.html',
  styleUrls: ['./iniciarclase.page.scss'],
})
export class IniciarclasePage implements OnInit {

  //VAMOS A CREAR LAS VARIABLES PARA NUESTRO CÓDIGO QR:
  elementType = 'canvas';
  value = '';

  clase: any;
  //variables para docentes
  docentes:any[]=[];
  docente: any;

  //variobles para clases
  clases: any[]=[];


  usuarios:any[]=[];

  asistencias:any[]=[];
  asistencia: any;
  rut: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private fireService:FireService){}

  async ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    this.listar();
    this.cargarClase();
  }

  //método para generar un código unico para el codigo QR:
  listar(){
    this.fireService.getDatos('usuarios').subscribe(
      (data:any) => {
        this.usuarios = [];
        for(let u of data){
          let usuarioJson = u.payload.doc.data();
          usuarioJson['id'] = u.payload.doc.id;
          this.usuarios.push(usuarioJson);
          this.docentes = this.usuarios.filter(u => u.tipo_usuario == 'profesor');
          //console.log(u.payload.doc.data());
        }
      }
    );
  }
  cargarClase(){
     this.fireService.obtenenAsignaturas('clases').subscribe(
      (data:any) => {
        this.clases = [];
        for(let c of data){
          let claseJson = c.payload.doc.data();
          claseJson['id'] = c.payload.doc.id;
          this.clases.push(claseJson);
          this.clases = this.clases.filter(c => c.docente == this.rut)
        }
      }
    );
  }

async generarCodigo(cod_class){
/*     this.clases = await this.userService.obtenerClaseDocente(this.KEY_CLASES, rut); */
    this.asistencia={
      cod_asistencia:'',
      cod_clase: cod_class,
      alumnos:[]
    }
    var respuesta = await this.fireService.agregarAsistencia('asistencia', this.asistencia);
    console.log(respuesta)
    this.asistencia.cod_asistencia=respuesta
    console.log(this.asistencia.cod_asistencia)
    this.clase.asistencia=respuesta
    this.fireService.modificar('clases',cod_class,this.clase)
    this.fireService.modificar('asistencia',respuesta,this.asistencia)
    if(respuesta){
      this.cargando('Creando asistencia...');
      this.cargarClase();
      if (this.value == '') {
        this.value = cod_class;
      }
      console.log(respuesta)
    }else{
      alert('la asistencia de hoy ya está creada!')
      console.log(respuesta)
      console.log(this.asistencia)
    }
  }

  async cargando(mensaje){
    const loading = await this.loadingCtrl.create({
      message: mensaje,
      duration: 1000
    });
    loading.present();
  }
}
