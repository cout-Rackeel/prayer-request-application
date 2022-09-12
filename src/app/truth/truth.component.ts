import { Component, OnInit } from '@angular/core';

import { TruthService } from '../core';
import { Truth } from '../core/models/truth';

@Component({
  selector: 'app-truth',
  templateUrl: './truth.component.html',
  styleUrls: ['./truth.component.css']
})
export class TruthComponent implements OnInit {

  truths !: Truth[]

  constructor(private truthService : TruthService) { }

  ngOnInit(): void {
    this.getTruth();
  }

  getTruth(){
    this.truthService.getAllTruth().subscribe(resp => this.truths = resp.data?.['truth'] as Truth[]);
  }

}
