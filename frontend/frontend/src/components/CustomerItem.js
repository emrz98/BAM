import react from 'react';
import './CustomerItem.css';
function CustomerItem(props){
    return(
        <p className="customer-item item" onClick={e => props.getCustomerHistory(e, props.customer["id"], props.customer)}>
            {props.customer["name"]}
        </p>
    );
}
export default CustomerItem;