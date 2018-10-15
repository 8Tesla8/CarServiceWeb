import { Component } from '@angular/core';
import { TransferService } from '../service/transfer.service';
import { UserDTO } from '../dto/userDTO';
import { AppointmentDTO } from '../dto/appointmentDTO';
import { CarDTO } from '../dto/carDTO';

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.css']
})

export class AppointmentComponent {

    constructor(private transferService: TransferService) {
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
}
