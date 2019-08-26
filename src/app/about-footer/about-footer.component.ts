import {Component, OnInit} from '@angular/core';
import {Web3Service} from '../util/web3.service';
import { MatSnackBar } from '@angular/material';

declare let require: any;
const filesystem_artifacts = require('../../../build/contracts/FileSystem.json');

@Component({
  selector: 'about-footer',
  templateUrl: './about-footer.component.html',
  styleUrls: ['./about-footer.component.css']
})
export class AboutFooter implements OnInit {

constructor() { }

  ngOnInit() {
  }



}
