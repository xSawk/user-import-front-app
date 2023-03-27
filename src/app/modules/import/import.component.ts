import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImportService } from './import.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.sass']
})
export class ImportComponent {
  file: string | null = null;
  fileForm!: FormGroup;


  constructor(private formBuilder: FormBuilder,private importService: ImportService){}

  ngOnInit(): void {
      this.fileForm = this.formBuilder.group({
      file: ['']
    })
  }


  onFileChange(event: any){
    if(event.target.files.length > 0){
      this.fileForm.patchValue({
        file: event.target.files[0]
      });
    }
  }

  uploadFile(){
    let formData = new FormData();
    formData.append('file', this.fileForm.get('file')?.value);
    this.importService.uploadImage(formData)
      .subscribe(result => this.file = result.filename);
      console.log(this.file);
  }

  

}
