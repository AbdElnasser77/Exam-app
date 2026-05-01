import { Component } from '@angular/core';
import { Password } from "primeng/password";
import { ValidationError } from "../../auth/components/validation-error/validation-error";
import { Button } from "../../../shared/components/ui/button/button";

@Component({
  selector: 'app-change-password',
  imports: [Password, ValidationError, Button],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss',
})
export class ChangePassword {



  changePassword(){
    
  }
}
