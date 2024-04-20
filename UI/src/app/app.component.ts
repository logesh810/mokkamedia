import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(private ls: StorageService, private router: Router) {

  }
  ngOnInit() {
    let user = this.ls.get('userData');

    if (!user) this.router.navigateByUrl('/login');

  }

}
