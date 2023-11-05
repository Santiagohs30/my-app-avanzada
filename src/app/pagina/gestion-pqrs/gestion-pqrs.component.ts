import { Component } from '@angular/core';
import { ItemPqrsdto } from 'src/app/modelo/item-pqrsdto';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';
@Component({
selector: 'app-gestion-pqrs',
templateUrl: './gestion-pqrs.component.html',
styleUrls: ['./gestion-pqrs.component.css']
})
export class GestionPqrsComponent {
pqrs: ItemPqrsdto[];

constructor(private pacienteService: PacienteService, private tokenService: TokenService) {
  this.pqrs = [];
  this.obtenerPqrs();
  }
  public obtenerPqrs() {
  let codigo = this.tokenService.getCodigo();
  this.pacienteService.listarPQRSPaciente(codigo).subscribe({
  next: data => {
  this.pqrs = data.respuesta;
  },
  error: error => {
  console.log(error);
  }
  });
  }
  }