import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { RegistroPacienteDTO } from 'src/app/modelo/registro-paciente-dto';
import { AuthService } from 'src/app/servicios/auth.service';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { ImagenService } from 'src/app/servicios/imagen.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
subirImagen1() {
throw new Error('Method not implemented.');
}
  registroPacienteDTO: RegistroPacienteDTO;
  ciudades: string[];
  tiposSangre: string[];
  epsOptions: string[];
  archivos!: FileList;
  usuario: string[];
alerta!: Alerta;
  private imagenService!: ImagenService;

  constructor(private authService: AuthService, private clinicaService: ClinicaService) {
    this.registroPacienteDTO = new RegistroPacienteDTO();
    this.ciudades = [];
    this.usuario = [];
    this.tiposSangre = [];
    this.epsOptions = [];

    this.cargarCiudades();
    this.cargarTiposSangre();
    this.cargarEpsOptions();
  }

  private cargarCiudades() {
    this.clinicaService.listarCiudades().subscribe({
    next: data => {
    this.ciudades = data.respuesta;
    },
    error: error => {
    console.log(error);
    }
    });
    }

  private cargarTiposSangre() {
    this.tiposSangre.push("A+");
    this.tiposSangre.push("B+");
    this.tiposSangre.push("AB+");
    this.tiposSangre.push("O+");
    this.tiposSangre.push("A-");
    this.tiposSangre.push("B-");
    this.tiposSangre.push("AB-");
    this.tiposSangre.push("O-");
  }

  private cargarEpsOptions() {
    this.epsOptions.push("Sura");
    this.epsOptions.push("Coomeva");
    this.epsOptions.push("Sanitas");
    // Agrega más opciones según sea necesario
  }

  registrar() {
    console.log(this.registroPacienteDTO);
  }

  sonIguales(): boolean {
    return this.registroPacienteDTO.password == this.registroPacienteDTO.confirmaPassword;
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
    this.registroPacienteDTO.urlFoto = event.target.files[0].name;
    this.archivos = event.target.files;
    }
    }
  public registrar1(){

    if (this.registroPacienteDTO.urlFoto.length != 0){
  this.authService.registrar(this.usuario).subscribe({
    next: (data: { respuesta: any; }) => {
    this.alerta = { mensaje: data.respuesta, tipo: "success" };
    },
    error: (error: { error: { respuesta: any; }; }) => {
    this.alerta = { mensaje: error.error.respuesta, tipo: "danger" };
    }
    });
    }else{
    this.alerta = { mensaje: "Debe subir una imagen", tipo: "danger" };
    }
    }

    public subirImagen() {
      if (this.archivos != null && this.archivos.length > 0) {
      const formData = new FormData();
      formData.append('file', this.archivos[0]);
      this.imagenService.subir(formData).subscribe({
      next: data => {
      this.registroPacienteDTO.urlFoto = data.respuesta.url;
      },
      error: error => {
      this.alerta = { mensaje: error.error, tipo: "danger" };
      }
      });
      } else {
      this.alerta = { mensaje: 'Debe seleccionar una imagen y subirla', tipo: "danger" };
      }
      }
}
