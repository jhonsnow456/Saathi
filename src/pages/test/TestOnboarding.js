import * as Yup from "yup";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useFormik, Form, FormikProvider } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useNavigate } from "react-router-dom";
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// ----------------------------------------------------------------------
import swal from "sweetalert";

export default function RegisterForm() {
  const navigate = useNavigate();

  useEffect(() => {
    // var requestOptions = {
    //   method: "GET",
    //   redirect: "follow",
    // };

    // fetch(
    //   process.env.REACT_APP_BACKEND_SERVER_HOST_URL +
    //     "/api/v1.0/users/getStateList",
    //   requestOptions
    // )
    //   .then((response) => response.json())
    //   .then((result) => setStates(result.data))
    //   .catch((error) => console.log("error", error));
  }, []);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name required"),
    dateOfBirth: Yup.date().required("Date of Birth required"),
    gender: Yup.string().required("Gender is required"),
    age: Yup.string().required("Age is required"),
    grade: Yup.string().required("Grade is required"),

  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      age: "",
      grade: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      console.log(values);
      var formdata = new FormData();
      // formdata.append("profilePicture", profilePic);
      formdata.append("firstName", values.firstName);
      formdata.append("lastName", values.lastName);
      formdata.append("email", values.email);
      formdata.append("dateOfBirth", values.dateOfBirth);
      formdata.append("mobileNo", values.mobileNo);
      formdata.append("gender", values.gender);
      formdata.append("age", values.gender);
      formdata.append("grade", values.grade);
    },
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  return (
    <div style={{margin:"px"}}>
    <FormikProvider value={formik}  >
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Name"
              {...getFieldProps("firstName")}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Age"
              {...getFieldProps("age")}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
            <TextField
              fullWidth
              label="Grade"
              {...getFieldProps("grade")}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              type="date"
              label="Date of Birth"
              InputLabelProps={{ shrink: true }}
              {...getFieldProps("dateOfBirth")}
              error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
              helperText={touched.dateOfBirth && errors.dateOfBirth}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              {...getFieldProps("gender")}
              label="Gender"
              error={Boolean(touched.gender && errors.gender)}
              helperText={touched.gender && errors.gender}
              select
            >
              <MenuItem value="">Select </MenuItem>
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Others"}>Others</MenuItem>
            </TextField>

          </Stack>
          
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
    </div>

  );
}
