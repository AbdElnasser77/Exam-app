import { ChevronDown } from 'lucide-angular';
import { DiplomasService } from './../../services/diplomas.service';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { GraduationCap, LucideAngularModule } from 'lucide-angular';
import { Header } from '../../../../../shared/components/ui/header/header';
import { Diploma } from '../../models/diploma';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { RouterLink } from "@angular/router";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-diplomas-home',
  imports: [Header, LucideAngularModule, RouterLink, BreadcrumbModule],
  templateUrl: './diplomas-home.html',
  styleUrl: './diplomas-home.scss',
})
export class DiplomasHome implements OnInit {
  readonly GraduationCap = GraduationCap;
  readonly ChevronDown = ChevronDown;

  private readonly diplomasService = inject(DiplomasService);
  private readonly platform_ID = inject(PLATFORM_ID);
  private token?: string;
  diplomas: Diploma[] = [];
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  ngOnInit() {
      this.items = [{ label: 'Diplomas' ,routerLink:'/diplomas'}];


    if (isPlatformBrowser(this.platform_ID)) {
      this.token = localStorage.getItem('token') ?? '';
      this.diplomasService.getDiplomas(this.token).subscribe({
        next: (res) => {
          this.diplomas = res.payload.data;
          console.log(this.diplomas)
        },
      });
    }
  }

  getExams() {

  }

}
