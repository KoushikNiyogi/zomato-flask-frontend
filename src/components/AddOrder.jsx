import { useParams } from 'react-router-dom';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddOrder = () => {
  const [menu, setMenu] = useState([]);
  const [name,setName] = useState("");
  const [user,setuser] = useState(JSON.parse(localStorage.getItem("user"))||{});
  const { id } = useParams();
  const dish = menu.find((dish) => dish.id === id);
  
  const handleSubmitOrder = (event) => {
    event.preventDefault();
    let obj={
        id,
        name : user.name,
        dishes : dish.name,
        dishid : dish.id,
        price : dish.price,
        userid : user.id
    }
    axios.post(`https://zomato-backend-api.onrender.com/take_order`,obj)
        .then(res=>{
            toast.success(res.data.msg);
            fetchMenu()
        })
        .catch(err=>console.log(err))
  };
  useEffect(() => {
    fetchMenu();
}, []);

const fetchMenu =  () => {
        axios.get('https://zomato-backend-api.onrender.com/menu')
        .then(res=>setMenu(res.data.menu))
        .catch(err=>console.log(err))
};
console.log(user.name);
  return (
    <Box>
    <Flex justify="center" width={"70%"} margin={"auto"}>
      <Box width="50%" p={6} bg="white" boxShadow="lg">
        <form onSubmit={handleSubmitOrder}>
          <FormControl mb={4}>
            <FormLabel htmlFor="id">ID</FormLabel>
            <Input id="id" value={id} isReadOnly />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="customerName">Customer Name</FormLabel>
            <Input
              id="customerName"
              value={user.name}
              isReadOnly
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Add Order
          </Button>
        </form>
      </Box>

      <Box width="50%" p={6} bg="gray.100">
        {dish && (
          <>
            <Heading as="h2" size="md" mb={2}>
              {dish.name}
            </Heading>
            <Text>
              Price: <strong>{dish.price}</strong>
            </Text>
            <Text>
              Availability:{' '}
              <strong>
                {dish.availability ? 'Available' : 'Not Available'}
              </strong>
            </Text>
          </>
        )}
      </Box>
    </Flex>
    </Box>
  );
};

export default AddOrder;
