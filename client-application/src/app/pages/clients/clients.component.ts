import { MessageService } from 'primeng/api';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { UniversalTableColumn } from 'src/app/components/table/column.model';
import { Client } from 'src/app/entitites/client.model';
import { ClientsDialogComponent } from './clients-dialog/clients-dialog.component';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'fixtab-clients',
  templateUrl: './clients.component.html'
})

export class ClientsComponent implements OnInit {

  clients: Client[] = [];
  columns: UniversalTableColumn[] = [];
  selectedClient: Client | null = null;
  openDeleteDialog = false;

  constructor(
    private clientService: ClientsService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loadColumn();
    this.loadClients();
  }

  loadColumn(): void {
    this.columns = [
      {
        header: 'Imie',
        field: 'name'
      },
      {
        header: 'Nazwisko',
        field: 'surname'
      },
      {
        header: 'Email',
        field: 'email'
      },
      {
        header: 'Telefon',
        field: 'phoneNumber'
      }
    ];
  }

   loadClients(): void {
    this.clientService.getAllNotDeleted().subscribe(
      (res: HttpResponse<Client[]>) => {
        this.clients = res.body ?? [];
      }
    )
   }

   onClientSelected(event: Client): void {
    this.selectedClient = event;
   }

   openClientDialog(edit: boolean): void {
      const ref = this.dialogService.open(ClientsDialogComponent, {
        header: edit ? 'Edytuj klienta' : 'Dodaj klienta',
        width: '60%',
        height: '60%',
        data: {
          edit: edit,
          client: this.selectedClient
        }
      });
      ref.onClose.subscribe((response) => this.handleClientDialog(response));
   }
   openClientDeleteDialog(event: boolean): void {
    this.openDeleteDialog = event;
   }

   handleClientDialog(response: any) {
      if(response) {
        this.loadClients();
      }
   }

   handleClientDeleteDialog(response: boolean): void {
      if(response) {
        this.clientService.delete(this.selectedClient?.clientId!).subscribe(
          {
            next: () => {
              this.messageService.add({key: 'mainToast', severity: 'success', summary: 'Success',
                detail: 'usunięto!'});
              this.loadClients();
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
