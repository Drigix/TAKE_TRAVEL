import { Component, OnInit } from '@angular/core';
import { TravelDialogComponent } from './travel-dialog/travel-dialog.component';
import { Travel } from 'src/app/entitites/travel.model';
import { UniversalTableColumn } from 'src/app/components/table/column.model';
import { DialogService } from 'primeng/dynamicdialog';
import { TravelService } from 'src/app/services/travel.service';
import { MessageService } from 'primeng/api';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'take-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss']
})

export class TravelComponent implements OnInit {

  selectedTravel: Travel | null = null;
  columns: UniversalTableColumn[] = [];
  travels: Travel[] = [];
  openDeleteDialog = false;

  constructor(
    private dialogService: DialogService,
    private routeService: TravelService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loadColumns();
    this.loadTravels();
  }

  loadColumns(): void {
    this.columns = [
      {
        header: 'Nazwa',
        field: 'name'
      },
      {
        header: 'Data',
        field: 'date'
      },
      {
        header: 'Trasa',
        field: 'route',
        subField: 'name'
      }
    ];
  }

  loadTravels(): void {
    this.routeService.getAll().subscribe(
      (res: HttpResponse<Travel[]>) => {
        this.travels = res.body ?? [];
      }
    )
  }

  onTravelSelected(event: Travel): void {
    this.selectedTravel = event;
  }

  openTravelDialog(edit: boolean): void {
    const ref = this.dialogService.open(TravelDialogComponent, {
      header: edit ? 'Edytuj przewóz' : 'Dodaj przewóz',
      width: '60%',
      height: '60%',
      data: {
        edit: edit,
        travel: this.selectedTravel
      }
    });
    ref.onClose.subscribe((response) => this.handleTravelDialog(response));
  }

  openTravelDeleteDialog(event: boolean): void {
    this.openDeleteDialog = event;
  }

  handleTravelDeleteDialog(response: boolean): void {
    if(response) {
      this.routeService.delete(this.selectedTravel?.id!).subscribe(
        {
          next: () => {
            this.messageService.add({key: 'mainToast', severity: 'success', summary: 'Sukces!',
              detail: 'Pomyślnie usunięto przewóz!'});
            this.loadTravels();
          },
          error: () => {
            this.messageService.add({key: 'mainToast', severity: 'error', summary: 'Błąd!',
             detail: 'Nie udało sie usunąć przewozu!'});
          }
        }
      )
    }
    this.openDeleteDialog = false;
 }

  handleTravelDialog(response: any) {
    if(response) {
      this.loadTravels();
    }
  }
}
