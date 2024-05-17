import "./FullTable.css";
import { useState } from "react";

// PROPS
export type SchemaItem = {
  header: string;
  accessorKey: string;
  type: "string" | "number" | "date";
  backgroundColor?: string;
  searchByValue: boolean;
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
  const [searchTerm, setSearchTerm] = useState("");

  // Get accessor keys for fields where searchByValue is true
  const searchByValues = schema
    .filter((item) => item.searchByValue)
    .map((item) => item.accessorKey);

  // Search function
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filter data based on search term
  const filteredData = data.filter((item) =>
    searchByValues.some((key) => {
      const value = item[key as keyof T];
      return (
        (typeof value === "string" || typeof value === "number") &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  );

  return (
    <div id="admin-users-table-container">
      <div id="admin-users-table-header">
        <label htmlFor="admin-users-search">Søg:</label>
        <input
          type="text"
          id="admin-users-search"
          placeholder="Search"
          onChange={handleSearchChange}
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
            {schema.map((item) => (
              <th
                style={{ backgroundColor: item.backgroundColor }}
                key={item.accessorKey}
              >
                {item.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, i) => (
              <tr key={i}>
                {schema.map((schemaItem, index) => (
                  <td onClick={() => onClick(item)} key={index}>
                    {item[schemaItem.accessorKey as keyof T]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={schema.length}>No data found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div></div>
    </div>
  );
};

export default FullTable;
