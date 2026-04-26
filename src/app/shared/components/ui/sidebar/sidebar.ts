import { CurrentUserService } from './../../../../core/services/current-user.service';
import { Component, inject, Input, PLATFORM_ID } from '@angular/core';
import {
  EllipsisVertical,
  FolderCode,
  GraduationCap,
  Settings,
  LucideAngularModule,
  User,
  LogOut,
} from 'lucide-angular';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuModule, Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { UserProfile } from '../../../../core/models/user-profile';

@Component({
  selector: 'app-sidebar',
  imports: [
    LucideAngularModule,
    RouterLink,
    RouterLinkActive,
    Menu,
    CommonModule,
    MenuModule,
    ButtonModule,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  readonly folderCode = FolderCode;
  readonly GraduationCap = GraduationCap;
  readonly Settings = Settings;
  readonly User = User;
  readonly LogOut = LogOut;
  readonly EV = EllipsisVertical;

  private router = inject(Router);
  private currentUserService = inject(CurrentUserService);
  private platform_ID = inject(PLATFORM_ID);

  token: string = '';
  user?: UserProfile;
  items: MenuItem[] | undefined;
  @Input() isExam: boolean = false;

  ngOnInit() {
    this.items = [
      {
        label: 'Account',
        lucideIcon: User,
        routerLink: '/user',
      },
      {
        label: 'Dashboard',
        lucideIcon: Settings,
        routerLink: '/dashboard', 
      },
      {
        label: 'Logout',
        lucideIcon: LogOut,
        styleClass: 'text-red-500',
        command: () => {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        },
      },
    ];
    if (isPlatformBrowser(this.platform_ID)) {
      this.token = localStorage.getItem('token') ?? '';

      this.currentUserService.getLoggedUser(this.token).subscribe({
        next: (res) => {
          this.user = res.payload.user;
        },
      });
    }

  }
}
