import axios from "axios";
import { useEffect, useState } from "react";
import AddDishModal from "./AddDishModal";
import { Button } from '@chakra-ui/react';
import { toast } from 'react-toastify'
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl,
    FormLabel,Input,Textarea,Switch,Box, Table,Thead,Tbody,Th ,Tr,Td
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
const initial = {
    name: "",
    price: 0,
    availability: false
}
export default function Menu() {
    const [newDish, setNewDish] = useState(initial)
    const [menu, setMenu] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [role, setRole] = useState(localStorage.getItem("role"));
    const navigate = useNavigate();
    // Fetch menu data from the backend
    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu =  () => {
            axios.get('https://zomato-backend-api.onrender.com/menu')
            .then(res=>setMenu(res.data.menu))
            .catch(err=>console.log(err))
    };

    const handlePlaceOrder = (id) => {
        // Handle placing order for the selected dish
        // You can make a request to the backend to process the order
        navigate(`/add_order/${id}`)
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    // Function to handle closing the modal
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    // Function to handle submitting a new dish
    const handleSubmitDish = () => {
        console.log(newDish)
        axios.post(`https://zomato-backend-api.onrender.com/add_dish`,newDish)
        .then(res=>{
            toast.success(res.data.msg);
            fetchMenu()
        })
        .catch(err=>console.log(err))
    };

    const handleUpdate = (dish) => {
        let obj = {
            id : dish.id,
            availability : !dish.availability
        }
        axios.post(`https://zomato-backend-api.onrender.com/update_availability`,obj)
        .then(res=>{
            console.log(res);
            toast.success(res.data.msg);
            fetchMenu()
        })
        .catch(err=>console.log(err))
    };

    const handleRemove = (id) => {
        axios.delete(`https://zomato-backend-api.onrender.com/remove_dish/${id}`)
        .then(res=>{
            toast.success(res.data.msg);
            fetchMenu()
        })
        .catch(err=>console.log(err))
    };
    return (
    <Box py={8}>
      <Box mb={8} textAlign="center">
        <h1 style={{ fontSize: '2rem' }}>Menu</h1>
        {role === 'admin' && (
          <Button colorScheme="blue" onClick={handleOpenModal} mt={4}>
            Add Dish
          </Button>
        )}
      </Box>

      <Table variant="simple" width="80%" margin={"auto"}>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Availability</Th>
            {role === 'admin' && <Th>Actions</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {menu.map((dish, index) => (
            <Tr key={dish.id}>
              <Td>{index + 1}</Td>
              <Td>{dish.name}</Td>
              <Td>{dish.price}</Td>
              <Td>{dish.availability ? 'Available' : 'Not Available'}</Td>
              {role === 'admin' && (
                <Td>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleUpdate(dish)}
                    mr={2}
                  >
                    Update
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleRemove(dish.id)}
                  >
                    Remove
                  </Button>
                </Td>
              )}
              {role === 'user' && (
                <Td>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handlePlaceOrder(dish.id)}
                    isDisabled={!dish.availability}
                  >
                    Place Order
                  </Button>
                </Td>
              )}
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
              <FormLabel>Name</FormLabel>
              <Input
                value={newDish.name}
                onChange={(e) =>
                  setNewDish({ ...newDish, name: e.target.value })
                }
                placeholder="Enter dish name"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                value={newDish.price}
                onChange={(e) =>
                  setNewDish({ ...newDish, price: e.target.value })
                }
                placeholder="Enter dish price"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Availability</FormLabel>
              <Switch
                isChecked={newDish.availability}
                onChange={(e) =>
                  setNewDish({ ...newDish, availability: e.target.checked })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleSubmitDish}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>

    );
}
