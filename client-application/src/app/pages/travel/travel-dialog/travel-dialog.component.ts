import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Bus } from 'src/app/entitites/bus.model';
import { Client } from 'src/app/entitites/client.model';
import { TravelRoute } from 'src/app/entitites/travel-route.model';
import { Travel } from 'src/app/entitites/travel.model';
import { BusService } from 'src/app/services/bus.service';
import { ChangeDateService } from 'src/app/services/change-date.service';
import { ClientsService } from 'src/app/services/clients.service';
import { RouteService } from 'src/app/services/route.service';
import { TravelService } from 'src/app/services/travel.service';

@Component({
  selector: 'fixtab-travel-dialog',
  templateUrl: './travel-dialog.component.html',
  styleUrls: ['../travel.component.scss']
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
  date: Date = new Date();
  clients: Client[] = [];
  selectedClients: Client[] = [];
  buses: Bus[] = [];
  selectedBuses: Bus[] = [];
  routes: TravelRoute[] = [];
  edit = false;

  constructor(
    private fb: UntypedFormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private travelService: TravelService,
    private messageService: MessageService,
    private changeDateService: ChangeDateService,
    private clientService: ClientsService,
    private busService: BusService,
    private routeService: RouteService
  ) { }

  ngOnInit() {
    this.edit = this.config.data.edit;
    if(this.edit) {
      this.travel = this.config.data.travel;
    }
    this.loadClients();
    this.loadBuses();
    this.loadRoutes();
  }

  loadClients(): void {
    this.clientService.getAll().subscribe(
      (res: HttpResponse<Client[]>) => {
        this.clients = res.body ?? [];
      }
    )
   }

   loadBuses(): void {
    this.busService.getAll().subscribe(
      (res: HttpResponse<Bus[]>) => {
        this.buses = res.body ?? [];
      }
    );
 }

   loadRoutes(): void {
    this.routeService.getAll().subscribe(
      (res: HttpResponse<TravelRoute[]>) => {
        this.routes = res.body ?? [];
      }
    )
  }

  onEditTravel(): void {
    this.travelService.update(this.travel).subscribe(
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

  onCreateTravel(): void {
    this.travelService.create(this.travel).subscribe(
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
