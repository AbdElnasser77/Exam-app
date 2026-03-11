import { Component } from '@angular/core';
import { Button } from "../../../../shared/components/ui/button/button";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-password',
  imports: [Button,RouterLink],
  templateUrl: './create-password.html',
  styleUrl: './create-password.scss',
})
export class CreatePassword {

}
