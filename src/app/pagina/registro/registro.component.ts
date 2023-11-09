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
  alerta!: Alerta;

  registroPacienteDTO: RegistroPacienteDTO;
  ciudades: string[];
  eps: string[];
  tipoSangre: string[];

  //OJOOOOO

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

  private cargarEPS() {

    this.clinicaService.listarEPS().subscribe({
      next: data => {
        this.eps = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });

  }

  private cargarTipoSangre() {
    
    this.clinicaService.listarTipoSangre().subscribe({
      next: data => {
        this.tipoSangre = data.respuesta;
      },
      error: error => {
        console.log(error);
      }
    });

  }


  //private authService: AuthService

  constructor(private authService: AuthService,
    private clinicaService: ClinicaService, private imagenService: ImagenService) {

    this.registroPacienteDTO = new RegistroPacienteDTO();

    this.ciudades = [];
    this.cargarCiudades();

    this.eps = [];
    this.cargarEPS();

    this.tipoSangre = [];
    this.cargarTipoSangre();


  }

  archivos!: FileList;

  public registrar() {
    if (this.registroPacienteDTO.urlFoto.length != 0) {
      this.authService.registrarPaciente(this.registroPacienteDTO).subscribe({
        next: data => {
          alert("Registro Exitoso")
          console.log(data);
        },
        error: error => {
          console.log(error);
        }
      });
    } else {
      console.log("Debe subir una imagen");
    }

    // console.log(this.registroPacienteDTO);

    // if(this.archivos != null && this.archivos.length > 0){
    //   console.log(this.registroPacienteDTO);
    //   }else{
    //   console.log("Debe cargar una foto");
    //   } 
  }

  public sonIguales(): boolean {
    return this.registroPacienteDTO.password == this.registroPacienteDTO.confirmaPassword;
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.registroPacienteDTO.urlFoto = event.target.files[0].name;
      this.archivos = event.target.files;
    }
  }


  public subirImagen() {
    if (this.archivos != null && this.archivos.length > 0) {
      const formData = new FormData();
      formData.append('file', this.archivos[0]);
      this.imagenService.subir(formData).subscribe({
        next: data => {
          alert("Imagen Subida con Exito")
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

  /*public subirImagen() {
    if (this.archivos != null && this.archivos.length > 0) {
      const formData = new FormData();
      formData.append('file', this.archivos[0]);
      this.imagenService.subir(formData).subscribe({

        //OJOOOOOOO
        next: data => {
          this.registroPacienteDTO.urlFoto = data.respuesta.url;
        },
        error: data => {
          this.alerta = { mensaje: error.error, tipo: "danger" };
        }
      });
    } else {
      this.alerta = { mensaje: 'Debe seleccionar una imagen y subirla', tipo: "danger" };
    }
  }*/

}