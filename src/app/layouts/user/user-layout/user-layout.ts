import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { EllipsisVertical, FolderCode, GraduationCap, LucideAngularModule, Settings } from "lucide-angular";

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, LucideAngularModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.scss',
})
export class UserLayout {

  readonly folderCode = FolderCode;
  readonly GraduationCap = GraduationCap;
  readonly Settings = Settings;
  readonly EV = EllipsisVertical;
}
