import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  links: string[];
  activeLink: string;
  constructor() { }

  ngOnInit(): void {
    this.links = ['Create', 'Show'];
    this.activeLink = this.links[0];
  }

}
