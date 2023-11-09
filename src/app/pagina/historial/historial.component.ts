// historial-medico.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-historial-medico',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialMedicoComponent {
  historial: any[] = [
    { fecha: '2023-11-01', diagnostico: 'Fiebre, gripe', imagen: 'enlace_a_imagen' },
    { fecha: '2023-10-20', diagnostico: 'Dolor de cabeza', imagen: 'enlace_a_imagen' },
    { fecha: '2023-09-15', diagnostico: 'Presión arterial alta', imagen: 'enlace_a_imagen' },
    // ...otros registros de historial
  ];
}
