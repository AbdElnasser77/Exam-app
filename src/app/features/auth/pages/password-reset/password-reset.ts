import { Component } from '@angular/core';
import { LucideAngularModule, MoveLeft } from 'lucide-angular';
import { ActivatedRoute, RouterLink } from '@angular/router';


@Component({
  selector: 'app-password-reset',
  imports: [LucideAngularModule,RouterLink],
  templateUrl: './password-reset.html',
  styleUrl: './password-reset.scss',
})
export class PasswordReset {
  readonly moveLeft = MoveLeft;
  email!:string;
  
  constructor(private activatedRoute:ActivatedRoute){}

  ngOnInit(){
    this.activatedRoute.queryParams.subscribe(params =>{
      this.email = params['email'];
    })


  }



}
