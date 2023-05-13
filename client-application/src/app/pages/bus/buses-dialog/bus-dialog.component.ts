import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Bus, BusPassword } from 'src/app/entitites/bus.model';
import { ChangeDateService } from 'src/app/services/change-date.service';
import { BusService } from 'src/app/services/bus.service';

@Component({
  selector: 'fixtab-buss-dialog',
  templateUrl: './bus-dialog.component.html',
  styleUrls: ['./bus-dialog.component.scss']
})

export class BussDialogComponent implements OnInit {

  busForm = this.fb.group({
    name: ['', Validators.required],
    registrationNumber: ['', Validators.required],
    places: ['', Validators.required]
  });

  bus: Bus = new Bus();
  password: BusPassword | null = new BusPassword();
  edit = false;

  constructor(
    private fb: UntypedFormBuilder,
    private busService: BusService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private changeDateService: ChangeDateService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.edit = this.config.data.edit;
    if(this.edit) {
      this.bus = this.config.data.bus;
    }
  }

  onCreateBus(): void {
    this.busService.create(this.bus).subscribe(
      (res: HttpResponse<BusPassword>) => {
        this.password = res.body;
        this.messageService.add({key: 'mainToast', severity: 'success', summary: 'Success',
              detail: 'utworzono!'});
      }
    );
  }

  onEditBus(): void {
    this.busService.edit(this.bus).subscribe(
      {
        next: () => {
          console.log('edytowano');
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
      this.ref.close();
  }

  onCloseDialog(): void {
    this.ref.close();
  }
}