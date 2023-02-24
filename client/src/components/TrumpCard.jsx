import React from "react";
import { useState } from "react";


//crreate a trump card component
const TrumpCards = () => {
    const [users, setUsers] = useState([
        { id: 0, first_name: "Devansh", last_name: "Mittal", role: "Senior Designer", company: "Web Products", location: "London,UK", image_url: "https://iili.io/HcpI6EQ.jpg" },
        { id: 1, first_name: "Johannes", last_name: "Breulmann", role: "Product Lead", company: "DACH Group", location: "Berlin,DE", image_url: "https://iili.io/HcpAqBf.jpg" },
        { id: 2, first_name: "Joshua", last_name: "Gann", role: "Software Engindeer", company: "Playform Team", location: "London,UK", image_url: "https://iili.io/HcpISTu.jpg" },
    ]);

    //geenrate a ramdom number save it to a variable then use that variable to get the user from the array
    const random = Math.floor(Math.random() * users.length);
    const user = users[random];



    // when a button is clicked, it will check if the id of the button is equal to the id of the user, if it is, it will show a message saying "you got it right" and if it is not, it will show a message saying "you got it wrong"
    const handleClick = (e) => {
        if (e.target.id == user.id) {
            alert("You got it right!")
        } else {
            alert("You got it wrong!")
        }
    }

    //create buttons showing the fisrt name and last name of the users
    const buttons = users.map((user) => {
        return (
            <button key={user.id} className="trump-card__button" id={user.id} onClick={handleClick} class="btn btn-primary">
                {user.first_name} {user.last_name}
            </button>
        )
    })



    return (
        <div>
            <div className="trump-card">
                <div className="trump-card__image">
                    <img src={user.image_url} alt="user" />
                </div>
                <div className="trump-card__info">
                    <h2>{user.first_name} {user.last_name}</h2>
                    <p>{user.role}</p>
                    <p>{user.company}</p>
                    <p>{user.location}</p>
                </div>
            </div>

            <div>
                {buttons}
            </div>

        </div>
    )
}





export default TrumpCards 