import React, { useEffect, useState} from 'react';
import './App.css';

async function getUserData({email, password, app}) {
  return fetch('https://dev.tuten.cl:443/TutenREST/rest/user/testapis%40tuten.cl', {
    method: 'PUT',
    headers: {
      Host: 'dev.tuten.cl',
      Accept: 'application/json',
      App: app,
      Password: password,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email }),
  }).then(r => r.json())
}

async function getData() {
  const formData = {
    email: 'testapis@tuten.cl',
    password: '1234',
    app: 'APP_BCK'
  }
  try {
    const userData = await getUserData(formData);
    if (userData.sessionTokenBck) {
      const bookingReqUser = {...formData, sessionTokenBck : userData.sessionTokenBck};
      return getBookings(bookingReqUser)
    }
  } catch (error) {
    return Promise.reject(error)
  }

}
async function getBookings({email: Adminemail, password, app, sessionTokenBck}) {
  return fetch('https://dev.tuten.cl/TutenREST/rest/user/contacto%40tuten.cl/bookings?current=true', {
    method: 'GET',
    headers: {
      Host: 'dev.tuten.cl',
      Accept: 'application/json',
      App: app,
      Password: password,
      'Content-Type': 'application/json',
      Token: sessionTokenBck,
      Adminemail: Adminemail
    },
  }).then((r) => r.json())
}

  getData().then(data => data).then(resp => {
  
    return resp
           
   })
.catch( error => console.log(error));



function App () {


    const [bookData, setbookData] = useState ([])

    useEffect(() => {

      getData().then(r => {
        setbookData([...r])
    })

    },[])

  return (
    <div>
      <div style={{padding: '30px'}}>
        <h1>TEST3#</h1>
        <table className="Table">
  <tr className="Tr">
    <th className="Th">BookingId</th>
    <th  className="Th">Cliente</th>
    <th  className="Th">Fecha de Creación</th>
    <th  className="Th">Dirección</th>
    <th  className="Th">Precio</th>

  </tr>
  {bookData.map((r, i) => {
    return(
          <tr className="Tr" key={i}>
        <td className="Td">{r.bookingId}</td>
        <td className="Td">{r.tutenUserClient.firstName +' '+ r.tutenUserClient.lastName}</td>
        <td className="Td">{r.bookingTime}</td>
       <td className="Td">{r.locationId.streetAddress}</td> 
        <td className="Td">${r.bookingPrice}</td>  
        </tr>
    )
  })}
  </table>
      </div>
    </div>
  );
    
}

export default App;