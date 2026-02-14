import { use, useState } from "react";
import { Link } from "react-router";

const Users = ({ usersPromise }) => {

    const initialUsers = use(usersPromise);
    // console.log(initialUsers);
    const [users, setUsers] = useState(initialUsers);
    console.log(users)

    const handleAddUser = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const newUser = { name, email };
        console.log(newUser);

        //create user in the db
        fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
            .then(res => res.json())
            .then(data => {
                console.log("data after creating user in db ", data)
                if (data.insertedId) {
                    newUser._id = data.insertedId;
                    const newUsers = [...users, newUser];
                    setUsers(newUsers);
                    e.target.reset()
                    alert("data added succesfully")
                }
            })

    }

    const handleDeleteUser = (id) => {
        console.log('delete user ', id)
        fetch(`http://localhost:3000/users/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    const reaminingUsers = users.filter(user => user._id !== id)
                    setUsers(reaminingUsers)
                    alert("user data deleted succesfully")
                    console.log("deleted user ", data)
                }

            })
    }
    return (
        <div>

            <div>
                <h2>Users: {users.length}</h2>
                <form onSubmit={handleAddUser}>
                    <input type="text" name="name" id="" />
                    <br />
                    <input type="email" name="email" id="" />
                    <br />
                    <input type="submit" value="Add User" />
                </form>
            </div>
            {/* show users */}
            <div>
                {
                    users.map(user =>
                        <p key={user._id}> {user.name} : {user.email}
                            <Link to={`/users/${user._id}`}>User Details</Link>
                            <Link to={`/update/${user._id}`}>Edit</Link>
                            <button onClick={() => handleDeleteUser(user._id)}>X</button>
                        </p>)
                }
            </div>
        </div>
    );
};

export default Users;