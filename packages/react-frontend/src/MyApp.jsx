// src/MyApp.jsx
import React, {useState, useEffect} 
from 'react';import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);
  function updateList(person) { 
    postUser(person)
      .then((response) => {
        if(response.ok){
          return response.json()
        }
      }).then((json) => {
        console.log(json);
        setCharacters([...characters, json]);
      }).catch((error) => {
        console.log(error);
      })
  }
  function removeOneCharacter(index) {
    const personToRemove = characters[index];
    deleteUser(personToRemove)
      .then((response) => {
        if(response.ok){
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
      }
      }).catch((error) => {
        console.log(error);
      })
  }
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function deleteUser(person) {
    const promise = fetch(("Http://localhost:8000/users/".concat(person["id"])), {
      method: "DELETE"});
    return promise;
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    return promise;
  }
  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );
  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
       <Form handleSubmit={updateList} />
    </div>
  );
}
export default MyApp;