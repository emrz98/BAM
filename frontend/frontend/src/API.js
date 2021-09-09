import axios from 'axios';

class Database{
    static url = "http://127.0.0.1:8000/api/";

    static async authenticate(user, password, action){
        const data = {"username": user, "password": password}
        const response = await axios.post(Database.url + "login/", data)
                                    .then(response => response.data)
                                    .catch(e => alert(e));
        if(response === 400){
            alert("Invalid credentials");
        }
        else{
            action(response.token);
        }   
    }

    static async createCustomer(name, email, dateOfBirthday, token){
        const data = {"name": name, "date_of_birth": dateOfBirthday, "email":email};
        const response = await axios.post(Database.url + "customer/", 
                                          data, 
                                          {headers: { Authorization: `Token ${token}` }})
                                          .then(response => response.data)
                                          .catch(e => alert(e));
        if(response === 400){
            alert("Creacion incorrecta");
        }
        else{
            alert("Cliente creado");
            window.location.reload();
        }   
    }

    static async updateCustomerStatus(customerId, status, token){
        const data = {"status": status};
        const response = await axios.post(Database.url + "customer/" + customerId + "/history/", 
                                          data, 
                                          {headers: { Authorization: `Token ${token}` }})
                                            .then(response => response.data)
                                            .catch(e => alert(e));
        if(response === undefined){
            alert("Para actualizar el estatus debes escoger uno diferente");
        }
        else{
            alert("Status Actualizado");
            window.location.reload();
        }   
    }

    static async getAllCustomerNames(token, action){
        const response = await axios.get(Database.url + "customer/",  {headers: { Authorization: `Token ${token}` }})
                                    .then(response => response.data)
                                    .catch(e => alert(e));
        
        return response;
    }

    static async getCustomerHistory(customerId, token){
        const response = await axios.get(Database.url + "customer/" + customerId + "/history/", 
                                        {headers: { Authorization: `Token ${token}` }})
                                    .then(response => response.data)
                                    .catch(e => alert(e));
        
        return response;
    }
}

export default Database;