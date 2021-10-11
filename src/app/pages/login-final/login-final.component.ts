import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommomService } from 'src/app/services/commom.service';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/_models/user';
import arrowBack from '@iconify/icons-ic/keyboard-backspace';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';

@Component({
  selector: 'vex-login-final',
  templateUrl: './login-final.component.html',
  styleUrls: ['./login-final.component.scss'],
  animations: [
	  fadeInUp400ms,
	  stagger20ms
  ]
})
export class LoginFinalComponent implements OnInit {


  form: FormGroup;
  arrowBack = arrowBack;
  inputType = 'password';
  visible = false;
  user = new User();
  nomeUrl =  '';

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  falhaLogin: boolean = false;
  consumo: any = [];

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private commomService: CommomService,
              private loginService: LoginService,
  ) {}

  login(): Promise<any> {
    let username = this.form.get('email').value
    let password = this.form.get('password').value
    return this.loginService
        .login(username, password)
        .then((response) => {
            if (response.body.Acesso[0].clienteID > 0) {
                this.getConsumo(response.body.Acesso[0].clienteID);
                // this.getFinanceiro(response.body.Acesso[0].clienteID);
                localStorage.setItem("currentUser", JSON.stringify(response.body.Acesso[0].Name));
                localStorage.setItem("Empresa", JSON.stringify(response.body.Acesso[0].Empresa));
                localStorage.setItem("clientId", JSON.stringify(response.body.Acesso[0].clienteID));
                localStorage.setItem("token", JSON.stringify(response.body.Acesso[0].clienteID));
                this.router.navigate(["unidades"]);
            } else {
                // this.falhaLogin = true;
            };
        })
        .catch(() => (console.log("error")));
}

getConsumo(clientId: String) {
    this.loginService.getConsumo(clientId).subscribe((response) => {
        this.consumo = response;
        localStorage.setItem("Consumo", JSON.stringify(this.consumo));
    });
}
// getFinanceiro(clientId: string) {
//     return this.financeiroService
//         .getFinanceiro(clientId)
//         .subscribe((response) => {
//             localStorage.setItem("Financeiro", JSON.stringify(response.body.Financeiro));
//         })
// }

ngOnInit(): void {
    this.form = this.fb.group({
        email: ["", [Validators.required]],
        password: ["", Validators.required],
    });
}

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }

}
