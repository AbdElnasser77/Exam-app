import { ChevronDown } from 'lucide-angular';
import { DiplomasService } from './../../services/diplomas.service';
import { Component, inject, OnInit } from '@angular/core';
import { GraduationCap, LucideAngularModule } from 'lucide-angular';
import { Header } from '../../../../../shared/components/ui/header/header';
import { Diploma } from '../../models/diploma';

@Component({
  selector: 'app-diplomas-home',
  imports: [Header, LucideAngularModule],
  templateUrl: './diplomas-home.html',
  styleUrl: './diplomas-home.scss',
})
export class DiplomasHome implements OnInit {
  readonly GraduationCap = GraduationCap;
  readonly ChevronDown = ChevronDown;

  private readonly diplomasService = inject(DiplomasService);
  private token?: string;
  diplomas: Diploma[] = [];

  ngOnInit() {
    this.token = localStorage.getItem('token') ?? '';
    this.diplomasService.getDiplomas(this.token).subscribe({
      next: (res: any) => {
        this.diplomas = res.payload.data;
      },
    });
  }

  getExams(){

  }

}
