import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import "./listCreate.css";

const ListCreate = ({ handleClose, userData, refreshLists }) => {
  const [listName, setListName] = useState("");

  const createListReq = () => {
    const userInfo = userData.data.data;
    const token = userInfo.accessToken;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const createListData = {
      user_key: userInfo.key,
      name: listName,
    };

    const api = import.meta.env.VITE_API_URL;

    axios
      .post(`${api}/list`, createListData, config)
      .then((response) => {
        console.log(response);
        handleClose();
        refreshLists();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="frame-listCreate">
      <h2>단어장 이름</h2>
      <input
        type="text"
        name="name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />
      <button onClick={createListReq}>생성</button>
      <button onClick={handleClose}>취소</button>
    </div>
  );
};

ListCreate.propTypes = {
  handleClose: PropTypes.func.isRequired,
  userData: PropTypes.object,
  refreshLists: PropTypes.func.isRequired,
};

export default ListCreate;
