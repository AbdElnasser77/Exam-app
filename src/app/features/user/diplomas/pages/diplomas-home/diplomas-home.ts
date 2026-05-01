import { ChevronDown } from 'lucide-angular';
import { DiplomasService } from './../../services/diplomas.service';
import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { GraduationCap, LucideAngularModule } from 'lucide-angular';
import { Header } from '../../../../../shared/components/ui/header/header';
import { Diploma } from '../../models/diploma';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from "@angular/router";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-diplomas-home',
  imports: [Header, LucideAngularModule, RouterLink, BreadcrumbModule],
  templateUrl: './diplomas-home.html',
  styleUrl: './diplomas-home.scss',
})
export class DiplomasHome implements OnInit, AfterViewInit, OnDestroy {
  readonly GraduationCap = GraduationCap;
  readonly ChevronDown = ChevronDown;

  private readonly diplomasService = inject(DiplomasService);
  private readonly platform_ID = inject(PLATFORM_ID);
  private readonly el = inject(ElementRef);
  private token?: string;
  private scrollableParent?: HTMLElement;
  private scrollHandler = () => {
    this.showScrollIndicator = (this.scrollableParent?.scrollTop ?? 0) === 0;
  };
  scrollParentLeft = 0;

  diplomas: Diploma[] = [];
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  showScrollIndicator = true;

  ngOnInit() {
    this.items = [{ label: 'Diplomas', routerLink: '/diplomas' }];

    if (isPlatformBrowser(this.platform_ID)) {
      this.token = localStorage.getItem('token') ?? '';
      this.diplomasService.getDiplomas(this.token).subscribe({
        next: (res) => {
          this.diplomas = res.payload.data;
        },
      });
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platform_ID)) {
      this.scrollableParent = this.findScrollableParent(this.el.nativeElement);
      this.scrollableParent?.addEventListener('scroll', this.scrollHandler);
      this.scrollParentLeft = this.scrollableParent?.getBoundingClientRect().left ?? 0;
    }
  }

  ngOnDestroy() {
    this.scrollableParent?.removeEventListener('scroll', this.scrollHandler);
  }

  private findScrollableParent(el: HTMLElement): HTMLElement | undefined {
    let parent = el.parentElement;
    while (parent) {
      const { overflow, overflowY } = window.getComputedStyle(parent);
      if (/auto|scroll/.test(overflow + overflowY)) return parent;
      parent = parent.parentElement;
    }
    return undefined;
  }

  getExams() {}
}
