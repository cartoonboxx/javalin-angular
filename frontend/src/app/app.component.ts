import {Component, inject} from '@angular/core';
import {AdminService} from './services/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private adminService = inject(AdminService);

  public isAdminPanel: boolean = this.adminService.isAdminPanelOpen();

}
