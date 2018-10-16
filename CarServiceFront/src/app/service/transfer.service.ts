import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from '../dto/userDTO';
import { AppointmentDTO } from '../dto/appointmentDTO';

@Injectable({
    providedIn: 'root'
})
export class TransferService {

    private server = 'https://localhost:5001/api/';

    constructor(private http: HttpClient) { }

    postAppointment(appointment: AppointmentDTO) {
        return this.http.post(this.server + 'apointment', appointment);
    }

    getServiceType() {
        return this.http.get(this.server + 'servicetype');
    }

    putUser(user: UserDTO) {
        return this.http.put(this.server + 'user', user);
    }

    getCarModel() {
        return this.http.get(this.server + 'carmodel');
    }

    // test
    get() {
        return this.http.get(this.server + 'values');
    }
}
