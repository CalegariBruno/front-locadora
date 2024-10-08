import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ator',
  standalone: true,
  templateUrl: './ator.component.html',
  styleUrl: './ator.component.css',
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    MatButtonModule,
    RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtorComponent {

}
