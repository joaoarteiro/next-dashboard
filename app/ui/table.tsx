import { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

type HeadCell = {
  label: string;
  show: boolean;
};

type TableProps = {
  headCells: HeadCell[];
  body: { [key: string]: ReactNode }[];
};

const MuiTable = ({ headCells, body }: TableProps) => {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {body.map((row, index) => (
              <div key={index} className="mb-2 w-full rounded-md bg-white p-4">
                {headCells.map((header, idx) => (
                  <div key={idx}>
                    <span>{row[header.label.toLowerCase()] || ""}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <Table
            aria-label="simple table"
            sx={{
              display: "none",
              minWidth: "100%",
              color: "rgb(55, 65, 81)",
              "@media (min-width: 768px)": {
                display: "table",
              },
            }}
          >
            <TableHead
              sx={{
                backgroundColor: "#F9FAFB",
                borderRadius: "0.5rem",
                textAlign: "left",
                fontSize: "0.875rem",
                fontWeight: 400,
              }}
            >
              <TableRow>
                {headCells.map((header, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      borderBottom: "none",
                      fontFamily: "Inter,Inter Fallback",
                    }}
                    align="left"
                  >
                    {header.show && header.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                backgroundColor: "white",
                borderRadius: "0.5rem",
              }}
            >
              {body.map((row, index) => (
                <TableRow key={index}>
                  {headCells.map((header, idx) => (
                    <TableCell
                      key={idx}
                      align="left"
                      sx={{ fontFamily: "Inter,Inter Fallback" }}
                    >
                      {row[header.label.toLowerCase()] || ""}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default MuiTable;
