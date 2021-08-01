import React, {useState} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBTypography,MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {useDispatch,useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { addContactInitiate } from './redux/actions';

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
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
      let {name, value} = e.target;
      setState({...state,[name]:value})
    }

    const handleSubmit = (e) => {
     e.preventDefault();
     dispatch(addContactInitiate(state));
    }
    return (
        <MDBContainer fluid>
            <MDBRow>
                 <MDBCol md="8">
                 <MDBTable style={{marginTop:"100px"}} bordered>
      <MDBTableHead dark>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>First</th>
          <th scope='col'>Last</th>
          <th scope='col'>Handle</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <th scope='row'>1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope='row'>2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope='row'>3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </MDBTableBody>
    </MDBTable>
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
