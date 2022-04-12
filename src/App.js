import React, { useState } from "react";
import "./styles.css";
import patients from "./api.js";

export default function App() {
  const mapTest = patients.patients.map((item, idx) => {
    var d = new Date(item.birthdate);
    let timeStampCon = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();
    return { ...item, birthdate: timeStampCon };
  });
  const [data, setData] = useState(mapTest);

  const [order, setOrder] = React.useState("");
  const [orderBy, setOrderBy] = React.useState("");

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const cardElements = data
    .sort(getComparator(order, orderBy))
    .map((item, idx) => (
      // const cardElements = data.map((item, idx) => (
      <div className="card" key={idx}>
        <p>
          <b>First Name:</b> {item.firstName}
        </p>
        <p>
          <b>Last Name:</b> {item.lastName}
        </p>
        <p>
          <b>Sex:</b> {item.sex}
        </p>
        <p>
          <b>Date of Birth: </b>
          {item.birthdate}
        </p>
        <span>
          <b>Conditions:</b> {item.conditions.join(", ")}
        </span>
      </div>
    ));

  function search(searchText) {
    let filterVal = data.filter(
      (el) => {
        return JSON.stringify(el)
          .toLowerCase()
          .includes(searchText.toLowerCase());
      } // el.firstName.toLowerCase().includes(searchText.toLowerCase())
    );
    setData(filterVal);
  }

  function getOrder(buttonClicked) {
    if (orderBy !== buttonClicked) {
      return "asc";
    } else {
      return order === "asc" ? "desc" : "asc";
    }
  }

  return (
    <div className="App">
      <h1>Patients Directory</h1>

      <input
        type="text"
        placeholder="Search"
        name="searchTxt"
        onChange={(e) => {
          search(e.target.value);
        }}
      />
      {/* <button name="searchBtn" value="searchBtn" onClick={handleSearch}>
        Search
      </button> */}
      <div className="box-container">
        <button
          className={orderBy === "firstName" ? "lighted" : null}
          value="firstName"
          name="firstName"
          onClick={(e) => {
            setOrderBy("firstName");
            setOrder(getOrder("firstName"));
          }}
        >
          {`First Name ~ Sorted ${order}`}
        </button>
        <button
          className={orderBy === "lastName" ? "lighted" : null}
          value="lastName"
          name="lastName"
          order="asc"
          onClick={(e) => {
            setOrderBy("lastName");
            setOrder(getOrder("lastName"));
          }}
        >
          {`Last Name ~ Sorted ${order}`}
        </button>
        <button
          className={orderBy === "sex" ? "lighted" : null}
          value="sex"
          name="sex"
          onClick={(e) => {
            setOrderBy("sex");
            setOrder(getOrder("sex"));
          }}
        >
          {`Sex ~ Sorted ${order}`}
        </button>
        <button
          className={orderBy === "birthdate" ? "lighted" : null}
          label="birthdate"
          name="birthdate"
          onClick={(e) => {
            setOrderBy("birthdate");
            setOrder(getOrder("birthdate"));
          }}
        >
          {`Date Of Birth ~ Sorted ${order}`}
        </button>

        {cardElements}
      </div>
    </div>
  );
}

// let keys=Object.keys(el)
// console.log(Object.keys(el), "key")
// for(let i=0; i<keys.length;i++){
//   let keyFilter=(el[keys[i]]).toLowerCase().includes(searchText.toLowerCase());
//   console.log(keys[i], "keyFilter")
// }

//  return console.log(data[0], "el val");
