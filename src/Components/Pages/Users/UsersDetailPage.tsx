import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { deleteUser, getUserById, updateUser } from "../../../Services/apiFacade";


interface UserToUpdate {
    id: number;
    email: string;
    roles: string;
    username: string;
    password: string;
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
        password: "",
    });

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getUserById(Number(id));
            setUser({ ...res });
            setFormState({
                ...res,
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
        <div>
            <h1>User Detail Page</h1>

            {/* Form for a User with input */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID:</label>
                    <input
                        type="text"
                        name="id"
                        value={user?.id}
                        onChange={handleChange}
                        readOnly
                        required
                    />
                </div>
                 <div>
                    <label>Created:</label>
                    <input
                        type="dateTime-local"
                        name="Date Created"
                        value={formState?.created.toString()}
                        readOnly
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={formState?.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Roles:</label>
                    <input
                        type="text"
                        name="roles"
                        value={formState?.roles}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formState?.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button onClick={handleDelete}>Delete</button>
                <button>Save</button>
            </form>
        </div>
    );
}
