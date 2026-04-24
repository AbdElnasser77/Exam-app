import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LucideAngularModule, FolderCode, Brain, BookOpenCheck, RectangleEllipsis } from 'lucide-angular';

export class AppModule { }
@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, LucideAngularModule],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {
  readonly FolderCode = FolderCode;
  readonly Brain = Brain;
  readonly BookOpenCheck = BookOpenCheck;
  readonly RectangleEllipsis= RectangleEllipsis;
}
