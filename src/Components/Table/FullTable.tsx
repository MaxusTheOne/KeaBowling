import "./FullTable.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";

// PROPS
export type SchemaItem = {
  header: string;
  accessorKey: string;
  type: "string" | "number" | "date" | "array";
  backgroundColor?: string;
  searchByValue: boolean;
};

export interface Props<T> {
  data: T[];
  schema: SchemaItem[];
  roleFilter?: boolean;
  createButton?: boolean;
  clickableItems?: boolean;
  error?: string;
}

// DATA -> FullTable -> Generic Objects array ->

const FullTable = <
  T extends {
    id: number;
    roles?: string[];
  }
>({
  data,
  schema,
  roleFilter = false,
  createButton = false,
  clickableItems = true,
  error,
}: Props<T>) => {
  // State
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [selectedRole, setSelectedRole] = useState<string>("all");

  // Get accessor keys for fields where searchByValue is true
  const searchByValues = schema
    .filter((item) => item.searchByValue)
    .map((item) => item.accessorKey);

  // Search function
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle sorting when headers are clicked.
  const handleHeaderClick = (field: string) => {
    if (sortField === field) {
      if (clickCount === 2) {
        // If the field has been clicked three times in a row, remove sorting
        setSortField(null);
        setClickCount(0);
      } else {
        // If the field has been clicked twice in a row, reverse the direction
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        setClickCount(clickCount + 1);
      }
    } else {
      // If a new field is clicked, sort by that field in ascending order
      setSortField(field);
      setSortDirection("asc");
      setClickCount(1);
    }
  };

  // Sort data based on sortField and sortDirection
  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;

    const schemaItem = schema.find((item) => item.accessorKey === sortField);
    if (!schemaItem) return 0;

    const valueA = a[sortField as keyof T];
    const valueB = b[sortField as keyof T];

    // If either value is missing, don't compare them
    if (valueA === undefined || valueB === undefined) return 0;

    let comparison = 0;

    if (schemaItem.type === "number") {
      comparison = (valueA as number) - (valueB as number);
    } else if (schemaItem.type === "string") {
      comparison = (valueA as string).localeCompare(
        valueB as string,
        undefined,
        { numeric: true }
      );
    } else if (schemaItem.type === "date") {
      comparison =
        new Date(valueA as string).getTime() -
        new Date(valueB as string).getTime();
    } else if (schemaItem.type === "array") {
      // If the value is an array, compare the first elements
      if (
        Array.isArray(valueA) &&
        valueA.length > 0 &&
        typeof valueA[0] === "string" &&
        Array.isArray(valueB) &&
        valueB.length > 0 &&
        typeof valueB[0] === "string"
      ) {
        comparison = valueA[0].localeCompare(valueB[0], undefined, {
          numeric: true,
        });
      } else if (
        Array.isArray(valueA) &&
        Array.isArray(valueB) &&
        valueA.length === 0 &&
        valueB.length === 0
      ) {
        // If both arrays are empty, they are equal
        comparison = 0;
      } else if (Array.isArray(valueA) && valueA.length === 0) {
        // If valueA is an empty array, it is considered smaller
        comparison = -1;
      } else if (Array.isArray(valueB) && valueB.length === 0) {
        // If valueB is an empty array, it is considered smaller
        comparison = 1;
      }
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Filter data based on search term and selected role
  const filteredData = sortedData.filter((item) => {
    const matchesSearchTerm = searchByValues.some((key) => {
      const value = item[key as keyof T];
      return (
        (typeof value === "string" || typeof value === "number") &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    const matchesRole =
      selectedRole === "all" ||
      (item.roles && item.roles.includes(selectedRole));

    return matchesSearchTerm && matchesRole;
  });

  // Handle role filter change
  const handleRoleFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedRole(event.target.value);
  };

  // Handle add click
  const handleAddClick = () => {
    const currentPath = location.pathname;
    navigate(`${currentPath}/add`);
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <label htmlFor="table-search">Search:</label>
        <input
          type="text"
          id="table-search"
          placeholder="Search"
          onChange={handleSearchChange}
        />
        {roleFilter && (
          <>
            <label htmlFor="table-role-filter">Role:</label>
            <select
              name="role"
              id="table-role-filter"
              value={selectedRole}
              onChange={handleRoleFilterChange}
            >
              <option value="all">All</option>
              <option value="ADMIN">Administrator</option>
              <option value="STAFF">Staff</option>
              <option value="USER">User</option>
            </select>
          </>
        )}
        {createButton && (
          <button className="add-button" onClick={handleAddClick}>
            Add
          </button>
        )}
      </div>
      <table className="data-table">
        <thead>
          <tr>
            {schema.map((item) => (
              <th
                style={{ backgroundColor: item.backgroundColor }}
                key={item.accessorKey}
                onClick={() => handleHeaderClick(item.accessorKey)}
              >
                {item.header}
                {sortField === item.accessorKey
                  ? sortDirection === "asc"
                    ? " ▲"
                    : " ▼"
                  : " —"}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            filteredData.map((item, i) => (
              <tr key={i}>
                {schema.map((schemaItem, index) => (
                  <td
                    key={index}
                    onClick={() =>
                      clickableItems
                        ? navigate(location.pathname + "/" + item.id)
                        : null
                    }
                  >
                    {schemaItem.accessorKey === "roles"
                      ? item.roles?.join(", ") ?? ""
                      : schemaItem.type === "date" &&
                        item[schemaItem.accessorKey as keyof T]
                      ? format(
                          item[schemaItem.accessorKey as keyof T] as Date,
                          "MM/dd/yyyy"
                        )
                      : item[schemaItem.accessorKey as keyof T]?.toString() ??
                        ""}
                    {schemaItem.accessorKey === "price" ? " kr." : ""}
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
      {error ? <p>{error}</p> : null}
      <div></div>
    </div>
  );
};

export default FullTable;
