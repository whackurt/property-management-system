import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { GetUsers } from "../../services/userServices";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "contact_number",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            width="60%"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              status === "admin"
                ? colors.blueAccent[700]
                : status === "manager"
                ? colors.blueAccent[700]
                : colors.blueAccent[700]
            }
            borderRadius="4px"
          >
            {status === "Admin" && <AdminPanelSettingsOutlinedIcon />}
            {status === "Manager" && <SecurityOutlinedIcon />}
            {status === "Establishment" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {status}
            </Typography>
          </Box>
        );
      },
    },
  ];

  const [accounts, setAccounts] = useState([]);

  const getAccounts = async () => {
    const res = await GetUsers();

    // console.log(res);

    if (res.status === 200) {
      setAccounts(res.data?.users);
    }
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <Box m="20px 20px 0 20px">
      <Header title="Accounts" subtitle="Team Members" />
      <Box
        height="75vh"
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
          rows={accounts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Team;
