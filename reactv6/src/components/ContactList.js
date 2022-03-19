import React from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  //   console.log(props.contacts);

  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

  // const contacts = [
  //   {
  //     id: "1",
  //     name: "John",
  //     email: "john@gmail.com",
  //   },
  // ];

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={deleteContactHandler}
        key={contact.id}
      ></ContactCard>
    );
  });
  return (
    <div className="main">
      <h2>HIIi</h2>
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>

      <div className="ui celled list">{renderContactList}</div>
    </div>
  );
};
export default ContactList;
