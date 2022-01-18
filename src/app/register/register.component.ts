import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/models/user';
import { DialogLayerPreviewComponent } from '../dialog-layer-preview/dialog-layer-preview.component';
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'registracija',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
// roles_options = ['ROLE_MODERATOR', 'ROLE_ADMIN'];
roles_options = ['user','mod', 'admin'];

userForm = new FormGroup({
  username: new FormControl(''),
  email: new FormControl(''),
  password: new FormControl(''),
  roles: new FormControl('')
});

  form: any = {
    username: null,
    email: null,
    password: null,
    roles:[]
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, 
              public dialogRef: MatDialogRef<DialogLayerPreviewComponent>,
              @Inject(MAT_DIALOG_DATA) public user: User) { }

  ngOnInit(): void {
    console.log(JSON.stringify(this.user));
    this.userForm.setValue({
      username : this.user.username,
      email: this.user.email,
      password: null,
      roles:this.user.roles
    });
  }

  onSubmit1(): void {
    const { username, email, password, roles } = this.form;
      this.authService.register(username, email, password, roles).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
    }

    onSubmit(){
      console.log('submited');
    }
   
}
