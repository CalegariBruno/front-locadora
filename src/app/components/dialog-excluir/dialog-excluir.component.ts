import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-excluir',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent
  ],
  templateUrl: './dialog-excluir.component.html',
  styleUrl: './dialog-excluir.component.css',
})  
export class MyDialogComponent {
  
  constructor(private dialogRef: MatDialogRef<MyDialogComponent>) {}

  onClose(): void {
    // Lógica para o botão "Fechar"
    this.dialogRef.close(); // Fecha o diálogo
  }

  onCancel(): void {
    // Lógica para o botão "Cancelar"
    this.dialogRef.close(); // Fecha o diálogo
  }
}
