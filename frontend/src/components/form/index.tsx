import React, { useState } from "react";
import { useFormik } from "formik";
import {
  makeStyles,
  Typography,
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Stack,
} from "../../styles";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { InitialFormDataTypes } from "../../types/formTypes/formTypes";
import { formSchema } from "../../types/formTypes/formSchema";
import { postFormData } from "../../httpMethods/postFormData";
import SuccessSnackbar from "../shared/successSnackbar";
import FailureSnackbar from "../shared/failureSnackbar";

const useStyles = makeStyles({
  mainDiv: {
    margin: "15px 10px 5px 10px",
  },
  selectBox: {
    margin: "5px 10px 5px 10px",
  },
});

const initialFormValues: InitialFormDataTypes = {
  title: "",
  value: "",
  currency: "PKR",
  person_id: "",
  org_id: 0,
  status: "",
  expected_close_date: "",
  probability: "",
  user_id: 0,
};

const Form = () => {
  const [date, setDate] = React.useState<Dayjs | null>(
    dayjs(new Date().toLocaleDateString())
  );
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const classes = useStyles();

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialFormValues,
    validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      const getDate =
        date!.month() + 1 + "/" + date!.date() + "/" + date!.year();

      const dealData = {
        currency: values.currency?.toUpperCase(),
        org_id: values.org_id,
        person_id: parseInt(values.person_id as string) || 0,
        probability: parseInt(values.probability as string) || 0,
        status: values.status,
        title: values.title,
        user_id: values.user_id,
        value: values.value,
        expected_close_date: getDate,
      };

      if (await postFormData(dealData, "/dev/deals")) {
        setShowSuccessAlert(true);
        resetForm({ values: initialFormValues });
      } else {
        setShowFailureAlert(true);
      }
    },
  });

  return (
    <div>
      <div className={classes.mainDiv}>
        <Typography variant="h1" gutterBottom>
          Create Deals
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} lg={6} xl={6}>
                <TextField
                  fullWidth
                  type="text"
                  name="title"
                  variant="outlined"
                  label="Title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  helperText={errors.title}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={6} xl={6}>
                <TextField
                  fullWidth
                  type="text"
                  name="value"
                  variant="outlined"
                  label="Amount"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.value}
                  helperText={errors.value}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={6} xl={6}>
                <TextField
                  fullWidth
                  type="text"
                  name="currency"
                  variant="outlined"
                  label="Currency"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.currency}
                  helperText={errors.currency}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={6} xl={6}>
                <TextField
                  fullWidth
                  type="number"
                  name="person_id"
                  variant="outlined"
                  label="Person Id"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.person_id}
                  helperText={errors.person_id}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  name="probability"
                  variant="outlined"
                  label="Success Probability"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.probability}
                  helperText={errors.probability}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DatePicker
                      minDate={dayjs(new Date().toLocaleDateString())}
                      inputFormat="MM/DD/YYYY"
                      label="Expected Close Date"
                      value={date}
                      onChange={(newValue) => {
                        setDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6} lg={6} xl={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="status">Status</InputLabel>
                  <Select
                    labelId="status"
                    id="status"
                    value={values.status}
                    label="Status"
                    onChange={handleChange}
                    name="status"
                  >
                    <MenuItem value={"open"}>Open</MenuItem>
                    <MenuItem value={"won"}>Won</MenuItem>
                    <MenuItem value={"lost"}>Lost</MenuItem>
                    <MenuItem value={"deleted"}>Deleted</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} lg={6} xl={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="status">Organization Name</InputLabel>
                  <Select
                    labelId="Organization Name"
                    id="status"
                    value={values.org_id}
                    label="Organization Name"
                    onChange={handleChange}
                    name="org_id"
                  >
                    <MenuItem value={0}>None</MenuItem>
                    <MenuItem value={27}>Organization 3</MenuItem>
                    <MenuItem value={30}>Organization 5</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="status">Owner</InputLabel>
                  <Select
                    labelId="User Id"
                    id="User Id"
                    value={values.user_id}
                    label="Owner"
                    onChange={handleChange}
                    name="user_id"
                  >
                    <MenuItem value={0}>None</MenuItem>
                    <MenuItem value={15273529}>Zain ul Abideen</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="success"
              type="submit"
              style={{ marginTop: "50px" }}
            >
              Create Deal
            </Button>
          </form>
        </Box>
      </div>
      {showSuccessAlert ? (
        <SuccessSnackbar setShowSuccessAlert={setShowSuccessAlert} />
      ) : null}
      {showFailureAlert ? (
        <FailureSnackbar setShowFailureAlert={setShowFailureAlert} />
      ) : null}
    </div>
  );
};

export default Form;
