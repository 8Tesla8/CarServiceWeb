import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { TransferService } from '../service/transfer.service';
import { UserDTO } from '../dto/userDTO';
import { AppointmentDTO } from '../dto/appointmentDTO';
import { CarDTO } from '../dto/carDTO';

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.css']
})

export class AppointmentComponent implements OnInit {

    emailNotifyControl = new FormControl('', [Validators.required, Validators.email]);


    appointmentFormGroup = new FormGroup({});

    dataStartControl = new FormControl('', [Validators.required]);
    timeStartControl = new FormControl('', [Validators.required]);

    dataEndControl = new FormControl('');
    timeEndControl = new FormControl('');

    //car info
    carYearControl = new FormControl('');
    carModelControl = new FormControl('');
    messageControl = new FormControl('');

    //personal info
    firstNameControl = new FormControl('', [Validators.required]);
    secondNameControl = new FormControl('');
    emailControl = new FormControl('', [Validators.required, Validators.email]);
    phoneNumberControl = new FormControl('');

    //service type
    transmissionCheckboxControl = new FormControl('');
    vehicleMaintanceCheckboxControl = new FormControl('');
    vehicleRepairCheckboxControl = new FormControl('');
    otherCheckboxControl = new FormControl('');


    constructor(private transferService: TransferService) {
    }

    ngOnInit(): void {
        console.log("init");
        this.appointmentFormGroup.addControl('dataStartControl', this.dataStartControl);
        this.appointmentFormGroup.addControl('timeStartControl', this.timeStartControl);

        this.appointmentFormGroup.addControl('dataEndControl', this.dataEndControl);
        this.appointmentFormGroup.addControl('timeEndControl', this.timeEndControl);

        this.appointmentFormGroup.addControl('carYearControl', this.carYearControl);
        this.appointmentFormGroup.addControl('carModelControl', this.carModelControl);
        this.appointmentFormGroup.addControl('messageControl', this.messageControl);

        this.appointmentFormGroup.addControl('firstNameControl', this.firstNameControl);
        this.appointmentFormGroup.addControl('secondNameControl', this.secondNameControl);
        this.appointmentFormGroup.addControl('emailControl', this.emailControl);
        this.appointmentFormGroup.addControl('phoneNumberControl', this.phoneNumberControl);

        this.appointmentFormGroup.addControl('transmissionCheckboxControl', this.transmissionCheckboxControl);
        this.appointmentFormGroup.addControl('vehicleMaintanceCheckboxControl', this.vehicleMaintanceCheckboxControl);
        this.appointmentFormGroup.addControl('vehicleRepairCheckboxControl', this.vehicleRepairCheckboxControl);
        this.appointmentFormGroup.addControl('otherCheckboxControl', this.otherCheckboxControl);
    }


    submitAppointment() {
        debugger;
        const d = new AppointmentDTO();

        d.Message = 'ggg';

        const d3 = new Date();

        d.StartTime = new Date().toLocaleString();

        d.User = new UserDTO();
        d.User.Email = 'gg.@mail';
        d.User.FirstName = 'name222';

        d.Car = new CarDTO();
        d.Car.CarModel = 'Hunday22';
        d.Car.Year = 2010;

        d.ServiceType = 'Other';

        if (this.appointmentFormGroup.invalid) {
            return;
        }

        const appointment = new AppointmentDTO();
        appointment.StartTime = this.dataStartControl.value + ' ' + this.timeStartControl.value;

        if (this.dataEndControl.valid && this.timeEndControl.valid) {
            appointment.EndTime = this.dataEndControl.valid + ' ' + this.timeEndControl.valid;
        }

        if (this.carYearControl.valid || this.carModelControl.valid) {
            appointment.Car = new CarDTO();

            if (this.carYearControl.valid) {
                appointment.Car.Year = this.carYearControl.value;
            }
            if (this.carModelControl.valid) {
                appointment.Car.CarModel = this.carModelControl.value;
            }
        }

        if (this.messageControl.valid) {
            appointment.Message = this.messageControl.value;
        }

        if (this.firstNameControl.valid ||
            this.secondNameControl.valid ||
            this.phoneNumberControl) {
            appointment.User = new UserDTO();
            
            appointment.User.Email = this.emailControl.value;
            appointment.User.FirstName = this.firstNameControl.value;
            appointment.User.SecondName = this.secondNameControl.value;
            appointment.User.PhoneNumber = this.phoneNumberControl.value;
        }

        this.transferService.postAppointment(d)
            .subscribe(
                (data: any) => {
                    console.log('good');
                },
                error => console.log(error)
            );
    }

    notifyUser() {
        if (this.emailNotifyControl.invalid) {
            return;
        }

        const user = new UserDTO();
        user.Email = this.emailNotifyControl.value;
        user.Notify = true;

        this.transferService.putUser(user)
            .subscribe(
                (data: any) => {
                    //check value
                    alert('good');
                    console.log('good');
                },
                error => {
                    alert('bad');
                    console.log(error)
                }
            );
    }

    clearInputs() {

    }
}
