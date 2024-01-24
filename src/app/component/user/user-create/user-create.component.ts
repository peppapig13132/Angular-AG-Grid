import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpProviderService } from 'src/app/service/http-provider.service';
import { ageValidator, alphabeticValidator, emailValidator } from 'src/app/shared/function/validation';
import { message } from 'src/app/shared/message/message';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {

  userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, alphabeticValidator]),
    email: new FormControl('', [Validators.required, emailValidator]),
    gender: new FormControl('', [Validators.required, Validators.nullValidator]),
    age: new FormControl('', [Validators.required, Validators.nullValidator, ageValidator])
  });

  statusMessage: string = "";
  statusMessageColor: string = "";

  constructor(private fb:FormBuilder, private httpProvider: HttpProviderService) { }

  createUser(): void {
    if (this.userForm.valid) {
      const newUser = this.userForm.value;

      this.httpProvider.createUser(newUser)
        .subscribe(
          data => {
            if(data != null && data.body != null) {
              var resultData = data.body;
              if(resultData == 1) {
                this.statusMessage = message.userCreate[data.body];
                this.statusMessageColor = "text-info";
                this.userForm = new FormGroup({
                  name: new FormControl('', [Validators.required, alphabeticValidator]),
                  email: new FormControl('', [Validators.required, emailValidator]),
                  gender: new FormControl('', [Validators.required, Validators.nullValidator]),
                  age: new FormControl('', [Validators.required, Validators.nullValidator, ageValidator])
                });
              } else {
                this.statusMessage = message.userCreate[data.body];
                this.statusMessageColor = "text-danger";
              }
            } else {
              console.log("server is not respond.");
            }
          }
        )
    }
  }
}
