
import { useParams } from "react-router-dom";
import { ReactEventHandler, useEffect, useState } from "react";
import type { ReservationType } from "../../../Types";
import { getReservationById, updateReservation } from "../../../Services/apiFacade";

export default function ReservationsDetailPage(){
    const { id } = useParams<{ id: string }>();
    const [reservation, setReservation] = useState<ReservationType | null>(null);

    useEffect(() => {
        const fetchReservations = async () => {
            const res = await getReservationById(Number(id));
            setReservation(res);
            setFormState(res)
        }
        fetchReservations();
        },[])

    const [formState, setFormState] = useState(reservation);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target) {
            setFormState(prevState => ({
            id: prevState?.id || 0,
            userId: prevState?.userId || 0,
            userMail: prevState?.userMail || '',
            bookingType: prevState?.bookingType || '',
            peopleAmount: prevState?.peopleAmount || 0,
            reservationDateTime: prevState?.reservationDateTime || new Date(),
            reservationLengthMinutes: prevState?.reservationLengthMinutes || 0,
            childFriendly: prevState?.childFriendly || false,
            [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
        }));
        }
    };

    const handleSubmit = () => {
        return (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (!formState) {
                return;
            }
            updateReservation(formState);
            console.log('Form submitted', formState);
        }
    };
    return (
        <div>
            <h1>Reservation Detail Page</h1>

            {/* Form for a reservation with input */}
            <form onSubmit={handleSubmit()}>
                <div>
                    <label>User ID:</label>
                    <input type="text" name="userId" value={reservation?.userId}onChange={handleChange} readOnly />
                </div>
                <div>
                    <label>User Mail:</label>
                    <input type="text" name="userMail" value={reservation?.userMail}onChange={handleChange} readOnly />
                </div>
                <div>
                    <label>Booking Type:</label>
                    <input type="text" name="bookingType" value={formState?.bookingType}onChange={handleChange} />
                </div>
                <div>
                    <label>People Amount:</label>
                    <input type="text" name="peopleAmount" value={formState?.peopleAmount} onChange={handleChange}/>
                </div>
                <div>
                    <label>Reservation Date Time:</label>
                    <input type="datetime-local" name="reservationDateTime" value={formState?.reservationDateTime ? new Date(formState?.reservationDateTime).toISOString().substring(0,16) : ''} onChange={handleChange}/>
                </div>
                <div>
                    <label>Reservation Length Minutes:</label>
                    <input type="text" name="reservationLengthMinutes" value={formState?.reservationLengthMinutes} onChange={handleChange}/>
                </div>
                <div>
                    <label>Child Friendly:</label>
                    <input type="checkbox" name="childFriendly" checked={formState?.childFriendly} onChange={handleChange}/>
                </div>
                <button>Delete</button>
                <button>Save</button>
            </form>
        </div>
    );
}