import { Component } from '@angular/core';
import { Button } from "../../../../shared/components/ui/button/button";
import { ArrowLeft, LucideAngularModule, MoveLeft, MoveRight } from 'lucide-angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators,  } from '@angular/forms';
import { ValidationError } from "../../components/validation-error/validation-error";

@Component({
  selector: 'app-forgot-password',
  imports: [Button, LucideAngularModule, RouterLink, ReactiveFormsModule, ValidationError],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  readonly moveRight = MoveRight;
  emailForm!:FormGroup;
  
  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })

    console.log()
  }
  sendEmail() {
    if (this.emailForm.valid) {
      this.router.navigate(['/reset-password'],{
        queryParams:{email:this.emailForm.get('email')?.value}
      });
    }
  }
}
