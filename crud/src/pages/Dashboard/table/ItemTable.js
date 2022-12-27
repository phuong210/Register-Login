import { Button } from "react-bootstrap";

const ItemTable = ({ user, handleClickEditModal, handleClickDeleteModal }) => {
  return (
    <>
      {user.length > 0 &&
        user.map((item, key) => (
          <tr key={key}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.tel}</td>
            <td>{item.address}</td>
            <td>{item.description}</td>
            <td>
              <Button
                variant={"success"}
                onClick={() => handleClickEditModal(item.id)}
              >
                Edit
              </Button>
              <Button
                variant={"danger"}
                onClick={() => handleClickDeleteModal(item.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
    </>
  );
};
export default ItemTable;
