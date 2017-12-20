import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  template: `
    <figure class="box-color-picker"></figure>
  `,
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
