import { Reservation } from "../../../Types";

interface props {
  data: Reservation;
  index: number;

}

const ReservationsTable: React.FC<props> = ({ data, index }) => {
  return (
    <tr key={index}>
      <td>{data.bookingInformation?.id}</td>
      <td>{data.user?.name}</td>
      <td>{data.user?.date_created.toLocaleString("da-DK")}</td>
      <td>{data.user?.date_edited?.toLocaleString("da-DK")}</td>
      <td className="list-button">
      <Button onClick={() => handleEditClick(item.userData ? item.userData)}>
        <EditIcon />
      </Button>
    </td>
      <td className="list-button">
        <Button color="error" onClick={() => handleDeleteClick(item.username)}>
          <DeleteIcon />
        </Button>
      </td>
    </tr>
  );
};

export default ReservationsTableItem;
