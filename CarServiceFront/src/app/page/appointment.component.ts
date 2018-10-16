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

    constructor(private transferService: TransferService) {
    }

    ngOnInit(): void {
        console.log("init");
        // this.notifyFormGroup.addControl('emailNotifyControl', this.emailNotifyControl);
    }

    submitAppointment() {
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
        // this.transferService.get().subscribe(
        //     (data: any) => {
        //         debugger;
        //         console.log('good');
        //     },
        //     error => console.log(error)
        // );

        // this.transferService.getServiceType().subscribe(
        //     (data: any) => {
        //         debugger;
        //         console.log('good');
        //     },
        //     error => console.log(error)
        // );

        this.transferService.postAppointment(d)
            .subscribe(
                (data: any) => {
                    console.log('good');
                },
                error => console.log(error)
            );
    }

    notifyUser() {
        //
        const u = new UserDTO();
        u.Email = 'my@vail.com';
        u.Notify = true;

        this.transferService.putUser(u)
            .subscribe(
                (data: any) => {
                    console.log('good');
                },
                error => console.log(error)
            );
    }

    clearInputs() {

    }
}
