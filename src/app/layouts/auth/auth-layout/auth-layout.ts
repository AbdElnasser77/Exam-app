import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LucideAngularModule, FolderCode, Brain, BookOpenCheck, RectangleEllipsis } from 'lucide-angular';
import { Register } from "../../../features/auth/pages/register/register";

export class AppModule { }
@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, LucideAngularModule, Register],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {
  readonly FolderCode = FolderCode;
  readonly Brain = Brain;
  readonly BookOpenCheck = BookOpenCheck;
  readonly RectangleEllipsis= RectangleEllipsis;
}
