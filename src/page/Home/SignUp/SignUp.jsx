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
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../../../components/SocialLogin/SocialLogin";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

// Email Validation
const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const isPassword = (password) =>
    /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/i.test(password);



const SignUp = () => {
    const { createUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();


    const [showPassword, setShowPassword] = React.useState(false);

    //Inputs
    const [nameInput, setNameInput] = useState();
    const [emailInput, setEmailInput] = useState();
    const [passwordInput, setPasswordInput] = useState();
    const [imageInput, setImageInput] = useState();
    const [rememberMe, setRememberMe] = useState();

    // Inputs Errors
    const [nameError, setNameError] = useState(false);
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

    const handleName = () => {
        //
        if (
            !nameInput ||
            nameInput.length < 2 ||
            nameInput.length > 20
        ) {
            setNameError(true);
            return;
        }
    }

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
        if (!isPassword(passwordInput) || passwordInput.length < 6 || passwordInput.length > 20) {
            setPasswordError(true);
            return;
        }

        setPasswordError(false);
    };

    const handleImage = () => {
        //
    }




    //handle Submittion
    const handleSubmit = () => {
        setSuccess(null);
        //First of all Check for Errors

        // If Email error is true
        if (!nameInput) {
            setFormValid("Name is Invalid. Please Re-Enter");
            return;
        }

        // If Email error is true
        if (emailError || !emailInput) {
            setFormValid("Email is Invalid. Please Re-Enter");
            return;
        }

        // If Password error is true
        if (passwordError || !passwordInput) {
            setFormValid(
                "Password is must 6 - 20 characters long, a Uppercase & a special xharacter. Please Re-Enter"
            );
            return;
        }
        setFormValid(null);

        // Proceed to use the information passed
        const email = emailInput;
        const password = passwordInput;
        // console.log('Name : ', nameInput)
        // console.log("Email : ", email);
        // console.log("Password : ", password);
        // console.log("Image : ", imageInput);
        // console.log("Remember : ", rememberMe);


        //Show Successfull Submittion
        setSuccess('success')


        createUser(email, password)
            .then(() => {
                updateUserProfile(nameInput, imageInput)
                    .then(() => {
                        // console.log('user Profile ingo updated')
                        const userInfo = {
                            name: nameInput,
                            email: email
                        }
                        navigate(location?.state ? location.state : '/')
                        axiosPublic.post('/users', userInfo)
                            .then(() => {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "SignUp Successfully",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            })
                    })
                    .catch(() => {
                    })
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "There is a Problem!!",

                });
            })


    };




    return (
        <div className="border border-red-400 flex justify-center pt-10">
            <div className="h-screen w-96 ">
            <h2 className="text-center pb-5 text-xl">Welcome to <span className="text-[#f76b00] font-bold">e-SHOP!</span> Please Signup.</h2>
                <div style={{ marginTop: "5px" }}>
                    <TextField
                        label="Name"
                        type="text"
                        fullWidth
                        error={nameError}
                        id="standard-basic-name"
                        variant="standard"
                        sx={{ width: "100%" }}
                        value={nameInput}
                        InputProps={{}}
                        size="small"
                        onBlur={handleName}
                        onChange={(event) => {
                            setNameInput(event.target.value);
                        }}
                    />
                </div>


                <div style={{ marginTop: "5px" }}>
                    <TextField
                        label="Email Address"
                        type="email"
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


                <div style={{ marginTop: "5px" }}>
                    <TextField
                        label="Image URL"
                        fullWidth
                        id="standard-basic-image"
                        variant="standard"
                        sx={{ width: "100%" }}
                        value={imageInput}
                        InputProps={{}}
                        size="small"
                        onBlur={handleImage}
                        onChange={(event) => {
                            setImageInput(event.target.value);
                        }}
                    />
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
                    <Button style={{ backgroundColor: "#f76b00" }}
                        variant="contained"
                        // className="  w-full btn btn-sm btn-primary"
                        fullWidth
                        startIcon={<LoginIcon />}
                        onClick={handleSubmit}
                    >
                        SIGN UP
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


                    Do you have an account ? <Link to='/login'><span className="text-[#f76b00] font-bold">LogIn</span></Link>

                </div>
                <hr className="mb-4" />
                <SocialLogin />
            </div>
        </div>
    );

}




export default SignUp;