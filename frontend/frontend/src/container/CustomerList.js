import React, { useEffect, useState } from 'react';
import CustomerDetails from './CustomerDetails';
import CustomerItem from '../components/CustomerItem';
import Database from '../API';
import './CustomerList.css';

function CustomerList(props){
    const [customers, setCustomers] = useState([]);
    const [currentHistory, setCurrentHistory] = useState([]);
    const [currentDetail, setCurrentDetail] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirthday, setDateOfBirthday] = useState("");

    useEffect(() => {
        const getCustomers = async()=>{
            const allCustomers = await Database.getAllCustomerNames(props.token);
            setCustomers(allCustomers);
        }
        getCustomers();
    },[]);

    const closeSession = () => {
        sessionStorage.removeItem('token');
        props.deleteToken();
    }

    const onSubmitNewCustomer = (event)=>{
        event.preventDefault();
        Database.createCustomer(name, email, dateOfBirthday, props.token);
    }

    const nameOnChange = (event) =>{
        setName(event.target.value);
    }

    const emailOnChange = (event) =>{
        setEmail(event.target.value);
    }

    const dateOfBirthdayOnChange = (event) => {
        setDateOfBirthday(event.target.value);
    }

    const getCustomerHistory = async (event, id, customerDetails) => {
        event.preventDefault();
        const details = await Database.getCustomerHistory(id, props.token);
        setCurrentHistory(details);
        setCurrentDetail(customerDetails)
    }

    const onUpdateStatus = async (event, customerId, status) => {
        event.preventDefault();
        Database.updateCustomerStatus(customerId, status, props.token);
    }

    return(
        <div className="main-page">
            <div className="customer-list-container">
                <div className="new-customer-form">
                    <form onSubmit={onSubmitNewCustomer}>
                        <h4>Agregar nuevo cliente</h4>
                        <p>Nombre</p>
                        <input type="text" onChange={nameOnChange}/>
                        <p>Fecha de nacimiento</p>
                        <input type="date" onChange={dateOfBirthdayOnChange}/>
                        <p>Email</p>
                        <input type="email" onChange={emailOnChange}/>
                        <input type="submit" value="Save"/>
                    </form>
                </div>
                <div className="customer-list-items">
                    <h4  className="title-customer-list-items">Lista de clientes</h4>
                    {customers.map((customer)=> {
                        return(
                            <CustomerItem 
                                customer={customer} 
                                getCustomerHistory = {getCustomerHistory}
                            />
                        );
                    })}
                </div>
                <button onClick={closeSession}>Log out</button>
            </div>
            <div>
                <CustomerDetails 
                    currentHistory = {currentHistory}
                    currentDetail = {currentDetail}
                    onUpdateStatus = {onUpdateStatus}
                />
            </div>
        </div>
        );
}

export default CustomerList;