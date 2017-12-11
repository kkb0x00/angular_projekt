import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.css']
})
export class MultiselectComponent implements OnInit {

  @Input() label: string;
  @Input() wartosci: string[];
  @Input() name: string;
  constructor() { }

  ngOnInit() {}

}
