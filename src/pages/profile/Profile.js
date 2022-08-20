import React from "react";
import { Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
// material
import {
  Box,
  Button,
  Grid,
  Container,
  TextField,
  styled,
  Card,
  Typography,
} from "@mui/material";
// components
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import Page from "../../components/Page";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {
  ProfilePicCard,
  ProfileDetails,
  ProfileAddress,
  ProfileQualification,
  ProfileSales,
} from "../../components/_dashboard/profile";
import StoreImage from "src/components/_dashboard/profile/StoreImage";
import ProfileBestSell from "src/components/_dashboard/profile/ProfileBestSell";
import "./Qualification.css";
import swal from 'sweetalert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar } from 'recharts';

// ----------------------------------------------------------------------

const data = [{
  "dateOfSale": "3/23/2022",
  "quantiy": 96,
  "sellerId": "62b16c90900271b336f67b78"
},{
  "dateOfSale": "5/22/2022",
  "quantiy": 40,
  "sellerId": "62b16c90900271b336f67b78"
},{
  "dateOfSale": "12/15/2020",
  "quantiy": 120,
  "sellerId": "62b16c90900271b336f67b78"
},{
  "dateOfSale": "1/20/2019",
  "quantiy": 112,
  "sellerId": "62b16c90900271b336f67b78"
},{
  "dateOfSale": "12/2/2019",
  "quantiy": 110,
  "sellerId": "62b16c90900271b336f67b78"
},{
  "dateOfSale": "12/18/2019",
  "quantiy": 100,
  "sellerId": "62b16c90900271b336f67b78"
},{
  "dateOfSale": "11/10/2019",
  "quantiy": 12,
  "sellerId": "62b16c90900271b336f67b78"
},{
  "dateOfSale": "10/15/2019",
  "quantiy": 160,
  "sellerId": "62b16c90900271b336f67b78"
},{
  "dateOfSale": "11/16/2019",
  "quantiy": 149,
  "sellerId": "62b16c90900271b336f67b78"
},{
  "dateOfSale": "2/20/2019",
  "quantiy": 120,
  "sellerId": "62b16c90900271b336f67b78"
},{
  "dateOfSale": "2/13/2019",
  "quantiy": 120,
  "sellerId": "62b16c90900271b336f67b78"
}];

const productData = [
  {
    "productId": "62b1a7139fef7248422e800b",
    "name": "Xiaomi Redmi Note 10",
    "quantity": "25"
  },
  {
    "productId": "62b1a7139fef7248422e800c",
    "name": "Xiaomi Fitbit",
    "quantity": "40"
  },
  {
    "productId": "62b1a7139fef7248422e800c",
    "name": "Mi Band 5",
    "quantity": "20"
  },
  {
    "productId": "62b1a7139fef7248422e800c",
    "name": "Redmi Note 10",
    "quantity": "50"
  },
  {
    "productId": "62b1a7139fef7248422e800c",
    "name": "Xiaomi T11",
    "quantity": "30"
  },
  {
    "productId": "62b1a7139fef7248422e800c",
    "name": "Mi 4A TV ",
    "quantity": "80"
  }
]

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: theme.customShadows.z20,
  padding: theme.spacing(6, 6),
  borderRadius: '12px',
  backgroundColor: '#ffffff75',
  color: '#000000',
}));


export default function Profile(props) {
  const [auth, setAuth] = useState(true);
  const [profilePic, setProfilePic] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [storeImage, setStoreImage] = useState([]);
  const [name, setName] = useState("");
  const [fav, setFav] = useState(false);

  const [todaySales, setTodaySales] = useState("");
  //props.setEmail(window.atob(window.location.pathname.slice(16)));

  const handleSubmit = (e) => {
    console.log(storeImage);
    var formdata = new FormData();
    for (let i = 0; i < storeImage.length; i++)
      formdata.append("storeImage", storeImage[i]);

    formdata.append("email", localStorage.getItem("email"));
    console.log(formdata);
    fetch(
      process.env.REACT_APP_BACKEND_SERVER_HOST_URL +
        "/api/v1.0/store/uploadstoreimage",
      {
        method: "PUT",
        body: formdata,
        redirect: "follow",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        swal({
            title : 'USER API ERROR!',
            text : "ERROR: " + err,
            icon: 'error',
            closeOnClickOutside: false,
            buttons: false,
            className: "pb-3",
            timer: 6000,
        })
      });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit1 = (e) => {
    fetch(
      process.env.REACT_APP_BACKEND_SERVER_HOST_URL +
        "/api/v1.0/stores/store-data",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify({ name }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
        swal({
            title : 'STORE API ERROR!',
            text : "ERROR: " + err,
            icon: 'error',
            closeOnClickOutside: false,
            buttons: false,
            className: "pb-3",
            timer: 6000,
        })
      });
    e.preventDefault();
  };

  useEffect(() => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: localStorage.getItem("email"),
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      process.env.REACT_APP_BACKEND_SERVER_HOST_URL + "/api/v1.0/users/getUser",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setFav(result.data.favourite);
        setProfilePic(result.data.profilePicture);
        setFirstName(result.data.firstName);
        setLastName(result.data.lastName);
        setUserInfo(result.data);
        localStorage.setItem("profileEmail", result.data.email);
      })
      .catch((err) => {
        console.log(err);
        swal({
            title : 'USER API ERROR!',
            text : "ERROR: " + err,
            icon: 'error',
            closeOnClickOutside: false,
            buttons: false,
            className: "pb-3",
            timer: 6000,
        })
      });
  }, [props.showtestimonial, todaySales]);

  useEffect(() => {
    createNotification("info");
  }, [fav]);

  const createNotification = (type) => {
    switch (type) {
      case "info":
        NotificationManager.info("You've been added as favourite", "", 3000);
        break;
    }
  };

  window.addEventListener('storage', () => {
    setAuth(false);
  })

    if(localStorage.getItem('email') != null){
      return (
      <Page title="Profile | MithranBuddy">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Invite Your Friends"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Enter your friend's email -
              </DialogContentText>
              <form onSubmit={handleSubmit1}>
                <label>
                  <input
                    style={{
                      width: "100%",
                      padding: "12px 20px",
                      margin: "8px 0",
                      borderRadius: "4px",
                      boxSizing: "border-box",
                    }}
                    type="text"
                    value={name}
                    name="name"
                    onChange={handleChange}
                  />
                </label>
                <input
                  style={{
                    width: "100%",
                    backgroundColor: "#ea6000",
                    color: "white",
                    padding: "14px 20px",
                    margin: "8px 0",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  type="submit"
                  value="Submit"
                  onClick={handleClose}
                />
              </form>
            </DialogContent>
          </Dialog>
          <Grid item xs={12} sm={6} md={4}>
            <ProfilePicCard {...userInfo} />
          </Grid>
          {/* <Grid item xs={12} sm={6} md={8}>
            <ProfileDetails {...userInfo} />
          </Grid> */}
          <Grid item xs={12} sm={12} md={8}>
            <RootStyle sx={{ bgcolor: "#ffffff4a" }}>
              <ProfileAddress {...userInfo} />
              <Button
                variant="contained"
                style={{
                  textDecoration: "none",
                  marginRight: "1%",
                  backgroundColor: "#0d1117",
                }}
                onClick={handleClickOpen}
              >
                Invite Friends
              </Button>
              <Link
                style={{ textDecoration: "none", marginRight: "1%" }}
                to={`/editProfile/${window.location.pathname.slice(16)}`}
              >
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#0d1117" }}
                >
                  Edit Profile
                </Button>
              </Link>
            </RootStyle>
          </Grid>
          {/* <Grid item xs={12} sm={6} md={12}>
            <ProfileQualification {...userInfo} />
          </Grid> */}
          <Grid item xs={12} sm={12} md={12}>
            <RootStyle sx={{ bgcolor: "#ffffff4a" }}>
              <div style={{ display: "flex" }}>
                <ProfileSales
                  showtestimonial={props.showtestimonial}
                  updateShowTestimonial={props.updateShowTestimonial}
                  todaySales={todaySales}
                  setTodaySales={setTodaySales}
                />
              </div>
            </RootStyle>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <RootStyle sx={{ borderRadius: "12px", bgcolor: "#ffffff4a" }}>
              <Typography
                style={{ color: "#1c1954" }}
                marginBottom={2}
                variant="h5"
              >
                Store Images
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  type="file"
                  InputLabelProps={{ shrink: true }}
                  sx={{ border: "1px solid black", borderRadius: 1 }}
                  marginRight={10}
                  onChange={(e) => {
                    setStoreImage(e.target.files);
                  }}
                  inputProps={{ multiple: true }}
                />
                <Box component="span" marginLeft={2}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#0d1117" }}
                    size="large"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Box>
              </form>

              <Grid mt={2} container spacing={3}>
                {userInfo.storeImage &&
                  userInfo.storeImage.map((image, index) => {
                    return (
                      <StoreImage fileName={image} key={index} index={index} />
                    );
                  })}
              </Grid>
            </RootStyle>
          </Grid>

        </Grid>
      <RootStyle  sx={{  marginTop: "25px", paddingLeft:"auto !important"}}>
        <div style={{width: "100%", backgroundColor:"white", padding:"32px 12px", borderRadius:"12px"}}>
        <Typography m={2} variant="h5" style={{color: "#1c1954"}}><strong>Sales over time.</strong></Typography>
          <LineChart
            width={750}
            height={300}
            data={data}
          >
            <XAxis dataKey="dateOfSale" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="quantiy" stroke="#EA6000" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
      </RootStyle>
      <RootStyle  sx={{  marginTop: "25px", paddingLeft:"auto !important"}}>
        <div style={{width: "100%", backgroundColor:"white", padding:"32px 12px", borderRadius:"12px"}}>
        <Typography m={2} variant="h5" style={{color: "#1c1954"}}><strong>Products Sold.</strong></Typography>
        <BarChart width={750} height={300} data={productData}>
        <XAxis dataKey="name" />
          <YAxis />
        <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill="#EA6000" />
        </BarChart>
        </div>
      </RootStyle>
        <ProfileBestSell />
      
      </Container>
      </Page>
      )
    }else {
      return (
      <Navigate to='/login'></Navigate>
      )
    }


}
