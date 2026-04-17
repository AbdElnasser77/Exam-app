import { Component, Input } from '@angular/core';
import { ChevronDown, LucideAngularModule, LucideIconData } from "lucide-angular";

@Component({
  selector: 'buttonComponent',
  imports: [LucideAngularModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  @Input() preset:'primary' |'primary_outline'| 'secondary' | 'success' = 'primary';
  @Input() icon?:LucideIconData;
  @Input() iconDir: 'l' | 'r' | 's' | 'e' = 'e';
  @Input() iconSize:number = 20;

  buttonClasses ={
    base:"w-full cursor-pointer shadow-xs font-medium transition duration-300 leading-5 rounded-base text-sm px-4 py-3 flex justify-center items-center",

    preset:{
      primary : " text-white bg-blue-700 border border-transparent hover:bg-blue-700/95",
      primary_outline:" text-black border border-blue-600 bg-blue-50 hover:bg-blue-100",
      secondary: "",
      success:"",
    }
  }
}
