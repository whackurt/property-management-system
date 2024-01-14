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
import { tokens } from "../../../../theme";
import {
  DeletePropertyById,
  GetAllProperties,
  GetPropertyByUserId,
} from "../../services/propertiesServices";
import AdminPanelSettingsOutlined from "@mui/icons-material/AdminPanelSettingsOutlined";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";

const MyReports = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setNotification } = useStateContext();

  const [properties, setProperties] = useState([]);

  const handleCellClick = (params) => {
    const selectedRowIndex = params.row; // Adjust index based on your data
    setSelectedRow(selectedRowIndex);
    setDialogOpen(true);
  };

  const onDeleteClick = async (property) => {
    console.log(property);
    if (window.confirm("Are you sure you want to delete this report?")) {
      const res = await DeletePropertyById(property.id);
      if (res.status === 200) {
        setNotification("Report deleted successfully");
        getMyReports();
      }
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const getMyReports = async () => {
    const res = await GetPropertyByUserId(localStorage.getItem("id"));

    if (res.status === 200) {
      const fetchedProperties = res.data?.properties;

      setProperties(fetchedProperties);
      console.log(properties);
    }
  };

  useEffect(() => {
    getMyReports();
  }, []);

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
    { field: "feedback", headerName: "Feedback", align: "left", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      align: "left",
      flex: 2,
      renderCell: (params) => (
        <>
          <Link className="btn-edit" to={`/my-reports/edit/${params.row.id}`}>
            Edit
          </Link>
          &nbsp;
          <button
            className="btn-delete"
            onClick={(ev) => onDeleteClick(params.row)}
          >
            Delete
          </button>
        </>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      align: "center",
      flex: 2,
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            width="110%"
            p="2px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              status === "Accepted"
                ? colors.greenAccent[700]
                : status === "Denied"
                ? colors.redAccent[700]
                : colors.blueAccent[700]
            }
            borderRadius="4px"
          >
            <Typography color={colors.grey[100]}>{status}</Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="My Reports" subtitle="Submitted Reports" />
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

export default MyReports;
