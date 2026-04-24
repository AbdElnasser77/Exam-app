import { Component, Input } from '@angular/core';
import { LucideAngularModule, LucideIconData } from "lucide-angular";

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Input() icon!:LucideIconData;
  @Input() additional:string = "";
}
