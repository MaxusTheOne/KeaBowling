import "./FullTable.css";
import { useState } from "react";

// PROPS
export type SchemaItem = {
  header: string;
  accessorKey: string;
  type: "string" | "number" | "date";
};

export interface Props<T> {
  data: T[];
  schema: SchemaItem[];
  onClick: (value: T) => void;
}

// DATA -> FullTable -> Generic Objects array ->

const FullTable = <T extends object>({ data, schema, onClick }: Props<T>) => {
  // Interfaces

  // State
  const [dataItems, setDataItems] = useState(data);

  return (
    <div id="admin-users-table-container">
      <div id="admin-users-table-header">
        <label htmlFor="admin-users-search">Søg:</label>
        <input
          type="text"
          id="admin-users-search"
          placeholder="Search"
          // onChange={handleSearchChange}
        />
        <label htmlFor="admin-users-role-filter">Rolle:</label>
        <select
          name="role"
          id="admin-users-role-filter"
          // value={roleFilter}
          // onChange={handleRoleFilterChange}
        >
          <option value="all">Alle</option>
          <option value="ADMIN">Administrator</option>
          <option value="STAFF">Personale</option>
          <option value="USER">Bruger</option>
        </select>
        <button id="admin-users-add-user">Tilføj</button>
      </div>
      <table id="admin-users-table">
        <thead>
          <tr>
            {!!dataItems.length && (
              <>
                {Object.keys(dataItems[0]).map((item, index) => (
                  <th key={index}>
                    {item
                      .split("_")
                      .map((item) => item[0].toUpperCase() + item.slice(1))
                      .join(" ")}
                  </th>
                ))}
              </>
            )}
            {/* <th id="users-table-edit-header">Redigér</th>
            <th id="users-table-delete-header">Slet</th> */}
          </tr>
        </thead>
        <tbody>
          {!!dataItems.length && (
            <>
              {dataItems.map((item, i) => (
                <tr key={i}>
                  {Object.values(item).map((miniItem, index) => (
                    <td onClick={() => onClick(item)} key={index}>
                      {String(miniItem)}
                    </td>
                  ))}
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      <div></div>
    </div>
  );
};

export default FullTable;
