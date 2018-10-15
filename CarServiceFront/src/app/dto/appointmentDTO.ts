import { UserDTO } from './userDTO';
import { CarDTO } from './carDTO';

export class AppointmentDTO {
    public StartTime: Date;
    public EndTime: Date;

    public User: UserDTO;
    public Car: CarDTO;

    public ServiceType: string;
    public Message: string;

    constructor() {
        this.User = new UserDTO();
        this.Car = new CarDTO();
    }
}
