import React, { useEffect } from "react";
import { TextField, Button, Grid, Typography, Box } from "@mui/material";
import background from "../images/login_background.png";
import { useState } from "react";
import { AccountCircle, Lock } from "@mui/icons-material";
//import { textAlign, width } from "@mui/system";
// import { useMediaQuery } from "react-responsive";

const textFieldStyle = {
  // marginBottom: "2em",
  width: "100%",
};

function Login({ LoginDetail, error }) {
  const [details, setDetails] = useState({ userid: "", password: "" });
  const SubmitHandler = (e) => {
    e.preventDefault();
    LoginDetail(details);
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);
  return (
    <>
      <form autoComplete="off" onSubmit={SubmitHandler}>
        <Grid
          container
          direction="column"
          alignItems="flex-end"
          justify="center"
          style={{
            //minHeight: "100vh",
            //background: "skyblue",
            backgroundImage: `url(${background})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100vw",
            height: "105vh",
          }}
          spacing={5}
        >
          <Grid item>
            <Grid
              container
              direction="column"
              alignItems={"center"}
              justify="center"
              style={{ marginRight: "15em", marginTop: "10em" }}
            >
              <Grid item>
                <Typography
                  variant="h4"
                  component="h3"
                  style={{ marginBottom: "1em" }}
                >
                  idoc
                </Typography>
              </Grid>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems={"center"}
                style={{
                  marginBottom: "2em",
                  marginTop: "1em",
                  textFieldStyle,
                }}
                spacing={4}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    marginBottom: "2em",
                  }}
                >
                  <AccountCircle
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    onChange={(e) =>
                      setDetails({ ...details, userid: e.target.value })
                    }
                    value={details.userid}
                    id="userid"
                    label="Mail ID"
                    variant="standard"
                    style={textFieldStyle}
                    required
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    marginBottom: "2em",
                  }}
                >
                  <Lock sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    onChange={(e) =>
                      setDetails({ ...details, password: e.target.value })
                    }
                    value={details.password}
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    style={textFieldStyle}
                    required
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ width: "50%" }}
                  onClick={SubmitHandler}
                >
                  SIGN IN
                </Button>
              </Grid>

              <Button variant="text" style={{ marginLeft: "28%" }}>
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
