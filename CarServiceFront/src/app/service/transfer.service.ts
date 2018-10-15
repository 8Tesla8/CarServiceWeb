import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UserDTO } from '../dto/userDTO';

@Injectable()
export class TransferService {

    constructor(private http: HttpClient) { }

    postData(user: UserDTO) {
        const body = {name: user.FirstName, age: user.SecondName};
        return this.http.post('http://localhost:60820/api/values', body);
    }
}
