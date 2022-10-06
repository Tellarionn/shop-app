import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  callbackForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.callbackForm = formBuilder.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      userPhone: ['', [Validators.required, Validators.pattern('[0-9]{12}')]],
      comment: [''],
    });
  }

  ngOnInit(): void {}

  public send(): void {
    console.log(this.callbackForm.value);
  }
}
