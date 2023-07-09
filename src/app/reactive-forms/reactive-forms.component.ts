import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.scss'],
})
export class ReactiveFormsComponent implements OnInit {
  profileForm = this.fb.group({
    firstName: ['', [Validators.minLength(5), Validators.required]],
    lastName: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9._-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
        ),
      ],
    ],
    address: this.fb.group({
      street: ['', Validators.maxLength(5)],
      city: [''],
      state: [''],
      zip: [''],
    }),
    aliases: this.fb.array([this.fb.control('')]),
  });

  //otra forma de declarar
  profileForm2 = new FormGroup({
    firstName: new FormControl([
      '',
      [Validators.minLength(5), Validators.required],
    ]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
  onReset() {
    // this.submitted = false;
    //this.registerForm.reset();
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }
  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }
}
