import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { EllipsisVertical, FolderCode, GraduationCap, LucideAngularModule, Settings } from "lucide-angular";
import { Sidebar } from "../../../shared/components/ui/sidebar/sidebar";

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, LucideAngularModule, RouterLinkWithHref, RouterLinkActive, Sidebar],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.scss',
})
export class UserLayout {

}
