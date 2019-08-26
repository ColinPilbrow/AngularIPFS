import {Component, OnInit} from '@angular/core';
import {Web3Service} from '../util/web3.service';
import { MatSnackBar } from '@angular/material';

declare let require: any;
const filesystem_artifacts = require('../../../build/contracts/FileSystem.json');

@Component({
  selector: 'file-system',
  templateUrl: './file-system.component.html',
  styleUrls: ['./file-system.component.css']
})
export class FileSystem implements OnInit {
 accounts: string[];
  FileSys: any;

 
    path='';

  status = '';
  filepaths:string[] = [];

  constructor(private web3Service: Web3Service, private matSnackBar: MatSnackBar) {
    console.log('Constructor: ' + web3Service);
  }

  newPath(e) {
    console.log('Setting amount: ' + e.target.value);
    this.path = e.target.value;
  }

  async addPath() {
    if (!this.FileSys) {
      this.setStatus('File System is not loaded, unable to send transaction');
      return;
    }
    console.log('Adding path ' + this.path + ' to system');
    this.setStatus('Initiating transaction... (please wait)');

try {

      const deployedFileSystem = await this.FileSys.deployed();
      const transaction = await deployedFileSystem.addPath.sendTransaction(this.path, {from: this.accounts[0], gas: 1000000});

      if (!transaction) {
        this.setStatus('Path not added.');
      } else {
        this.setStatus('Path Successfully Added!');
      }
    } catch (e) {
      console.log(e);
      this.setStatus('Error adding path; see log.');
    }
  }


  ngOnInit(): void {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.watchAccount();
    this.web3Service.artifactsToContract(filesystem_artifacts)
      .then((FileSystemAbstraction) => {
        this.FileSys = FileSystemAbstraction;
        this.FileSys.deployed().then(deployed => {
          console.log(deployed);
		this.refreshFilePaths();
          deployed.Added({}, (err, ev) => {
            console.log('Added event came in, refreshing file paths');
            this.refreshFilePaths();
          });
        });
      });
  }


  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
    });
  }

  setStatus(status) {
    this.matSnackBar.open(status, null, {duration: 3000});
  }



  async refreshFilePaths() {
    console.log('Refreshing file paths');

    try {
      const deployedFileSystem = await this.FileSys.deployed();
      console.log(deployedFileSystem);
      const filePathLength = await deployedFileSystem.getLength.call();
      console.log('Found length: ' + filePathLength);
      //Get all file paths from blockchain and build filepaths array.
	var PATHS = [];
	for (var i = 0; i < filePathLength; i++) {
        const filePathAtIndex = await deployedFileSystem.getPath.call(i);
   	 PATHS.push(filePathAtIndex);
	}
	console.log(PATHS);
	this.filepaths = PATHS;
    } catch (e) {
      console.log(e);
      this.setStatus('Error getting filepaths; see log.');
    }
  }



}
