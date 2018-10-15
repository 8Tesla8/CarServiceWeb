import { Component } from '@angular/core';
import { TransferService } from '../service/transfer.service';
import { UserDTO } from '../dto/userDTO';
import { AppointmentDTO } from '../dto/appointmentDTO';

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.css']
})

export class AppointmentComponent {

    // private transferService: TransferService;

    constructor(private transferService: TransferService) {
    }

    submitAppointment() {
        const d = new AppointmentDTO();

        this.transferService.get().subscribe(
            (data: any) => {
                console.log('good');
            },
            error => console.log(error)
        );

        // this.transferService.postAppointment(d)
        //     .subscribe(
        //         (data: any) => {
        //         },
        //         error => console.log(error)
        //     );
    }
}
