import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';


const OrderStatusUpdate = () => {
    const [status, setStatus] = useState('');
  
    useEffect(() => {
      const socket = io('https://zomato-backend-api.onrender.com');
  
      // Listen for 'status_change' event from the server
      socket.on('order_status_updated', (data) => {
        const { order_id, status }=data
        console.log(status,order_id)
        // Update the status in the state
        //setStatus(status);
        console.log(socket);
      });
  
      return () => {
        socket.disconnect();
      };
    }, []);
  
    /*useEffect(() => {
      if (status) {
        // Display an alert with the updated status
        alert(`Order status changed to ${status}`);
      }
    }, [status]);*/
  
    const handleUpdateStatus = () => {
      // Send a PATCH request to update the order status
      fetch('https://zomato-backend-api.onrender.com/update_order', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'completed' }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    return (
      <div>
        <button onClick={handleUpdateStatus}>Update Order Status</button>
      </div>
    );
  };
  
  export default OrderStatusUpdate;
// const OrderStatusUpdate = () => {
//   const [socket, setSocket] = useState(null);
//   const [orderStatus, setOrderStatus] = useState('');

//   console.log(socket,orderStatus)
//   useEffect(() => {
//     // Connect to the Socket.IO server
//     const socket = io('https://zomato-backend-api.onrender.com');
//     console.log(socket.connected)
//     setSocket(socket);

//     socket.on('status_change', ({ order_id, new_status }) => {
//         setSocket((prevStatus) => {
//             if (prevStatus !== new_status) {
//               return new_status;
//             }
//             return prevStatus;
//           });
//         // Display an alert with the updated status
//         // setSocket(new_status)
//         //alert(`Order ${order_id} status changed to ${new_status}`);
//       });


//     // Clean up the socket connection on component unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, []);
  

//   useEffect(() => {
//     if (socket) {
//         alert(`Order status changed to ${socket}`);
//       // Listen for the 'order_status_updated' event
//     //   socket.on('order_status_updated', (data) => {
//     //     console.log('Order status updated:', data);
//     //     setOrderStatus(data.status);
//     //   });
//     }
//   }, [socket]);

//   const handleUpdateOrderStatus = () => {
//     // Make an API request to update the order status
//     // ...

//     // Emit the 'update_order_status' event to notify other clients
//     socket.emit('update_order_status', { order_id: 1, status: 'completed' });
//   };

//   return (
//     <div>
//       <h1>Order Status Update</h1>
//       <p>Current order status: {orderStatus}</p>
//       <button onClick={handleUpdateOrderStatus}>Update Order Status</button>
//     </div>
//   );
// };

// export default OrderStatusUpdate;