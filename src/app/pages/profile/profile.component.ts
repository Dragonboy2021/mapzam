import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit, OnDestroy {
  req: any;
  name: any;
  displayedColumns: string[] = ['position', 'score', 'date'];
  dataSource = [];

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.req = this.auth.getProfile().subscribe(data => {
      this.name = data.name;
      this.dataSource = data.scores;
    })
  }

  ngOnDestroy() {
    this.req.unsubscribe();
  }
}
