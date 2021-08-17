import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import './Employee.css';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { format } from "date-fns";
import DateFnsUtils from '@date-io/date-fns';
import { AddEmployeeType, AddEmployeeTypeDefault, EmployeeType } from './types';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersContext, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Redirect } from 'react-router-dom';



function Employee() {
    const [employees, setEmployees] = useState<EmployeeType[]>();
    const [showCreatePopup, setShowCreatePopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [state, setState] = useState<AddEmployeeType>(AddEmployeeTypeDefault) as any;

    const getEmployees = async () => {
        try {
            const { data } = await axios.get<EmployeeType[]>("https://localhost:44359/api/Employee");
            setEmployees(data);
        } catch {
            console.log("Çalışanları alırken hata oluştu");
        }
    };
    const handleDelete = (employeeId: number) => (e: any) => {
        axios.delete("https://localhost:44359/api/Employee/" + employeeId);
        window.location.reload();
    };
    const updateEmployee = () => {
        axios.put("https://localhost:44359/api/Employee/" + state.Id, state);
        //handleEditPopup();
        //window.location.reload();
    };
    const handleEdit = (employeeId: number) => (e: any) => {
        //const data = (axios.get<EmployeeType>("https://localhost:44359/api/Employee/"+ employeeId)).[[PromiseResult]].data;
        axios.get<EmployeeType>("https://localhost:44359/api/Employee/" + employeeId)
            .then(resp => {
                setState(resp.data);
            })
        console.log(state);
        handleEditPopup();
    };
    const createNewEmployee = () => {
        if(state.Phone.length != 11) {
            console.log("Phone number must be 11 digits");
            return;
        }
        if(state.IdentityNumber.length != 11) {
            console.log("Identity number must be 11 digits");
            return;
        }
        axios.post("https://localhost:44359/api/Employee", state)
        .then(resp => {
                alert("Successfully added");
            }, (error) => {
                alert("Employee could not be added");
                console.log(error);
            });
        //handleCreatePopup();

    };
    const onInputchange = (e: any) => {
        console.log(e.target.id);
        console.log(e.target.value);
        setState((prevState: AddEmployeeType) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };
    const handleCreatePopup = () => {
        setShowCreatePopup(current => !current);
    };
    // const print = () => {
    //     console.log(state);
    //     console.log(state.BirthDate);
    //     console.log(moment(state.BirthDate).format('DD.MM.YYYY'));
    // };
    const handleEditPopup = () => {
        console.log(state);
        console.log("state.BirthDate");
        if (showEditPopup) {
            setState(AddEmployeeTypeDefault);
        }
        setShowEditPopup(current => !current);
    };
    useEffect(() => {
        getEmployees();

    }, []);

    // useEffect(() => {
    //     handleEditPopup();
    // }, [state]);

    // function tableHeader() {
    //     let header = [
    //         "ID", "EmployeeId", "Name", "Surname", "BirthDate", "Email",
    //         "Phone", "IdentityNumber"
    //     ];
    //     return header.map((key, index) => {
    //         return <th key={index}>{key.toUpperCase()}</th>
    //     })
    // }

    return (
        <div>
            <div className="create">
                <Button className="createButton" onClick={handleCreatePopup}>Create</Button>
            </div>
            {/* <h1 id='title'>Emplooye Table</h1> */}
            <table id="employeetable">
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>EmployeeId</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>BirthDate</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>IdentityNumber</th>
                        <th>Operations</th>
                    </tr>
                    {employees?.map((user) => (
                        <tr key={user.Id}>
                            <td>{user.Id}</td>
                            <td>{user.EmployeeId}</td>
                            <td>{user.Name}</td>
                            <td>{user.Surname}</td>
                            <td>{moment(user.BirthDate).format('DD.MM.YYYY')}</td>
                            <td>{user.Email}</td>
                            <td>{user.Phone}</td>
                            <td>{user.IdentityNumber}</td>
                            <td><Button onClick={handleEdit(user.Id)}>Edit</Button><Button onClick={handleDelete(user.Id)}>Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Dialog open={showCreatePopup} onClose={handleCreatePopup} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new employee</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter employee informations to add a new employee.
                    </DialogContentText>
                    <div>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Name"
                            label="Name"
                            value={state!.Name || ''}
                            onChange={onInputchange}
                        /><TextField
                            autoFocus
                            margin="dense"
                            id="Surname"
                            label="Surname"
                            style={{ marginLeft: 8 }}
                            value={state!.Surname || ''}
                            onChange={onInputchange}
                        /></div><TextField
                        autoFocus
                        margin="dense"
                        id="BirthDate"
                        type="date"
                        label="Birth Date"
                        value={state!.BirthDate || ''}
                        onChange={onInputchange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    /><div><TextField
                        autoFocus
                        margin="dense"
                        id="Email"
                        label="Email Address"
                        value={state!.Email || ''}
                        onChange={onInputchange}
                    />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Phone"
                            label="Phone"
                            error={state!.Phone !== "" && !state!.Phone.match("^([0-9]{11})$")}
                            helperText={state!.Phone !== "" && !state!.Phone.match("^([0-9]{11})$") ? 'Phone number must be 11 digit.' : ' '}
                            style={{ marginLeft: 8 }}
                            value={state!.Phone || ''}
                            onChange={onInputchange}
                        /></div><TextField
                        autoFocus
                        margin="dense"
                        error={state!.IdentityNumber !== "" && !state!.IdentityNumber.match("^([0-9]{11})$")}
                        helperText={state!.IdentityNumber !== "" && !state!.IdentityNumber.match("^([0-9]{11})$") ? 'Identity number must be 11 digit.' : ' '}
                        id="IdentityNumber"
                        label="Identity Number"
                        value={state!.IdentityNumber || ''}
                        onChange={onInputchange}

                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCreatePopup()} color="primary">
                        Cancel
                    </Button>

                    <Button onClick={() => createNewEmployee()} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog className="ml-auto" fullWidth maxWidth="sm"  open={showEditPopup} onClose={handleEditPopup} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update Employee</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Change informations.
                    </DialogContentText>
                    <div className="deneme"> 
                        <TextField className="ml-auto"
                            autoFocus
                            margin="dense"
                            id="Name"
                            label="Name"
                            value={state!.Name}
                            onChange={onInputchange}
                        /><TextField className="ml-auto"
                            autoFocus
                            margin="dense"
                            id="Surname"
                            label="Surname"
                            style={{ marginLeft: 8 }}
                            value={state!.Surname || ''}
                            onChange={onInputchange}
                        /></div>
                        <div className="datepicker">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="BirthDate"
                            label="Time picker"
                            format="MM/dd/yyyy"
                            value={state!.BirthDate || ''}
                            onChange={e => onInputchange({ target: { id: 'BirthDate', value: e } })}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    </div>
                    <div>
                        <TextField className="ml-auto"
                            autoFocus
                            margin="dense"
                            id="Email"
                            label="Email Address"
                            value={state!.Email || ''}
                            onChange={onInputchange}
                        />
                        <TextField className="ml-auto"
                            autoFocus
                            margin="dense"
                            id="Phone"
                            label="Phone"
                            style={{ marginLeft: 8 }}
                            value={state!.Phone || ''}
                            onChange={onInputchange}
                        /></div><TextField className="ml-auto"
                        autoFocus
                        margin="dense"
                        id="IdentityNumber"
                        label="Identity Number"
                        value={state!.IdentityNumber || ''}
                        onChange={onInputchange}

                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleEditPopup()} color="primary">
                        Cancel
                    </Button>

                    <Button onClick={() => updateEmployee()} color="primary">
                        Update
                    </Button>
                    {/* <Button onClick={() => print()} color="primary">
                        print
                    </Button> */}
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default Employee;