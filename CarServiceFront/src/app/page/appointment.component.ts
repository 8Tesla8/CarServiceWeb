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

    public carModel: Array<string>;

    emailNotifyControl = new FormControl('', [Validators.required, Validators.email]);


    appointmentFormGroup = new FormGroup({});

    dataStartControl = new FormControl('', [Validators.required]);
    timeStartControl = new FormControl('', [Validators.required]);

    dataEndControl = new FormControl('');
    timeEndControl = new FormControl('');

    // car info
    carYearControl = new FormControl('');
    carModelControl = new FormControl('');
    messageControl = new FormControl('');

    // personal info
    firstNameControl = new FormControl('', [Validators.required]);
    secondNameControl = new FormControl('');
    emailControl = new FormControl('', [Validators.required, Validators.email]);
    phoneNumberControl = new FormControl('');

    // service type
    transmissionCheckboxControl = new FormControl('');
    vehicleMaintanceCheckboxControl = new FormControl('');
    vehicleRepairCheckboxControl = new FormControl('');
    otherCheckboxControl = new FormControl('');


    constructor(private transferService: TransferService) {
    }

    ngOnInit(): void {
        this.transferService.getCarModel().
            subscribe(
                (responce: Array<string>) => {
                    this.carModel = responce;
                },
                error => {
                    alert('Server error.');
                }
            );

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
        if (this.appointmentFormGroup.invalid) {
            return;
        }

        const appointment = new AppointmentDTO();
        appointment.StartTime = this.dataStartControl.value + ' ' + this.timeStartControl.value;
        appointment.EndTime = this.dataEndControl.value + ' ' + this.timeEndControl.value;

        if (this.carYearControl.value !== '' || this.carModelControl.value !== '') {
            appointment.Car = new CarDTO();

            if (this.carYearControl.value !== '') {
                appointment.Car.Year = parseInt(this.carYearControl.value);
            }
            if (this.carModelControl.value !== '') {
                appointment.Car.CarModel = this.carModelControl.value;
            }
        }

        appointment.Message = this.messageControl.value;

        appointment.User = new UserDTO();

        appointment.User.Email = this.emailControl.value;
        appointment.User.FirstName = this.firstNameControl.value;
        appointment.User.SecondName = this.secondNameControl.value;
        appointment.User.PhoneNumber = this.phoneNumberControl.value;

        // checkboxes values
        if (this.transmissionCheckboxControl.value !== '') {
            appointment.ServiceType = 'Transmission';
        } else if (this.vehicleMaintanceCheckboxControl.value !== '') {
            appointment.ServiceType = 'Vehicle Maintance';
        } else if (this.vehicleRepairCheckboxControl.value !== '') {
            appointment.ServiceType = 'Vehicle Repair';
        } else if (this.otherCheckboxControl.value !== '') {
            appointment.ServiceType = 'Other';
        }

        this.transferService.postAppointment(appointment)
            .subscribe(
                (responce: boolean) => {
                    if (responce) {
                        alert('Your appointment is creted.');
                    } else {
                        alert('We can not create appointment on this time, change time.');
                    }
                },
                error => {
                    alert('Server error.');
                }
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
                (responce: boolean) => {
                    if (responce) {
                        alert('User will be notified.');
                    } else {
                        alert('Can not notify this user.');
                    }
                },
                error => {
                    alert('Server error.');
                }
            );
    }

    clearInputs() {
        this.dataStartControl.setValue('');
        this.timeStartControl.setValue('');

        this.dataEndControl.setValue('');
        this.timeEndControl.setValue('');

        // car info
        this.carYearControl.setValue('');
        this.carModelControl.setValue('');
        this.messageControl.setValue('');

        // personal info
        this.firstNameControl.setValue('');
        this.secondNameControl.setValue('');
        this.emailControl.setValue('');
        this.phoneNumberControl.setValue('');

        // service type
        this.transmissionCheckboxControl.setValue('');
        this.vehicleMaintanceCheckboxControl.setValue('');
        this.vehicleRepairCheckboxControl.setValue('');
        this.otherCheckboxControl.setValue('');
    }
}
