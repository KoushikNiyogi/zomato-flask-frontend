import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl,
  FormLabel, Input, Textarea, Switch, NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import axios from 'axios';
import { toast } from 'react-toastify';

const init = {
  review: "",
  rating: 1
}



const Orders = () => {
  const [id, setId] = useState();
  const [review, setReview] = useState(init)
  const [isModalOpen, setModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [role, setrole] = useState(localStorage.getItem("role") || "");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {})
 

  useEffect(() => {
    // Fetch orders from the backend
    fetchOrders();
    
  }, []);

 useEffect(()=>{
    const socket = io('https://zomato-flask-mongodb.onrender.com/');
    socket.on('order_status_changed', function(data) {
      var orderId = data.order_id;
      var newStatus = data.status;
      var id = data.userid;

      // Update the order status in the table
      axios.get("https://zomato-flask-mongodb.onrender.com/review_orders")
      .then(res=>{
         let user = JSON.parse(localStorage.getItem("user"))
         fetchOrders();
         if(user.id == id){
          alert(`Status of order ${orderId} has changed to ${newStatus}`)
         }
      })

      return () => {
        socket.disconnect();
      };
     
    })
  },[])

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://zomato-flask-mongodb.onrender.com/review_orders');
      const allOrders = response.data.menu;
      console.log(allOrders);
      if (role === 'admin') {
        setOrders(allOrders);
      } else {
        const filteredOrders = allOrders.filter(order => order.userid === user.id);
        console.log(filteredOrders)
        setOrders(filteredOrders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Function to handle submitting a new dish
  const handleSubmitReview = (id) => {
    console.log(id)
    axios.patch(`https://zomato-flask-mongodb.onrender.com/add_review/${id}`, review)
      .then(res => {
        console.log(res);
        toast.success(res.data.msg);
      })
      .catch(err => console.log(err))
  };

  const handleUpdateStatus = (id, order_status) => {
    // TODO: Handle updating the order status
    console.log(id, order_status);
    if (order_status !== "Delivered") {
      let status = ""
      if (order_status == "Received") {
        status = "Preparing"
      } else if (order_status == "Preparing") {
        status = "Ready for Pickup"
      } else if (order_status == "Ready for Pickup") {
        status = "Delivered"
      }
      console.log(status);
      let obj = {
        id,
        status
      }
      axios.patch(`https://zomato-flask-mongodb.onrender.com/update_order`, obj)
        .then(res => {
          toast.success(res.data.msg);
          fetchOrders()
        })
        .catch(err => console.log(err))
    }
  };

  const handleAddReview = (id) => {
    setId(id)
    handleOpenModal()
  };
  console.log(orders)
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
                {role === 'admin' ? (
                  <Button
                    colorScheme="blue"
                    size="sm"
                    isDisabled={order.status === 'Delivered'}
                    onClick={() => handleUpdateStatus(order.id, order.status)}
                  >
                    Update Status
                  </Button>
                ) : (
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleAddReview(order.id)}
                  >
                    Add Review
                  </Button>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>


      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Dish</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Review</FormLabel>
              <Input
                value={review.review} onChange={(e) => setReview({ ...review, review: e.target.value })}
                placeholder="Write your review"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Rating</FormLabel>
              <NumberInput defaultValue={review.rating} min={1} max={5} onChange={(value) => setReview({ ...review, rating: value })}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleSubmitReview}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
};

export default Orders;
