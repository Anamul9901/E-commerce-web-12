import React, { useState } from "react";

// Material UI Imports
import {
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    IconButton,
    Button,
    Input,
    Checkbox,
    Alert,
    Stack,
} from "@mui/material";

// Material UI Icon Imports
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

// Email Validation
const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);



const Login = () => {
    const { logInWithPass } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();


    const [showPassword, setShowPassword] = React.useState(false);

    //Inputs
    const [emailInput, setEmailInput] = useState();
    const [passwordInput, setPasswordInput] = useState();
    const [rememberMe, setRememberMe] = useState();

    // Inputs Errors
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    // Overall Form Validity
    const [formValid, setFormValid] = useState();
    const [success, setSuccess] = useState();

    // Handles Display and Hide Password
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // Label for Checkbox
    const label = { inputProps: { "aria-label": "Checkbox demo" } };

    // Validation for onBlur Email
    const handleEmail = () => {
        // console.log(isEmail(emailInput));
        if (!isEmail(emailInput)) {
            setEmailError(true);
            return;
        }

        setEmailError(false);
    };

    // Validation for onBlur Password
    const handlePassword = () => {
        if (
            !passwordInput ||
            passwordInput.length < 5 ||
            passwordInput.length > 20
        ) {
            setPasswordError(true);
            return;
        }

        setPasswordError(false);
    };

    //handle Submittion
    const handleSubmit = () => {
        setSuccess(null);
        //First of all Check for Errors

        // If Email error is true
        if (emailError || !emailInput) {
            setFormValid("Email is Invalid. Please Re-Enter");
            return;
        }

        // If Password error is true
        if (passwordError || !passwordInput) {
            setFormValid(
                "Password is set btw 5 - 20 characters long. Please Re-Enter"
            );
            return;
        }
        setFormValid(null);

        // Proceed to use the information passed
        const email = emailInput;
        const password = passwordInput;
        // console.log("Email : ", email);
        // console.log("Password : ", password);
        // console.log("Remember : ", rememberMe);



        logInWithPass(email, password)
            .then(() => {
                navigate(location?.state ? location.state : '/')
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "There is a Problem!!",

                });
            })

        //Show Successfull Submittion
    };




    return (
        <div className="border border-red-400 flex justify-center pt-10">
            <div className="h-screen w-96 ">
            <h2 className="text-center pb-5 text-xl">Welcome to <span className="text-[#f76b00] font-bold">e-SHOP!</span> Please Login.</h2>
                <div style={{ marginTop: "5px" }}>
                    <TextField
                        label="Email Address"
                        fullWidth
                        error={emailError}
                        id="standard-basic"
                        variant="standard"
                        sx={{ width: "100%" }}
                        value={emailInput}
                        InputProps={{}}
                        size="small"
                        onBlur={handleEmail}
                        onChange={(event) => {
                            setEmailInput(event.target.value);
                        }}
                    />
                </div>
                <div style={{ marginTop: "5px" }}>
                    <FormControl sx={{ width: "100%" }} variant="standard">
                        <InputLabel
                            error={passwordError}
                            htmlFor="standard-adornment-password"
                        >
                            Password
                        </InputLabel>
                        <Input
                            error={passwordError}
                            onBlur={handlePassword}
                            id="standard-adornment-password"
                            type={showPassword ? "text" : "password"}
                            onChange={(event) => {
                                setPasswordInput(event.target.value);
                            }}
                            value={passwordInput}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>

                <div style={{ fontSize: "10px" }}>
                    <Checkbox
                        {...label}
                        size="small"
                        onChange={(event) => setRememberMe(event.target.checked)}
                    />
                    Remember Me
                </div>

                <div style={{ marginTop: "10px" }}>
                    <Button style={{backgroundColor: "#f76b00"}}
                        variant="contained"
                        // className="  w-full btn btn-sm btn-primary"
                        fullWidth
                        startIcon={<LoginIcon />}
                        onClick={handleSubmit}
                    >
                        LOG IN
                    </Button>
                </div>

                {/* Show Form Error if any */}
                {formValid && (
                    <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                        <Alert severity="error" size="small">
                            {formValid}
                        </Alert>
                    </Stack>
                )}

                {/* Show Success if no issues */}
                {success && (
                    <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                        <Alert severity="success" size="small">
                            {success}
                        </Alert>
                    </Stack>
                )}

                <div style={{ marginTop: "12px", marginBottom: '10px', fontSize: "13px" }}  >


                    Do not have an account ? <Link to='/signup'><span className="text-[#f76b00] font-bold">SignUp</span></Link>

                </div>
                <hr className="mb-4" />
                <SocialLogin />
            </div>
        </div>
    );

}




export default Login;