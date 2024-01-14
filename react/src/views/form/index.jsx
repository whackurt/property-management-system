import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client.js";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider.jsx";
import { useDropzone } from "react-dropzone";
import { CreateUser, UpdateUser } from "../../services/userServices.js";

const UserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setNotification } = useStateContext();
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    status: "",
    contact: "",
    address: "",
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient
        .get(`/user/${id}`)
        .then(({ data }) => {
          // console.log(data);
          setLoading(false);
          setUser(data.user_data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const onDrop = (acceptedFiles) => {
    // Handle dropped files (acceptedFiles)
    console.log(acceptedFiles);
    // You can set the selected image file to the form values or perform other actions here
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Specify accepted file types (images in this case)
    multiple: false, // Allow only a single file to be dropped
  });

  const onSubmit = async (values) => {
    const { password, password_confirmation, ...rest } = values;

    if (id) {
      const updates = {};

      if (values.name) updates.name = values.name;
      if (values.email) updates.email = values.email;
      if (values.contact_number) updates.contact_number = values.contact_number;

      if (values.password && values.password === values.password_confirmation)
        updates.password = values.password;
      if (values.status) updates.status = values.status;
      if (values.address) updates.address = values.address;

      // console.log(updates);

      if (updates) {
        const res = await UpdateUser(id, updates);

        if (res.status === 200) {
          setNotification("User updated successfully");
          goBackToProfiles();
        }
      }
    } else {
      // console.log(values);

      const res = await CreateUser({
        name: values.name,
        email: values.email,
        password: values.password,
        contact_number: values.contact_number,
        status: values.status,
        address: values.address,
      });

      if (res.status === 201) {
        setNotification("User created successfully");
        goBackToProfiles();
      }
    }
  };

  const goBackToProfiles = () => {
    navigate("/form");
  };

  const validationSchema = yup.object().shape({
    name: id ? yup.string() : yup.string().required("Name is required"),
    email: id
      ? yup.string().email("invalid email")
      : yup.string().email("invalid email").required("Email is required"),
    password: id
      ? yup.string()
      : yup
          .string()
          .required("Email is required")
          .min(8, "Password must be at least 8 characters"),
    password_confirmation: id
      ? yup.string().oneOf([yup.ref("password"), null], "Passwords must match")
      : yup
          .string()
          .oneOf([yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
    status: id ? yup.string() : yup.string().required("Status is required"),
    address: id ? yup.string() : yup.string().required("Address is required"),
    contact_number: id
      ? yup.string()
      : yup.string().required("Contact Number is required"),
  });

  return (
    <Box m="20px">
      <Formik
        onSubmit={onSubmit}
        initialValues={{
          name: user.name || "",
          email: user.email || "",
          password: "",
          password_confirmation: "",
          status: user?.status,
          address: "",
          contact_number: "",
        }}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap="20px">
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                gap="20px"
              >
                <div>
                  {id ? (
                    <Header title={`Update User: ${user?.name}`} />
                  ) : (
                    <Header
                      title="New User"
                      subtitle="Create a New User Profile"
                    />
                  )}
                </div>
              </Box>

              <Box
                display="grid"
                gap="20px"
                gridTemplateColumns="repeat(5, minmax(0, 1fr))"
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Name"
                  placeholder={user?.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  placeholder={user?.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  placeholder={user?.contact_number}
                  label="Contact Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contact_number}
                  name="contact_number"
                  error={!!touched.contact_number && !!errors.contact_number}
                  helperText={touched.contact_number && errors.contact_number}
                  sx={{ gridColumn: "span 1" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password Confirmation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password_confirmation}
                  name="password_confirmation"
                  error={
                    !!touched.password_confirmation &&
                    !!errors.password_confirmation
                  }
                  helperText={
                    touched.password_confirmation &&
                    errors.password_confirmation
                  }
                  sx={{ gridColumn: "span 2" }}
                />

                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 1" }}
                >
                  <InputLabel htmlFor="status" shrink>
                    Status
                  </InputLabel>
                  <Select
                    fullWidth
                    native
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputProps={{
                      name: "status",
                      id: "status",
                    }}
                    error={!!touched.status && !!errors.status}
                  >
                    <option value="">Select Status</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Establishment">Establishment</option>
                  </Select>
                  {touched.status && errors.status && (
                    <FormHelperText error>{errors.status}</FormHelperText>
                  )}
                </FormControl>
              </Box>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                placeholder={user?.address}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="end"
              mt="20px"
              paddingRight="10px"
            >
              <Button
                onClick={goBackToProfiles}
                variant="outlined"
                style={{
                  marginRight: "10px",
                  borderRadius: "5px",
                  backgroundColor: "green",
                  color: "white",
                }}
              >
                Back to Profiles
              </Button>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                style={{ borderRadius: "5px", backgroundColor: "green" }}
                onClick={() => console.log(values)}
              >
                {id ? "Update User" : "Create New User"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default UserForm;
