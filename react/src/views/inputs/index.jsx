import { Box, Button, MenuItem, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { CreateProperty } from "../../services/propertiesServices";
import { useStateContext } from "../../context/ContextProvider";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [newProperty, setNewProperty] = useState({});
  const { setNotification } = useStateContext();

  const handleFormSubmit = async (values, { resetForm }) => {
    // console.log(newProperty);

    const res = await CreateProperty({
      articles: values.articles,
      accountable_person: values.accountablePerson,
      description: values.description,
      date_of_assumption: values.dateOfAssumption,
      quantity_per_property: values.quantityPerProperty,
      quantity_per_physical: values.quantityPerPhysical,
      shortage_overage_quantity: values.shortageOverageQuantity,
      shortage_overage_value: values.shortageOverageValue,
      unit_of_measure: values.unitOfMeasure,
      unit_value: values.unitValue,
      physical_value: values.physicalValue,
      property_number: values.propertyNumber,
      remarks: values.remarks,
      registrar_id: localStorage.getItem("id"),
      status:
        localStorage.getItem("status") === "Admin" ? "Accepted" : "Pending",
    });
    // console.log(res);
    if (res.status === 201) {
      setNotification("New property added successfully");
      resetForm();
    }
  };

  useEffect(() => {
    // console.log(initialValues);
  }, [initialValues]);

  return (
    <Box m="20px">
      <Header title="NEW PROPERTY" subtitle="ADD A NEW PROPERTY" />

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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Articles"
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
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.remarks}
                name="remarks"
                error={!!touched.remarks && !!errors.remarks}
                helperText={touched.remarks && errors.remarks}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
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
  articles: yup.string().required("Articles is required"),
  description: yup.string().required("Description is required"),
  accountablePerson: yup.string().required("Accountable Person is required"),
  dateOfAssumption: yup.string().required("Date of Assumption is required"),
  quantityPerProperty: yup
    .number()
    .required("Quantity per Property is required"),
  quantityPerPhysical: yup
    .number()
    .required("Quantity per Physical is required"),
  shortageOverageQuantity: yup
    .string()
    .required("Shortage/Overage is required"),
  shortageOverageValue: yup.string().required("Shortage/Overage is required"),
  unitOfMeasure: yup.string().required("Unit of Measure is required"),
  unitValue: yup.number().required("Unit Value is required"),
  physicalValue: yup.number().required("Physical Value is required"),
  propertyNumber: yup.string().required("Property Value is required"),
  remarks: yup.string().required("Remarks is required"),
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

export default Form;
