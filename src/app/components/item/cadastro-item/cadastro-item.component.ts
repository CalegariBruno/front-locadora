import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Item } from '../../../models/item/item';
import { ItemService } from '../../../services/item/item.service';
import { ToastrService } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import { Titulo } from '../../../models/titulo/titulo';
import { TituloService } from '../../../services/titulo/titulo.service';

interface TiposItem {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-cadastro-item',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    RouterLink
  ],
  templateUrl: './cadastro-item.component.html',
  styleUrl: './cadastro-item.component.css'
})
export class CadastroItemComponent {

  item: Item = { numSerie: 0, dtAquisicao: '', tipoItem: '', titulo: { id: 0 } };
  id!: number;
  tipo!: string;
  tiposItem: TiposItem[] = [
    { value: 'fita', viewValue: 'fita' },
    { value: 'DVD', viewValue: 'DVD' },
    { value: 'BlueRay', viewValue: 'BlueRay' },
  ];
  titulosList: Titulo[] = []

  constructor(
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private tituloService: TituloService, 
  ) { }

  ngOnInit(): void {

    // Carrega os títulos ao iniciar o componente
    this.tituloService.listarTitulos().subscribe((titulos: Titulo[]) => {
      this.titulosList = titulos;
    });

    // PEGA O ID DA URL
    this.route.params.subscribe(params => {

      this.id = +params['id']; // CONVERTE PARA NUMBER

      if (this.id) {
        this.itemService.buscarItem(this.id).subscribe((item: Item) => {
          this.item = item;
        });
      }

    });

    if (this.id) {
      this.tipo = 'Editar'
    } else {
      this.tipo = 'Cadastrar'
    }

  }

  onSubmit(): void {

    console.log("ENTROU NO SUBMIT")
    console.log("FORM ITEM -> ", this.item)

    if (this.item.numSerie > 0 && this.item.dtAquisicao && this.item.tipoItem && this.item.titulo.id > 0) {

      if (this.id) { // EDITAR ITEM        

        this.itemService.editarItem(this.item).subscribe({
          next: () => {
            this.router.navigate(['/item']);
            this.toastrService.success('Item editado com sucesso!')
            console.log('Item atualizado com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao atualizar a item', err);
          }
        });

      } else { // CRIAR ITEM

        this.itemService.criarItem(this.item).subscribe({
          next: () => {
            this.router.navigate(['/item']);
            this.toastrService.success('Item salvo com sucesso!')
            console.log('Item salvo com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao salvar item', err);
          }
        });

      }
    }
  }

}
