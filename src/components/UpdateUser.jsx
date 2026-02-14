import { useLoaderData } from "react-router";

const UpdateUser = () => {
    const user = useLoaderData();
    console.log(user);

    const handleUpdateUser = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const updatedUser = { name, email };
        console.log(name, email);

        //update user
        fetch(`http://localhost:3000/users/${user._id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {

                    console.log("data after update", data);
                }
            })
    }
    return (
        <div>
            <form onSubmit={handleUpdateUser}>
                <input type="text" name="name" id="" defaultValue={user.name} />
                <br />
                <input type="email" name="email" id="" defaultValue={user.email} />
                <br />
                <input type="submit" value="Update User" />

            </form>
        </div>
    );
};

export default UpdateUser;