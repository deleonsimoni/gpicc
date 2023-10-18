import { Component, OnInit } from '@angular/core';
import { CominduService } from '@app/comindu.service';
import { AuthService } from '@app/shared/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inscritos',
  templateUrl: './inscritos.component.html',
  styleUrls: ['./inscritos.component.scss']
})
export class InscritosComponent implements OnInit {

  public users = [];
  public page;
  public pager: any = {};
  public search: any = {};
  public textSearch;
  user;
  userSelect;
  pageEvent;
  constructor(
    private cominduService: CominduService,
    public authService: AuthService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.retrieveAdminData(null);
  }

  public receiverSelectedUser(user) {
    if (this.userSelect === user._id) {
      this.userSelect = null;
    } else {
      this.userSelect = user._id;
    }
  }

  public retrieveAdminData(event) {


    this.authService.getUser().subscribe(user => {
      this.user = user;
    });

    if (this.textSearch && !this.textSearch.includes("@")) {
      let documentSearch = this.textSearch.replace(/[\W_]+/g, '');
      if (documentSearch.length < 4) {
        this.toastr.warning('Digite mais caracteres para efetuar a busca', 'Atenção');
      } else {
        this.search = { 'document': { $regex: documentSearch + '$' } };
      }

    } else if (this.textSearch) {
      this.search = { 'email': this.textSearch.trim() };

    }

    this.cominduService.retrieveUsers(event && event.pageIndex + 1 || 1, encodeURIComponent(JSON.stringify(this.search)))
      .subscribe((res: any) => {
        this.users = res.usersFound;
        this.pager = res.pager;
      });
  }


}
