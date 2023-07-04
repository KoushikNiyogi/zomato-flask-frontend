import { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
} from '@chakra-ui/react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the backend
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    axios.get('https://zomato-backend-api.onrender.com/review_orders')
            .then(res=>setOrders(res.data.orders))
            .catch(err=>console.log(err))
    
  };

  const handleUpdateStatus = (id,order_status) => {
    // TODO: Handle updating the order status
    console.log(id,order_status);
    if(order_status!=="Delivered"){
    let status = ""
    if(order_status == "Received"){
       status = "Preparing"
    }else if(order_status == "Preparing"){
       status = "Ready for Pickup"
    }else if(order_status == "Ready for Pickup"){
        status = "Delivered"
    }
    console.log(status);
    let obj = {
        id,
        status
    }
    axios.patch(`https://zomato-backend-api.onrender.com/update_order`,obj)
    .then(res=>{
        toast.success(res.data.msg);
        fetchOrders()
    })
    .catch(err=>console.log(err))
    }
  };

  return (
    <Box width={"80%"} margin={"auto"}>
    <Table variant="striped" colorScheme="gray">
      <Thead>
        <Tr>
          <Th>No.</Th>
          <Th>Customer Name</Th>
          <Th>Dish</Th>
          <Th>Status</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.map((order, index) => (
          <Tr key={order.id}>
            <Td>{index + 1}</Td>
            <Td>{order.customer_name}</Td>
            <Td>{order.dishes}</Td>
            <Td>{order.status}</Td>
            <Td>
              <Button
                colorScheme="blue"
                size="sm"
                isDisabled = {order.status == "Delivered"}
                onClick={() => handleUpdateStatus(order.id,order.status)}
              >
                Update Status
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
    </Box>
  )
};

export default Orders;
