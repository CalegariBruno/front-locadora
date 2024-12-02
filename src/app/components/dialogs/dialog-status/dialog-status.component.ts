import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-ativar-desativar',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatButtonModule,
    MatDialogTitle
  ],
  templateUrl: './dialog-status.component.html',
  styleUrl: './dialog-status.component.css',
})
export class DialogAtivarDesativarComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAtivarDesativarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nome: string; acao: string }
  ) { }

  onClose(): void {
    // Lógica para confirmar a ação
    this.dialogRef.close(true);
  }

  onCancel(): void {
    // Lógica para cancelar a ação
    this.dialogRef.close();
  }
}
