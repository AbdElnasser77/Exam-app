import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'validation-error',
  imports: [],
  templateUrl: './validation-error.html',
  styleUrl: './validation-error.scss',
})
export class ValidationError {
 @Input() control?: AbstractControl | null;
@Input() InputLabel?:string;

}
