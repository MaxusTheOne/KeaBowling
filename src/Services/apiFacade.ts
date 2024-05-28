import { Equipment, EquipmentDTO } from "../Types";
import { ReservationType } from "../Types";
import { API_URL } from "../settings";
import { User, UserToUpdate } from "./authFacade";
import { makeOptions, handleHttpErrors } from "./fetchUtils";

async function getUsers() {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("GET", null, headers, true);
  const res = await fetch(API_URL + "/users", options).then(handleHttpErrors);
  return res;
}

// Get all equipment
async function getEquipment() {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("GET", null, headers, true);
  return fetch(API_URL + "/equipment", options).then(handleHttpErrors);
}
async function getEquipmentById(id: number) {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("GET", null, headers, true);
  return fetch(API_URL + "/equipment/" + id, options).then(handleHttpErrors);
}
async function updateEquipment(equipment: Equipment) {
  console.log("updateEquipment", equipment);
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("PUT", equipment, headers, true);
  return fetch(API_URL + "/equipment/" + equipment.id, options).then(
    handleHttpErrors
  );
}
async function deleteEquipment(id: number) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("DELETE", null, headers, true);
  return fetch(API_URL + "/equipment/" + id, options).then(handleHttpErrors);
}

// Create equipment
async function postEquipment(equipment: EquipmentDTO): Promise<Equipment> {
  const options = makeOptions("POST", equipment, undefined, true);
  return fetch(`${API_URL}/equipment`, options).then(handleHttpErrors);
}

async function deleteUser(id: number) {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("DELETE", null, headers, true);
  return fetch(API_URL + "/users/" + id, options).then(
    handleHttpErrors
  );
}

async function updateUser(user: UserToUpdate) {
  console.log("updateUser", user);
  
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("PUT", user, headers, true);
  return fetch(
    API_URL + "/users/" + user.username,
    options
  ).then(handleHttpErrors);
}
async function getUserById(id: number) {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("GET", null, headers, true);
  return fetch(API_URL + "/users/" + id, options).then(handleHttpErrors);
}

async function createUser(user: User) {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("POST", user, headers, true);
  return fetch(API_URL + "/users", options).then(handleHttpErrors);
}

async function getReservations(): Promise<ReservationType[]> {
  console.log("getReservations");

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("GET", null, headers, true);
  const results = fetch(API_URL + "/reservations", options).then(
    handleHttpErrors
  );
  console.log("results", results);
  return results;
}

async function getReservationById(id: number): Promise<ReservationType> {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("GET", null, headers, true);
  return fetch(API_URL + "/reservations/" + id, options).then(handleHttpErrors);
}

async function updateReservation(reservation: {
  reservationDateTime: string;
  id: number;
  bookingType: string;
  peopleAmount: number;
  childFriendly: boolean;
  reservationLengthMinutes: number;
}) {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("PUT", reservation, headers, true);
  return fetch(API_URL + "/reservations/" + reservation.id, options).then(
    handleHttpErrors
  );
}

async function getUserReservations() {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("GET", null, headers, true);
  return fetch(API_URL + "/reservations/user", options).then(handleHttpErrors);
}

async function deleteUserReservation(id: number) {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("DELETE", null, headers, true);
  const response = await fetch(API_URL + "/reservations/" + id, options);

  if (!response.ok) {
    return handleHttpErrors(response);
  }

  const data = await response.text();

  if (!data) {
    return null;
  }

  return JSON.parse(data);
}

async function getShowing(id: number) {
  try {
    const response = await fetch(`${API_URL}/showings/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching showing:", error);
  }
}

async function getProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export {
  deleteUser,
  updateUser,
  createUser,
  getUserById,
  getUserReservations,
  deleteUserReservation,
  getShowing,
  getUsers,
  getReservationById,
  updateReservation,
  getReservations,
  getEquipment,
  getEquipmentById,
  postEquipment,
  updateEquipment,
  deleteEquipment,
  getProducts,
};
