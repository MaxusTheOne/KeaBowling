import {
  Equipment,
  EquipmentDTO,
  Product,
  ScheduleDTO, Schedule,
} from "../Types";
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
  return fetch(API_URL + "/users/" + id, options).then(handleHttpErrors);
}

async function updateUser(user: UserToUpdate) {
  console.log("UserToUpdate", user);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("PUT", user, headers, true);

  return fetch(API_URL + "/users/" + user.username, options).then(
    handleHttpErrors
  );
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
    contentType: "application/json",
  };
  const options = makeOptions("PUT", reservation, headers, true);
  console.log("updateReservation", options);

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

async function getProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

async function reduceProductStock(productId: number, quantity: number) {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const options = makeOptions("PUT", null, headers, true);
    const response = await fetch(
      `${API_URL}/products/${productId}/reduceStock/${quantity}`,
      options
    );
    if (response.ok) {
      if (response.headers.get("content-type")?.includes("application/json")) {
        const data = await response.json();
        return data;
      }
      return null;
    } else {
      console.error(`Error with response: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
  }
}

async function getProductById(id: number) {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("GET", null, headers, true);
  return fetch(API_URL + "/products/" + id, options).then(handleHttpErrors);
}

async function updateProduct(product: Product) {
  console.log("updateProduct", product);
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("PUT", product, headers, true);
  return fetch(API_URL + "/products/" + product.id, options).then(
    handleHttpErrors
  );
}

async function deleteProduct(id: number) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("DELETE", null, headers, true);
  return fetch(API_URL + "/products/" + id, options).then(handleHttpErrors);
}

async function getSchedules() {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("GET", null, headers, true);
  const res = await fetch(API_URL + "/schedule", options).then(
    handleHttpErrors
  );
  return res;
}

async function createSchedule(schedule: ScheduleDTO) {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("POST", schedule, headers, true);
  return fetch(API_URL + "/schedule", options).then(handleHttpErrors);
}

async function getScheduleById(id: number) {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("GET", null, headers, true);
  return fetch(API_URL + "/schedule/" + id, options).then(handleHttpErrors);
}

async function updateSchedule(schedule: Schedule) {
  console.log("updateSchedule", schedule);
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("PUT", schedule, headers, true);
  return fetch(API_URL + "/schedule/" + schedule.id, options).then(
    handleHttpErrors
  );
}

async function deleteSchedule(id: number) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const options = makeOptions("DELETE", null, headers, true);
  return fetch(API_URL + "/schedule/" + id, options).then(handleHttpErrors);
}

async function getStaff() {
  try {
    const response = await fetch(`${API_URL}/users/role/STAFF`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

async function getAllStaff() {
  async function fetchData(role: string) {
    const response = await fetch(`${API_URL}/users/role/${role}`);
    return response.json();
  }

  try {
    const roles = ["STAFF", "RESERVATION_STAFF", "EQUIPMENT_OPERATOR", "ADMIN"];
    const data = await Promise.all(roles.map(fetchData));

    // Flatten the array and remove duplicates
    const uniqueData = [...new Set(data.flat())];

    return uniqueData;
  } catch (error) {
    console.error("Error fetching staff:", error);
  }
}

async function postProduct(product: Product) {
  const options = makeOptions("POST", product, undefined, true);
  return fetch(`${API_URL}/products`, options).then(handleHttpErrors);
}

// eslint-disable-next-line react-refresh/only-export-components
export {
  deleteUser,
  updateUser,
  createUser,
  getUserById,
  getUserReservations,
  deleteUserReservation,
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
  getProductById,
  updateProduct,
  deleteProduct,
  getSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
  getStaff,
  getAllStaff,
  createSchedule,
  reduceProductStock,
  postProduct,
};
