import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import { Table, Divider, Tag, message } from "antd";
import { Link } from "react-router-dom";
import { PlusCircleOutlined, UnorderedListOutlined } from "@ant-design/icons";
const axios = require("axios");

const columns = [
  {
    title: "Event Name",
    dataIndex: "name",
    key: "id",
  },
  {
    title: "Event Time Span",
    dataIndex: "timespan",
    key: "id",
  },

  {
    title: "Event description",
    dataIndex: "description",
    key: "description",
  },
];

const deleteService = (id) => {
  fetch("http://localhost:3000/service/delete/" + id, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        message.success("Successfully Deleted :) ");
      } else {
        message.error("Failed to delete ");
      }
    });
};


function Home() {
  const [eventlist, seteventlist] = useState();

  const fetchData = () => {
    var config = {
      method: "get",
      url: "http://localhost:3000/api/event/getall",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));

        seteventlist(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={{
        height: "100vh",

        backgroundImage:
          "url(" +
          "https://capefearenrichmentprogram.org/wp-content/uploads/2018/01/Light-Grey-Background.jpg" +
          ")",

        paddingTop: "5%",
      }}
    >
      <h1> Events </h1>
      <br></br>

      <Link to="/add">
        <Button
          type="primary"
          icon={<PlusCircleOutlined style={{ fontSize: "18px" }} />}
        >
          Add A New Event
        </Button>
      </Link>

      <br></br>
      <br></br>
      <div style={{ padding: "50px" }}>
        <Table columns={columns} dataSource={eventlist} />
      </div>
    </div>
  );
}

export default Home;
