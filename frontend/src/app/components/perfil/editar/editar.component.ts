import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  @Input() params: any;
  constructor() { }

  ngOnInit(): void {
  }


}
