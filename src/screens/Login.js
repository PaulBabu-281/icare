import React from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import background from "../images/login_background.png";
import { useState } from "react";
//import { textAlign, width } from "@mui/system";

const textFieldStyle = {
  marginBottom: "2em",
  width: "60%",
};

function Login({ LoginDetail, error }) {
  //   let success = false;
  //   state = {
  //     success: false,
  //   };
  //   const changeState = () => {
  //     this.setState({ success: !success });
  //   };

  //   const changeFlag = () => {
  //     changeState();
  //     this.props.successHandler(this.state);
  //   };
  const [details, setDetails] = useState({ userid: "", password: "" });
  const SubmitHandler = (e) => {
    e.preventDefault();
    LoginDetail(details);
  };
  return (
    <>
      <form autoComplete='off' onSubmit={SubmitHandler}>
        <Grid
          container
          direction='column'
          alignItems='flex-end'
          justify='center'
          style={{
            //minHeight: "100vh",
            //background: "skyblue",
            backgroundImage: `url(${background})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100vw",
            height: "101vh",
          }}
          spacing={5}
        >
          <Grid item>
            <Grid
              container
              direction='column'
              alignItems={"center"}
              justify='center'
              style={{ marginRight: "15em", marginTop: "10em" }}
            >
              <Grid item>
                <Typography
                  variant='h4'
                  component='h3'
                  style={{ marginBottom: "1em" }}
                >
                  iCare
                </Typography>
              </Grid>

              <TextField
                onChange={(e) =>
                  setDetails({ ...details, userid: e.target.value })
                }
                value={details.userid}
                id='userid'
                label='User ID'
                variant='outlined'
                style={textFieldStyle}
              />

              <TextField
                onChange={(e) =>
                  setDetails({ ...details, password: e.target.value })
                }
                value={details.password}
                id='password'
                label='Password'
                type='password'
                autoComplete='current-password'
                variant='outlined'
                style={textFieldStyle}
              />

              <Button
                type='submit'
                variant='contained'
                style={textFieldStyle}
                onClick={SubmitHandler}
              >
                SIGN IN
              </Button>

              <Button variant='text' style={{ marginLeft: "28%" }}>
                Reset Password?
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default Login;
