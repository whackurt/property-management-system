import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  useMediaQuery,
  MenuItem,
  Typography,
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
import {
  GetPropertyById,
  UpdatePropertyById,
} from "../../services/propertiesServices.js";

const EditReport = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { setNotification } = useStateContext();
  const [property, setProperty] = useState({});

  const handleFormSubmit = async (values, { resetForm }) => {
    const updates = {
      status: "Pending",
    };

    if (values.articles) updates.articles = values.articles;
    if (values.description) updates.description = values.description;
    if (values.accountablePerson)
      updates.accountable_person = values.accountablePerson;
    if (values.dateOfAssumption)
      updates.date_of_assumption = values.dateOfAssumption;
    if (values.quantityPerProperty)
      updates.quantity_per_property = values.quantityPerProperty;
    if (values.quantityPerPhysical)
      updates.quantity_per_physical = values.quantityPerPhysical;
    if (values.shortageOverageQuantity)
      updates.shortage_overage_quantity = values.shortageOverageQuantity;
    if (values.shortageOverageValue)
      updates.shortage_overage_value = values.shortageOverageValue;
    if (values.unitOfMeasure) updates.unit_of_measure = values.unitOfMeasure;
    if (values.unitValue) updates.unit_value = values.unitValue;
    if (values.physicalValue) updates.physical_value = values.physicalValue;
    if (values.propertyNumber) updates.property_number = values.propertyNumber;
    if (values.remarks) updates.remarks = values.remarks;

    const res = await UpdatePropertyById(id, updates);

    if (res.status === 200) {
      setNotification("Property updated successfully");
      resetForm();
      goBackToReports();
    }

    console.log(res);

    // console.log(updates);
  };

  const goBackToReports = () => {
    navigate("/my-reports");
  };

  const getProperty = async () => {
    const res = await GetPropertyById(id);

    if (res.status === 200) {
      setProperty(res.data?.property);
    }
  };

  useEffect(() => {
    // console.log(initialValues);
    getProperty();
  }, [initialValues]);

  return (
    <Box m="20px">
      <Header title="EDIT REPORT" subtitle="EDIT PROPERTY INFORMATION" />

      <Formik
        onSubmit={(values, { resetForm }) =>
          handleFormSubmit(values, { resetForm })
        }
        initialValues={initialValues}
        validationSchema={checkoutSchema}
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
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <Typography variant="body2" style={{ fontSize: "20px" }}>
                Status: {property?.status}
              </Typography>
              <Typography variant="body2" style={{ fontSize: "20px" }}>
                {property.status === "Accepted"
                  ? null
                  : `Feedback: ${property?.feedback}`}
              </Typography>
              <br />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Articles"
                placeholder={property?.articles}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.articles}
                name="articles"
                error={!!touched.articles && !!errors.articles}
                helperText={touched.articles && errors.articles}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                placeholder={property?.description}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Accountable Person"
                placeholder={property?.accountable_person}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.accountablePerson}
                name="accountablePerson"
                error={
                  !!touched.accountablePerson && !!errors.accountablePerson
                }
                helperText={
                  touched.accountablePerson && errors.accountablePerson
                }
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Date of Assumption"
                placeholder={property?.date_of_assumption}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dateOfAssumption}
                name="dateOfAssumption"
                error={!!touched.dateOfAssumption && !!errors.dateOfAssumption}
                helperText={touched.dateOfAssumption && errors.dateOfAssumption}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Quantity per Property"
                placeholder={property?.quantity_per_property}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantityPerProperty}
                name="quantityPerProperty"
                error={
                  !!touched.quantityPerProperty && !!errors.quantityPerProperty
                }
                helperText={
                  touched.quantityPerProperty && errors.quantityPerProperty
                }
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Quantity per Physical"
                placeholder={property?.quantity_per_physical}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantityPerPhysical}
                name="quantityPerPhysical"
                error={
                  !!touched.quantityPerPhysical && !!errors.quantityPerPhysical
                }
                helperText={
                  touched.quantityPerPhysical && errors.quantityPerPhysical
                }
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Shortage Overage - Quantity "
                placeholder={property?.shortage_overage_quantity}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.shortageOverageQuantity}
                name="shortageOverageQuantity"
                error={
                  !!touched.shortageOverageQuantity &&
                  !!errors.shortageOverageQuantity
                }
                helperText={
                  touched.shortageOverageQuantity &&
                  errors.shortageOverageQuantity
                }
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Shortage Overage - Value "
                placeholder={property?.shortage_overage_value}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.shortageOverageValue}
                name="shortageOverageValue"
                error={
                  !!touched.shortageOverageValue &&
                  !!errors.shortageOverageValue
                }
                helperText={
                  touched.shortageOverageValue && errors.shortageOverageValue
                }
                sx={{ gridColumn: "span 1" }}
              />
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 1" }}
              >
                <InputLabel htmlFor="unitOfMeasure" shrink>
                  Unit of Measure
                </InputLabel>
                <Select
                  // fullWidth
                  // native
                  value={values.unitOfMeasure}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="unitOfMeasure"
                  name="unitOfMeasure"
                  // inputProps={{
                  //   name: "unitOfMeasure",
                  //   id: "unitOfMeasure",
                  // }}
                  // error={!!touched.unitOfMeasure && !!errors.unitOfMeasure}
                >
                  <MenuItem value={"pcs"}>pc.</MenuItem>
                  <MenuItem value={"unit"}>unit.</MenuItem>
                </Select>
                {touched.unitOfMeasure && errors.unitOfMeasure && (
                  <FormHelperText error>{errors.unitOfMeasure}</FormHelperText>
                )}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Unit Value"
                placeholder={property?.unit_value}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.unitValue}
                name="unitValue"
                error={!!touched.unitValue && !!errors.unitValue}
                helperText={touched.unitValue && errors.unitValue}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Physical Value"
                placeholder={property?.physical_value}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.physicalValue}
                name="physicalValue"
                error={!!touched.physicalValue && !!errors.physicalValue}
                helperText={touched.physicalValue && errors.physicalValue}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Property Number"
                placeholder={property?.property_number}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.propertyValue}
                name="propertyNumber"
                error={!!touched.propertyNumber && !!errors.propertyNumber}
                helperText={touched.propertyNumber && errors.propertyNumber}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Remarks"
                placeholder={property?.remarks}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.remarks}
                name="remarks"
                error={!!touched.remarks && !!errors.remarks}
                helperText={touched.remarks && errors.remarks}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>

            <Box
              display="flex"
              justifyContent="end"
              mt="20px"
              paddingRight="10px"
            >
              <Button
                onClick={goBackToReports}
                variant="outlined"
                style={{
                  marginRight: "10px",
                  borderRadius: "5px",
                  backgroundColor: "green",
                  color: "white",
                }}
              >
                Back to My Reports
              </Button>
              <Button
                type="submit"
                style={{ backgroundColor: "green", color: "white" }}
                variant="contained"
              >
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  articles: yup.string(),
  description: yup.string(),
  accountablePerson: yup.string(),
  dateOfAssumption: yup.string(),
  quantityPerProperty: yup.number(),
  quantityPerPhysical: yup.number(),
  shortageOverageQuantity: yup.string(),
  shortageOverageValue: yup.string(),
  unitOfMeasure: yup.string(),
  unitValue: yup.number(),
  physicalValue: yup.number(),
  propertyNumber: yup.string(),
  remarks: yup.string(),
});

const initialValues = {
  articles: "",
  description: "",
  accountablePerson: "",
  dateOfAssumption: "",
  quantityPerProperty: "",
  quantityPerPhysical: "",
  shortageOverageQuantity: "",
  shortageOverageValue: "",
  unitOfMeasure: "",
  unitValue: "",
  physicalValue: "",
  propertyNumber: "",
  remarks: "",
};

export default EditReport;
