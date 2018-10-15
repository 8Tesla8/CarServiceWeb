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

    postData(user: UserDTO) {
        const body = { name: user.FirstName, age: user.SecondName };
        return this.http.post('http://localhost:60820/api/values', body);
    }

    postAppointment(appointment: AppointmentDTO) {
        return this.http.post(this.server + 'apointment', appointment);
    }

    get() {
        return this.http.get(this.server + 'values');
    }
}
