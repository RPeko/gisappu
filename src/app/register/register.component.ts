import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/models/user';
import { DialogLayerPreviewComponent } from '../dialog-layer-preview/dialog-layer-preview.component';
import { ConfirmedValidator } from '../helpers/confirmed.validator';
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'registracija',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  roles_options = ['user', 'mod', 'admin'];
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  userForm: FormGroup;
  submitText = "Registruj";


  constructor(private authService: AuthService,
    public dialogRef: MatDialogRef<DialogLayerPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private formBuilder: FormBuilder) { }



  ngOnInit(): void {
    // console.log(JSON.stringify(this.user));
    this.userForm = this.formBuilder.group({
      username: [this.user.username, [Validators.required,
      Validators.pattern('^[a-zA-Z]+$'),
      Validators.minLength(4),
      Validators.maxLength(15)
      ]],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]],
      roles: [this.user.roles.map(r => this.convertRole(r['name']))]
    }, 
    {validator: ConfirmedValidator('password', 'repassword')}
    );
    if (this.user.id){
      this.userForm.controls['username'].disable();
      this.submitText = "Edituj";
    }
  }

  get username() { return this.userForm.get('username') }
  get email() { return this.userForm.get('email') }
  get password() { return this.userForm.get('password') }
  get repassword() { return this.userForm.get('repassword') }
  get roles() { return this.userForm.get('roles') }

  convertRole(r: string) {
    switch (r) {
      case 'ROLE_USER':
        return 'user'
      case 'ROLE_MODERATOR':
        return 'mod'
      case 'ROLE_ADMIN':
        return 'admin'
      default:
        return r
    }
  }

  onSubmit(): void {
    const { username, email, password, roles } = this.userForm.value;
    if (!this.user.id) {
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
    } else {
      this.authService.update(this.user.id, email, password, roles).subscribe(
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
    this.dialogRef.close(false);

  }

}
