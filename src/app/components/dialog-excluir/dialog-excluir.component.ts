import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-excluir',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatButtonModule, 
    MatDialogTitle],
  templateUrl: './dialog-excluir.component.html',
  styleUrl: './dialog-excluir.component.css',
})  
export class DialogExcluirComponent {
  
  constructor(
    public dialogRef: MatDialogRef<DialogExcluirComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nome: string } 
  ) {}

  onClose(): void {
    // Lógica para o botão "Fechar"
    this.dialogRef.close(true); 
  }

  onCancel(): void {
    // Lógica para o botão "Cancelar"
    this.dialogRef.close(); 
  }
}
