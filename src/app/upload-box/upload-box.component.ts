import {Component, OnInit} from '@angular/core';
import { ngfModule, ngf } from "angular-file"
import { Subscription } from 'rxjs';
import  { HttpClient, HttpRequest,
  HttpResponse, HttpEvent
} from '@angular/common/http';
import {Web3Service} from '../util/web3.service';
import { MatSnackBar } from '@angular/material';


declare let require: any;
const filesystem_artifacts = require('../../../build/contracts/FileSystem.json');

@Component({
  selector: 'upload-box',
  templateUrl: './upload-box.component.html',
  styleUrls: ['./upload-box.component.css']
})
export class UploadBox implements OnInit {


 

  accept = '*'
  files:File[] = []
  progress:number
  url = 'https://evening-anchorage-3159.herokuapp.com/api/'
  hasBaseDropZoneOver:boolean = false
  httpEmitter:Subscription
  httpEvent:HttpEvent<{}>
  lastFileAt:Date
 
  sendableFormData:FormData//populated via ngfFormData directive
 
  //constructor(public HttpClient:HttpClient){}
 
  cancel(){
    this.progress = 0
    if( this.httpEmitter ){
      console.log('cancelled')
      this.httpEmitter.unsubscribe()
    }
  }
 
  uploadFiles(files:File[]):Subscription{
    const req = new HttpRequest<FormData>('POST', this.url, this.sendableFormData, {
      reportProgress: true//, responseType: 'text'
    })
    
    return this.httpEmitter = this.HttpClient.request(req)
    .subscribe(
      event=>{
        this.httpEvent = event
        
        if (event instanceof HttpResponse) {
          delete this.httpEmitter
          console.log('request done', event)
        }
      },
      error=>console.log('Error Uploading',error)
    )
  }
 
  getDate(){
    return new Date()
  }



  path='';
 accounts: string[];
  FileSys: any;
  status = '';

  constructor(private web3Service: Web3Service, private matSnackBar: MatSnackBar, public HttpClient:HttpClient) {
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

clickAddButton(i){
this.path = this.files[i].name;

//Add file to ipfs and get hash

this.addPath();
 this.files.splice(i,1);
}


}
