import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { mockDataContacts } from "../../data/mockData";
import { tokens } from "../../../../theme";
import { GetAllProperties } from "../../services/propertiesServices";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "articles", headerName: "Articles", align: "left", flex: 2 },
    {
      field: "description",
      headerName: "Description",
      align: "left",
      flex: 2,
    },
    {
      field: "accountable_person",
      headerName: "Accountable Person",
      align: "left",
      flex: 2,
    },
    {
      field: "date_of_assumption",
      headerName: "Date of Assumption",
      align: "left",
      flex: 2,
    },
    {
      field: "quantity_per_property",
      headerName: "Quantity per Property",
      align: "left",
      flex: 2,
    },
    {
      field: "quantity_per_physical",
      headerName: "Quantity per Physical",
      align: "left",
      flex: 2,
    },
    {
      field: "shortage_overage_quantity",
      headerName: "Shortage/Overage Quantity",
      align: "left",
      flex: 2,
    },
    {
      field: "shortage_overage_value",
      headerName: "Shortage/Overage Value",
      align: "left",
      flex: 2,
    },
    {
      field: "unit_of_measure",
      headerName: "Unit of Measure",
      align: "left",
      flex: 2,
    },
    { field: "unit_value", headerName: "Unit Value", align: "left", flex: 2 },
    {
      field: "physical_value",
      headerName: "Physical Value",
      align: "left",
      flex: 2,
    },
    {
      field: "property_number",
      headerName: "Property Number",
      align: "left",
      flex: 2,
    },
    { field: "remarks", headerName: "Remarks", align: "left", flex: 2 },
    {
      field: "registrar_user",
      headerName: "Registrar",
      align: "left",
      flex: 2,
    },
  ];

  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [properties, setProperties] = useState([]);

  const handleCellClick = (params) => {
    const selectedRowIndex = params.row; // Adjust index based on your data
    setSelectedRow(selectedRowIndex);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const getAllProperties = async () => {
    const res = await GetAllProperties();

    if (res.status === 200) {
      const fetchedProperties = res.data?.properties.filter(
        (prop) => prop.status === "Accepted"
      );

      var reformatted = fetchedProperties.map((prop) => ({
        ...prop,
        registrar_user: prop.registrar_user?.name,
      }));

      setProperties(reformatted);
    }
  };

  useEffect(() => {
    getAllProperties();
  }, []);

  return (
    <Box m="20px">
      <Header title="Properties" subtitle="Properties Information" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        width="100%"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.greenAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.greenAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={properties}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onCellClick={handleCellClick}
        />
      </Box>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogContent>
          {selectedRow && (
            <div>
              <Typography variant="h6">Selected Property</Typography>
              <ul>
                {columns.map((column) => (
                  <li key={column.field}>
                    <strong>{column.headerName}:</strong>{" "}
                    {selectedRow[column.field]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Contacts;
