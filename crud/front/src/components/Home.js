import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [userData, setUserdata] = useState([]);
  // console.log(userData);
  const getData = async (e) => {
    const res = await fetch("http://localhost:8003/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      setUserdata(data);
      // console.log("data recieved");
    }
  };

  useEffect(() => {
    getData();
  });

  const deleteuser = async (id) => {
    const res2 = await fetch(`http://localhost:8003/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deleteData = await res2.json();
    console.log(deleteData);
    if (res2.status === 422 || !deleteData) {
      console.log(`error while deleting data`);
    } else {
      console.log(`user deleted`);
      getData();
    }
  };

  return (
    <div className="mt-5">
      <div className="container">
        <div className="add_btn mt-2 mb-2">
          <NavLink to="/form" className="btn btn-primary">
            Add Data
          </NavLink>
        </div>

        <table className="table">
          <thead>
            <tr className="table-dark">
              <th scope="col">id</th>
              <th scope="col">username</th>
              <th scope="col">email</th>
              <th scope="col">job</th>
              <th scope="col">number</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((element, id) => {
              return (
                <>
                  <tr>
                    <th scope="row">{id + 1}</th>
                    <td>{element.name}</td>
                    <td>{element.email}</td>
                    <td>{element.work}</td>
                    <td>{element.mobile}</td>

                    <td className="d-flex">
                      <NavLink to={`view/${element._id}`}>
                        <button className="btn btn-success btn-sm mx-2">
                          read
                        </button>
                      </NavLink>
                      <NavLink to={`edit/${element._id}`}>
                        {" "}
                        <button className="btn btn-warning btn-sm mx-2">
                          update
                        </button>
                      </NavLink>
                      <button
                        onClick={()=>deleteuser(element._id)}
                        className="btn btn-danger btn-sm mx-2"
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
