import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Travel } from 'src/app/entitites/travel.model';
import { ChangeDateService } from 'src/app/services/change-date.service';
import { TravelService } from 'src/app/services/travel.service';

@Component({
  selector: 'fixtab-travel-dialog',
  templateUrl: './travel-dialog.component.html'
})

export class TravelDialogComponent implements OnInit {

  travelForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    birthDay: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.pattern("[0-9]{11}")]],
    city: ['', Validators.required],
    postalCode: ['', Validators.required],
    street: ['', Validators.required],
    streetNumber: ['', Validators.required]
  });

  travel: Travel = new Travel();
  edit = false;

  constructor(
    private fb: UntypedFormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private travelService: TravelService,
    private messageService: MessageService,
    private changeDateService: ChangeDateService
  ) { }

  ngOnInit() {
    this.edit = this.config.data.edit;
    if(this.edit) {
      this.travel = this.config.data.travel;
    }
  }

  onEditTravel(): void {
    this.travelService.update(this.travel).subscribe(
      {
        next: (response) => {
          this.messageService.add({key: 'mainToast', severity: 'success', summary: 'Success',
                detail: 'edytowano!'});
          this.ref.close(response);
        },
        error: (error) => {
          this.messageService.add({key: 'mainToast', severity: 'error', summary: 'Error',
                detail: 'nie edytowano!'});
        }
      }
    )
  }

  onCreateTravel(): void {
    this.travelService.create(this.travel).subscribe(
      {
        next: (response) => {
          this.messageService.add({key: 'mainToast', severity: 'success', summary: 'Success',
                detail: 'utworzono!'});
          this.ref.close(response);
        },
        error: (error) => {
          this.messageService.add({key: 'mainToast', severity: 'success', summary: 'Success',
                detail: 'utworzono!'});
        }
      }
    )
  }

  onCloseDialog(): void {
    this.ref.close();
  }
}
