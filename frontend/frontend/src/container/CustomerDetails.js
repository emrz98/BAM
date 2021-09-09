import React, { useState } from 'react';
import Database from '../API';
function CustomerDetails(props){
    // Ordenar los estatus por fecha
    const lastStatus = (statusList) => {
        statusList.sort(function(a,b){
            return new Date(b.date) - new Date(a.date);
          });
        const statusListSize = statusList.length - 1
        return statusList[statusListSize];
    }
    const initStatus = props.currentHistory.length>0  ? lastStatus(props.currentHistory)["status"] : null;
    const [status, setStatus] = useState(initStatus);
    const handleStatus = (event) => {
        setStatus(event.target.value);
    }

    if(Object.keys(props.currentDetail).length > 0){
        return(
            <>
                <div>
                    <h3>Detalles</h3>
                        <p>Nombre: {props.currentDetail["name"]} </p>
                        <p>Fecha de nacimiento: {props.currentDetail["date_of_birth"]}</p> 
                        <p>Email: {props.currentDetail["email"]}</p>
                </div>
                <div>
                    <h3>Historia</h3>
                    <div>
                        <form onSubmit={e => props.onUpdateStatus(e, props.currentDetail["id"], status)}>
                            <select value={status === null ? initStatus : status} onChange={handleStatus}>
                                <option value="Nuevo">Nuevo</option>
                                <option value="En seguimiento">En seguimiento</option>
                                <option value="Atendido">Atendido</option>
                                <option value="Rechazado">Rechazado</option>
                            </select>
                            <input type="submit" value="Actualizar status"/>
                        </form>
                    </div>
                    {props.currentHistory.map((history) => {
                        console.log(history);
                        return(
                            <p>{history["status"]} {history["check_in_time"]}</p>
                        );
                    })}
                </div>
            </>
        )
    }
    else{
        return(null);
    }
    
}

export default CustomerDetails;