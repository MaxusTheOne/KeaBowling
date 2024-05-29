import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { deleteUser, getUserById, updateUser } from "../../../Services/apiFacade";
import "./UserDetailPage.css";


interface UserToUpdate {
    id: number;
    email: string;
    roles: string;
    username: string;
    created: Date;
}

export default function UsersDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<UserToUpdate>({
        id: 0,
        created: new Date(),
        email: "",
        roles: "",
        username: "",
    });

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getUserById(Number(id));
            setUser({ ...res });
            setFormState({
                ...res,
                roles: res.roles.join(" "),
            });
            console.log(res);
        };
        fetchUser();
        
    }, [id]);

    const [formState, setFormState] = useState({
        ...user,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (!user) {
            return;
        }
        setFormState((prevState) => {
            const defaultState = prevState || {
                ...user,
            };
            return {
                ...defaultState,
                [name]: value,
            };
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user) {
            return;
        }
        updateUser({...formState, roles: formState.roles.split(" ")});
    };

    const handleDelete = () => {
        if (!user) {
            return;
        }
        deleteUser(user.id);
    };

    return (
        <div className="user-detail-page">

            {/* Form for a User with input */}
            <form id="user-form-container" className="form-container" onSubmit={handleSubmit}>
                <h1>User Detail Page</h1>
                <label className="form-label">ID:</label>
                <input
                    className="form-input"
                    type="text"
                    name="id"
                    value={user?.id}
                    onChange={handleChange}
                    readOnly
                    required
                />
                <label className="form-label">Created:</label>
                <input
                    className="form-input"
                    type="dateTime-local"
                    name="Date Created"
                    value={formState?.created.toString()}
                    readOnly
                />
                <label className="form-label">Email:</label>
                <input
                    className="form-input"
                    type="text"
                    name="email"
                    value={formState?.email}
                    onChange={handleChange}
                    required
                />
                <label className="form-label">Roles:</label>
                <input
                    className="form-input"
                    type="text"
                    name="roles"
                    value={formState?.roles}
                    onChange={handleChange}
                />
                <label className="form-label">Username:</label>
                <input
                    className="form-input"
                    type="text"
                    name="username"
                    value={formState?.username}
                    onChange={handleChange}
                    required
                />
                <div className="choice-container">
                    <button className="delete-button" onClick={handleDelete}>Delete</button>
                    <button className="save-button">Save</button>
                </div>
            </form>
        </div>
    );
}
