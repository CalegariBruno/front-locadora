import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Ator } from '../../../models/ator/ator';
import { AtorService } from '../../../services/ator/ator.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { Devolucao } from '../../../models/devolucao/devolucao';
import { Locacao } from '../../../models/locacao/locacao';
import { LocacaoService } from '../../../services/locacao/locacao.service';
import { ItemService } from '../../../services/item/item.service';

@Component({
  selector: 'app-registrar-devolucao',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './registrar-devolucao.component.html',
  styleUrl: './registrar-devolucao.component.css'
})
export class RegistrarDevolucaoComponent implements OnInit {

  devolucao: Devolucao = { numSerieItem: 0, multa: 0 };
  id!: number;
  locacao!: Locacao;
  numSerie!: number;
  valor!: number;

  constructor(
    private locacaoService: LocacaoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {

    // PEGA O ID DA URL
    this.route.params.subscribe(params => {

      this.id = +params['id']; // CONVERTE PARA NUMBER

      if (this.id) {
        this.locacaoService.buscarLocacao(this.id).subscribe((locacao: Locacao) => {
          
          this.locacao = locacao;

          this.itemService.buscarItem(locacao.item.id).subscribe((item) => {
            this.numSerie = item.numSerie;
          });

        });



      }

    });

  }

  onSubmit(): void {

    this.devolucao.numSerieItem = this.numSerie;
    this.valor = this.locacao.valorCobrado! + this.devolucao.multa;

    this.locacaoService.criarDevolucao(this.devolucao, this.locacao.id!).subscribe({
      next: () => {
        this.router.navigate(['/locacao']);
        this.toastrService.success('Devolução efetuda com sucesso! Valor Cobrado: R$' + this.valor);
      },
      error: (error) => {
        console.log('Erro ao criar devolução: ', error);
      }
    });

  }

}
