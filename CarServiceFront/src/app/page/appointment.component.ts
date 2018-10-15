import { Component } from '@angular/core';
import { TransferService } from '../service/transfer.service';
import { UserDTO } from '../dto/userDTO';

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.css']
})

export class AppointmentComponent {

    constructor(private transferService: TransferService) { }

    submit(user: UserDTO) {
        this.transferService.postData(user)
            .subscribe(
                (data: UserDTO) => { this.receivedUser = data; this.done = true; },
                error => console.log(error)
            );
    }
}
