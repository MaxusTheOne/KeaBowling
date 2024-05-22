
import { useParams } from "react-router-dom";

export default function ReservationsDetailPage(){
    const { id } = useParams<{ id: string }>();
    return (
        <div>
            <h1>Reservation Detail Page</h1>

            <h3>this is page number: {id}</h3>
        </div>
    );
}