import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteSchedule, getScheduleById, updateSchedule } from "../../../Services/apiFacade";
import type { Schedule } from "../../../Types";

export default function ScheduleDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState<Schedule>({
        id: 0,
        username: "",
        start: new Date(),
        end: new Date(),
    });

    useEffect(() => {
        const fetchSchedule = async () => {
            const res = await getScheduleById(Number(id));
            setSchedule({ ...res });
            setFormState({
                ...res,
            });
        };
        fetchSchedule();
    }, [id]);

    const [formState, setFormState] = useState({
        ...schedule,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (!schedule) {
            return;
        }
        setFormState((prevState) => {
            const defaultState = prevState || {
                ...schedule,
            };
            return {
                ...defaultState,
                [name]: value,
            };
        });
    };

    const handleSubmit = () => {
        return (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (!schedule) {
                return;
            }
            updateSchedule(formState);
            navigate("/schedule");
        };
    };

    const handleDelete = () => {
        return () => {
            if (!schedule) {
                return;
            }
            deleteSchedule(schedule.id);
            navigate("/schedule");
        };
    };

    return (
        <div>
            {/* Form for a Schedule with input */}
            <form onSubmit={handleSubmit()} id="schedule-form-container" className="form-container">
                <h1>Schedule Detail Page</h1>
                <label className="form-label">ID: {schedule?.id}</label>
                

                <label className="form-label">Username:</label>
                <input
                    type="text"
                    name="username"
                    value={schedule?.username}
                    onChange={handleChange}
                    readOnly
                    required
                    className="form-input"
                />

                <label className="form-label">Start:</label>
                <input
                    type="datetime-local"
                    name="start"
                    value={formState?.start.toString()}
                    onChange={handleChange}
                    required
                    className="form-input"
                />

                <label className="form-label">End:</label>
                <input
                    type="datetime-local"
                    name="end"
                    value={formState?.end.toString()}
                    onChange={handleChange}
                    required
                    className="form-input"
                />

                <div className="choice-container">
                    <button onClick={handleDelete()} className="delete-button">
                        Delete
                    </button>
                    <button className="save-button">Save</button>
                </div>
            </form>
        </div>
    );
}
