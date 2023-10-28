import { Component } from '@angular/core';
import { RegistroPacienteDTO } from 'src/app/modelo/registro-paciente-dto';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroPacienteDTO: RegistroPacienteDTO;
  ciudades: string[];
  tiposSangre: string[];
  epsOptions: string[];
  archivos!: FileList;

  constructor() {
    this.registroPacienteDTO = new RegistroPacienteDTO();
    this.ciudades = [];
    this.tiposSangre = [];
    this.epsOptions = [];

    this.cargarCiudades();
    this.cargarTiposSangre();
    this.cargarEpsOptions();
  }

  private cargarCiudades() {
    this.ciudades.push("Armenia");
    this.ciudades.push("Calarcá");
    this.ciudades.push("Pereira");
    this.ciudades.push("Manizales");
    this.ciudades.push("Medellín");
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
      this.archivos = event.target.files;
      console.log(this.archivos);
    }
  }

  public registrar1() {
    if (this.archivos != null && this.archivos.length > 0) {
      console.log(this.registroPacienteDTO);
    } else {
      console.log("Debe cargar una foto");
    }
  }
}
