import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import { Navbar,Nav, Container } from 'react-bootstrap';

export class OldNavigation extends Component{

    render(){
        return(
            <Navbar bg="dark" expand="lg">
                <Container>
                        <Nav className="flex-row">
                            <NavLink className="d-inline p-2 bg-dark text-white" to="/">Home</NavLink>
                            <NavLink className="d-inline p-2 bg-dark text-white" to="/employee">Employee</NavLink>
                        </Nav>
                </Container>
            </Navbar>
        )
    }
}