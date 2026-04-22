import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { FolderCode, GraduationCap, LucideAngularModule, Settings } from "lucide-angular";

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, LucideAngularModule, RouterLinkWithHref],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.scss',
})
export class UserLayout {

  readonly folderCode = FolderCode;
  readonly GraduationCap = GraduationCap;
  readonly Settings = Settings;
}
