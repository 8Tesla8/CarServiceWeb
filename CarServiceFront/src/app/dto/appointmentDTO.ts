import { UserDTO } from './userDTO';
import { CarDTO } from './carDTO';

export class AppointmentDTO {
    public StartTime: string;
    public EndTime: string;

    public User: UserDTO;
    public Car: CarDTO;

    public ServiceType: string;
    public Message: string;
}
