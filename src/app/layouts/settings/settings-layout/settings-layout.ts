import { Component, inject } from '@angular/core';
import { Header } from "../../../shared/components/ui/header/header";
import { ChevronLeft, CircleUser, Lock, LogOut, LucideAngularModule, TriangleAlert, User } from "lucide-angular";
import { Button } from "../../../shared/components/ui/button/button";
import { Toast } from "primeng/toast";
import { Modal } from "../../../shared/components/ui/modal/modal";
import { Breadcrumb } from "primeng/breadcrumb";
import { MenuItem } from 'primeng/api';
import { Router, RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-settings-layout',
  imports: [Header, LucideAngularModule, Button, Toast, Breadcrumb, RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './settings-layout.html',
  styleUrl: './settings-layout.scss',
})
export class SettingsLayout {
  items: MenuItem[] = [];
  readonly chevronLeft = ChevronLeft;
  readonly User = User;
  readonly CircleUser = CircleUser;
  readonly Lock = Lock;
  readonly logoutIcon = LogOut;

  private readonly router = inject(Router);


  ngOnInit() {
    this.items = [
      {
        label: 'Account',
        styleClass: 'text-gray-600'
      },

    ];
  }

  onBackAttempt() {
    this.router.navigate(['/diplomas']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
