import React, {useState} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import { makeStyles } from '@material-ui/core';

const initialState = {
    name:"",
    contact:"",
    email:"",
    address:""

}

const useStyles = makeStyles((theme) => ({
    root : {
        marginTop: 70,
        margin: "auto",
        padding: "15px",
        maxWidth: "500px",
        alignContent: "center",
        "& > *": {
            margin:theme.spacing(1),
            width:"45ch",
        },

    },
}));

const Home = () => {
    const classes = useStyles();
    const [state, setState] = useState(initialState);

    //Destructuring
    const {name, contact, email , address} = state;

    const handleInputChange = () => {

    }

    const handleSubmit = () => {

    }
    return (
        <MDBContainer fluid>
            <MDBRow>
                 <MDBCol md="8">
                         <h2>Table</h2>
                 </MDBCol>
                 <MDBCol md="4">
                         <form onSubmit={handleSubmit} className={classes.root}>
                             <MDBTypography className="text-start" variant="h4">Add Contact</MDBTypography>
                            <MDBInput 
                            label="Name"
                            value={name}
                            name="name"
                            type="text"
                            onChange={handleInputChange}
                            />
                            <br />
                            <MDBInput 
                            label="Contact"
                            value={contact}
                            name="contact"
                            type="number"
                            onChange={handleInputChange}
                            />
                            <br />
                            <MDBInput 
                            label="Email"
                            value={email}
                            name="email"
                            type="email"
                            onChange={handleInputChange}
                            />
                            <br />
                            <MDBInput 
                            label="Address"
                            value={address}
                            name="address"
                            type="text"
                            onChange={handleInputChange}
                            />
                            <br />
                            <MDBBtn style={{width:"100px"}} color="success" type="submit">
                                 Submit
                            </MDBBtn>
                         </form>
                 </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default Home
