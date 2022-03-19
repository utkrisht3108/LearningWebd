import React from "react";
import { Link } from "react-router-dom";
import user from "../images/ieee-logo.jpeg";

const ContactDetail = (props) => {
  //   console.log(props);
  const { name, email } = props.location.state.contact;
  return (
    <div className="main" style={{ marginTop: "50px" }}>
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
          <button className="ui button red right">Back to Contacts</button>
        </Link>
      </div>
    </div>
  );
};
export default ContactDetail;
