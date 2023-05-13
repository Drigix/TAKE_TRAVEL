import { Component, OnInit } from '@angular/core';
import { UniversalTableColumn } from 'src/app/components/table/column.model';
import { DialogService } from 'primeng/dynamicdialog';
import { BusService } from 'src/app/services/bus.service';
import { HttpResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Bus } from 'src/app/entitites/bus.model';
import { BussDialogComponent } from './buses-dialog/bus-dialog.component';

@Component({
  selector: 'fixtab-buses',
  templateUrl: './bus.component.html'
})

export class BusComponent implements OnInit {

  columns: UniversalTableColumn[] = [];
  buses: Bus[] = [];
  selectedBus: Bus | null = null;
  openDeleteDialog = false;

  constructor(
    private dialogService: DialogService,
    private busService: BusService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loadColums();
    this.loadBuss();
   }

   loadColums(): void {
    this.columns = [
      {
        header: "Nazwa",
        field: "name"
      },
      {
        header: "Numer rejestracyjny",
        field: "registrationNumber"
      },
      {
        header: "Miejsca",
        field: "places"
      }
    ];
   }

   loadBuss(): void {
      this.busService.getAllNotDeleted().subscribe(
        (res: HttpResponse<Bus[]>) => {
          this.buses = res.body ?? [];
        }
      );
   }

   onBusSelected(event: Bus): void {
      this.selectedBus = event;
      console.log(this.selectedBus);
   }

   openBussDialog(edit: boolean): void {
      const ref = this.dialogService.open(BussDialogComponent, {
        header: edit ? 'Edytuj autobus' : 'Dodaj autobus',
        width: '60%',
        height: '60%',
        data: {
          edit: edit,
          bus: this.selectedBus
        }
      });
      ref.onClose.subscribe((response) => this.handleBussDialog(response));
   }

   openBussDeleteDialog(event: boolean) {
      this.openDeleteDialog = event;
   }

   handleBussDialog(response: any): void {
      console.log(response);
   }

   handleBussDeleteDialog(response: boolean): void {
    if(response) {
      this.busService.delete(this.selectedBus?.BusId!).subscribe(
        {
          next: () => {
            this.messageService.add({key: 'mainToast', severity: 'success', summary: 'Success',
              detail: 'usunięto!'});
            this.loadBuss();
          },
          error: () => {
            this.messageService.add({key: 'mainToast', severity: 'error', summary: 'Error',
              detail: 'nie usunięto!'});
          }
        }
      )
    }
    this.openDeleteDialog = false;
  }
}
