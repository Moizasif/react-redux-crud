import React, {useState,useEffect} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBTypography,MDBTable, MDBTableHead, MDBTableBody, MDBIcon,MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter } from 'mdb-react-ui-kit';
import {useDispatch,useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { addContactInitiate, deleteContactInitiate, getContactInitiate, getContactsInitiate, reset, updateContactInitiate } from './redux/actions';

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
    const [editMode, setEditMode] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [userId, setUserId] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    //Destructuring
    const {name, contact, email , address} = state;
    const dispatch = useDispatch();
    //Because our reducer use with key data
    const {contacts, contact:singleContact} = useSelector(state => state.data);

    useEffect(() => {
       dispatch(getContactsInitiate())
    },[])

    useEffect(()=> {
        if(singleContact) {
            setState({...singleContact})
        }
    },[singleContact])


    const deleteContact = (id) => {
           if(window.confirm("Are you sure you wanted to delete?")) {
           dispatch(deleteContactInitiate(id))
           }
    }

    const editContact = (id) => {
         setEditMode(true);
         setUserId(id);
         dispatch(getContactInitiate(id))
    }

    const modalBody = (
        <div className="row">
          <div className="col-sm-4">
           Name
          </div>
          <div className="col-sm-8">{singleContact.name}</div>
          <div className="col-sm-4">
           Contact
          </div>
          <div className="col-sm-8">{singleContact.contact}</div>
          <div className="col-sm-4">
           Email
          </div>
          <div className="col-sm-8">{singleContact.email}</div>
          <div className="col-sm-4">
           Address
          </div>
          <div className="col-sm-8">{singleContact.address}</div>

        </div>
    )

    const handleModal = (id) => {
        setModalOpen(true);
        dispatch(getContactInitiate(id))

    }

    const handleClosedModal = () => {
        setModalOpen(false);
        dispatch(reset());
    }

    const handleInputChange = (e) => {
      let {name, value} = e.target;
      setState({...state,[name]:value})
    }

    const handleSubmit = (e) => {
     e.preventDefault();
     if(!name || !contact || !email ||!address){
         setErrorMsg("Please fill all input fields")        
    } else {
     if(!editMode){
        dispatch(addContactInitiate(state));
        setState({name:"", email:"", contact:"", address:""});
        setErrorMsg("");
     }else {
         dispatch(updateContactInitiate(userId,state));
         setUserId(null);
         setEditMode(false);
         setState({name:"", email:"", contact:"", address:""});
         setErrorMsg("");
         


     }

    }
    }
    return (
        <MDBContainer fluid>
            <MDBRow>
                 <MDBCol md="8">
                 <MDBTable style={{marginTop:"100px"}} bordered>
      <MDBTableHead dark>
        <tr>
          <th scope='col'>No</th>
          <th scope='col'>Name</th>
          <th scope='col'>Contact</th>
          <th scope='col'>Email</th>
          <th scope='col'>Address</th>
          <th scope='col'>Action</th>
        </tr>
      </MDBTableHead>
      {contacts && contacts.map((item,index)=> (
             <MDBTableBody key={index}>
           <tr>
           <th scope='row'>{index + 1}</th>
           <td>{item.name}</td>
           <td>{item.contact}</td>
           <td>{item.email}</td>
           <td>{item.address}</td>
           <td>
           <MDBBtn className="m1" tag="a" color="none" style={{color:"#3b5998"}} onClick={() => handleModal(item.id)}>
                   <MDBIcon fas icon="eye" size="lg"/>
               </MDBBtn>
               <MDBBtn className="m1" tag="a" color="none" style={{color:"#55acee"}} onClick={() => editContact(item.id)}>
                   <MDBIcon fas icon="pen" size="lg"/>
               </MDBBtn>
               

               <MDBBtn className="m1" tag="a" color="none" style={{color:"#dd4b39"}} onClick={() => deleteContact(item.id)}>
                   <MDBIcon fas icon="trash" size="lg"/>
               </MDBBtn>
           </td>
           
           
         </tr>
         {modalOpen && (
              <MDBModal show={modalOpen} tabIndex='-1'>
              <MDBModalDialog>
                <MDBModalContent>
                  <MDBModalHeader>
                    <MDBModalTitle>Contact Info</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={handleClosedModal}></MDBBtn>
                  </MDBModalHeader>
                  <MDBModalBody>{modalBody}</MDBModalBody>
        
                  <MDBModalFooter>
                    <MDBBtn color='secondary' onClick={handleClosedModal}>
                      Close
                    </MDBBtn>
                  </MDBModalFooter>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
         )}
         </MDBTableBody>
      ))}
   
    </MDBTable>
                 </MDBCol>
                 <MDBCol md="4">
                         <form onSubmit={handleSubmit} className={classes.root}>
                             <MDBTypography className="text-start" variant="h4">{!editMode ? "Add Contact" : "Update Contact"}</MDBTypography>
                             {errorMsg && <h6 className="text-start" style={{color:"red"}}>{errorMsg}</h6>}
                            <MDBInput 
                            label="Name"
                            value={name || ""}
                            name="name"
                            type="text"
                            onChange={handleInputChange}
                            />
                            <br />
                            <MDBInput 
                            label="Contact"
                            value={contact || ""}
                            name="contact"
                            type="number"
                            onChange={handleInputChange}
                            />
                            <br />
                            <MDBInput 
                            label="Email"
                            value={email || ""}
                            name="email"
                            type="email"
                            onChange={handleInputChange}
                            />
                            <br />
                            <MDBInput 
                            label="Address"
                            value={address || ""}
                            name="address"
                            type="text"
                            onChange={handleInputChange}
                            />
                            <br />
                            <MDBBtn style={{width:"100px"}} color={!editMode ? "success" : "warning"} type="submit">
                                 {!editMode ? "Submit" : "Update"}
                            </MDBBtn>
                         </form>
                 </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default Home
