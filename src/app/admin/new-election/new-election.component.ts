import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';

// services required
import { AdminService } from './../admin.service';
import { ElectionDetails } from '../election-details';

@Component({
  selector: 'new-election',
  templateUrl: './new-election.component.html',
  styleUrls: ['./new-election.component.css'],
  providers: [AdminService]
})
export class newElectionComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  choiceType: number = 1;
  addFinished = false;
  electionStartDate: string;
  electionEndDate: string;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.firstFormGroup = new FormGroup({
      'electionName': new FormControl(null, Validators.required),
      'startDate': new FormControl(null, Validators.required),
      'endDate': new FormControl(null, Validators.required, ),
      'count': new FormControl(null, [Validators.min(1),Validators.required])
    }, this.isDateValid);
    this.secondFormGroup = new FormGroup({
      'sections': new FormArray([], this.isSecondFormValid)
    });
    this.firstFormGroup.get('startDate').valueChanges.subscribe((date) => {
      let day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();
      this.electionStartDate = month + '/' + day + '/' + year;
    });
    this.firstFormGroup.get('endDate').valueChanges.subscribe((date) => {
      let day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();
      this.electionEndDate = month + '/' + day + '/' + year;
    });

  }
  onAddSection() {
    this.addFinished = false;
    const options = new FormArray([]);
    (<FormArray>this.secondFormGroup.get('sections')).push(new FormGroup({
      'sectionName': new FormControl(null, Validators.required),
      'choiceType': new FormControl(this.choiceType),
      'options': options
    }));
  }
  onDeleteSection(index: number) {
    (<FormArray>this.secondFormGroup.get('sections')).removeAt(index);
  }

  onAddOption(index: number) {
    const control = new FormControl(null, Validators.required);
    const sections = (<FormArray>this.secondFormGroup.get('sections'));
    (<FormArray>sections.controls[index].get('options')).push(control);
  }
  onDeleteOption(sectionIndex: number, optionIndex: number) {
    const sections = (<FormArray>this.secondFormGroup.get('sections'));
    (<FormArray>sections.controls[sectionIndex].get('options')).removeAt(optionIndex);
  }

  isDateValid(control: AbstractControl) {
    if (control.get('startDate').value != null && control.get('endDate').value != null) {
      let sDate = control.get('startDate').value,
        eDate = control.get('endDate').value,
        sDay = sDate.getDate(),
        sMonth = sDate.getMonth() + 1,
        sYear = sDate.getFullYear(),
        eDay = eDate.getDate(),
        eMonth = eDate.getMonth() + 1,
        eYear = eDate.getFullYear();

      if (sYear == eYear) {
        if (sMonth == eMonth) {
          if (sDay <= eDay) {
            return null;
          }
        } else if (sMonth < eMonth) {
          return null;
        }
      } else if (sYear < eYear) {
        return null;
      }
    }
    return { invalidForm: true };
  }
  isSecondFormValid(control: AbstractControl) {
    if ((<FormArray>control).length > 0) {
      let _iF = false;
      for (let i = 0; <FormArray>(<FormArray>control).controls[i] != undefined; i++) {
        if ((<FormArray>(<FormArray>control).controls[i].get('options')).length == 0) {
          _iF = true;
          break;
        }
      }
      return _iF == true ? { invalidForm: true } : null;
    }

    return { invalidForm: true };
  }

  /**Handeling forms here */
  onSubmit() {
    this.firstFormGroup.addControl("admin",new FormControl(this.adminService.getUserName()));
    let finalForm = new FormGroup({
      'meta': this.firstFormGroup,
      'content':this.secondFormGroup
    });
    this.adminService.submitForm(finalForm.value);
  }

}