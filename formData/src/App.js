import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);

  const handleForm =(e)=>{
    console.log(e.target.value)
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()

    const response = await fetch("http://localhost:8080/demo", {
      method : 'POST',
      body : JSON.stringify(form),
      headers : {
        'Content-type' : 'application/json'
      }

    })

    const data = await response.json()

    console.log(data)
  }

  const getUsers = async()=>{
    const response = await fetch("http://localhost:8080/demo", {
      method : 'GET',
    })

    const data = await response.json()
    setUsers(data)
    console.log(data)
  }

  useEffect(()=> {
    getUsers()
  }, [])

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {/* <p>
          {JSON.stringify(form)} 
        </p> */}
        <span>Username</span>
        <input type="text" name='username' onChange={handleForm} />
        <span>Email</span>
        <input type="password" name='email' onChange={handleForm} />
        <span>Phone</span>
        <input type='number' name='phone' onChange={handleForm} />
        <span>Amount</span>
        <input type='number' name='amount' onChange={handleForm} />
        <span>Promocode</span>
        <input type='string' name='promocode' onChange={handleForm} />
        <span> Discount Price </span>
        <input type='number' name='discAmount' onChange={handleForm} />
        <button type='submit'>Submit</button>
      </form>
      <div>
        <ul>
         {users.map((user)=> {
          return (
            <>
            <div className='data'>
              <div className="data-1">

              <ul>

            <label>Username : </label>
            <li key={user.id}>{user.username} </li>

            <span>Email : </span>
            <li key={user.id}>{user.email} </li>

            <span>Phone : </span>
            <li key={user.id}>{user.phone} </li>

            <span>Amount : &#8377; </span>
            <li key={user.id}>{user.amount} </li>

            <span>Promocode : </span>
            <li key={user.id}>{user.promocode} </li>

            <span>Discount Price : &#8377; </span>
            <li key={user.id}>{user.discAmount} </li>
            </ul>

            <br />
            <hr />

            </div>
              </div>
            </>
          )
         })}
        </ul>
      </div>
    </div>
  );
}

export default App;
