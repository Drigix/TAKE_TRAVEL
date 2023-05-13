import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ChangeDateService } from 'src/app/services/change-date.service';
import { RouteService } from 'src/app/services/route.service';
import { TravelRoute } from 'src/app/entitites/travel-route.model';

@Component({
  selector: 'fixtab-route-dialog',
  templateUrl: './route-dialog.component.html'
})

export class RouteDialogComponent implements OnInit {

  routeForm = this.fb.group({
    name: ['', Validators.required],
    startingPoint: ['', Validators.required],
    endingPoint: ['', Validators.required],
    distance: ['', [Validators.required]]
  });

  route: TravelRoute = new TravelRoute();
  edit = false;

  constructor(
    private fb: UntypedFormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private routeService: RouteService,
    private messageService: MessageService,
    private changeDateService: ChangeDateService
  ) { }

  ngOnInit() {
    this.edit = this.config.data.edit;
    if(this.edit) {
      this.route = this.config.data.route;
    }
  }

  onEditRoute(): void {
    this.routeService.update(this.route).subscribe(
      {
        next: (response) => {
          this.messageService.add({key: 'mainToast', severity: 'success', summary: 'Sukces!',
                detail: 'edytowano!'});
          this.ref.close(response);
        },
        error: (error) => {
          this.messageService.add({key: 'mainToast', severity: 'error', summary: 'Błąd!',
                detail: 'nie edytowano!'});
        }
      }
    )
  }

  onCreateRoute(): void {
    this.routeService.create(this.route).subscribe(
      {
        next: (response) => {
          this.messageService.add({key: 'mainToast', severity: 'success', summary: 'Sukces!',
                detail: 'utworzono!'});
          this.ref.close(response);
        },
        error: (error) => {
          this.messageService.add({key: 'mainToast', severity: 'error', summary: 'Błąd!',
                detail: 'nie utworzono!'});
        }
      }
    )
  }

  onCloseDialog(): void {
    this.ref.close();
  }
}
