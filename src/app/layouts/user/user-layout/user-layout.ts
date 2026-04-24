import { Component } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import {LucideAngularModule } from "lucide-angular";
import { Sidebar } from "../../../shared/components/ui/sidebar/sidebar";

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, LucideAngularModule, Sidebar],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.scss',
})
export class UserLayout {

}
