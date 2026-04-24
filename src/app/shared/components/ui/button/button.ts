import { Component, Input } from '@angular/core';
import { ChevronDown, LucideAngularModule, LucideIconData } from "lucide-angular";

@Component({
  selector: 'buttonComponent',
  imports: [LucideAngularModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  @Input() preset: 'primary' | 'primary_outline' | 'secondary' | 'success' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() icon?: LucideIconData;
  @Input() iconDir: 'l' | 'r' | 's' | 'e' = 'e';
  @Input() iconSize: number = 20;
  @Input() width: "w-full" | "w-1/2" | "" = "w-full";
  @Input() additional:string = "";
  buttonClasses = {
    base: "cursor-pointer shadow-xs font-medium transition duration-300 leading-5 rounded-base text-sm flex justify-center items-center",

    size: {
      sm: "text-xs px-2 py-1",
      md: "text-sm px-4 py-2",
      lg: "text-base px-6 py-3",
      xl: "text-lg px-8 py-4"
    },


    preset: {
      primary: "text-white bg-blue-700 border border-transparent hover:bg-blue-700/95",
      primary_outline: "text-black border border-blue-600 bg-blue-50 hover:bg-blue-100",
      secondary: "text-gray-700 bg-gray-100 hover:bg-gray-200",
      success: "text-white bg-green-600 hover:bg-green-700",
    }
  }
}
