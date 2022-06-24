import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const Detail = () => {
  const [userData, setUserdata] = useState([]);
  // console.log(setUserdata);

  const { id } = useParams("");
  console.log(id);

  const history = useNavigate();

  const getuser = async () => {
    const res = await fetch(`http://localhost:8003/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log(data);

    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      setUserdata(data);
      console.log("data recieved");
    }
  };

  useEffect(() => {
    getuser();
  }, []);

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
      history("/");
    }
  };

  return (
    <div className="container mt-3">
      <NavLink to="/">Home</NavLink>
      <h3 className="mt-4" style={{ fontWeight: 400 }}>User Details</h3>
      <Card sx={{ maxWidth: 600 }} className="card col-lg-6 col-md-6 col-12 ">
        <CardContent>
          <div className="add_btn">
            <NavLink to={`/edit/${userData._id}`}>
              {" "}
              <button className="btn btn-warning btn-sm mx-2">update</button>
            </NavLink>
            <button
              onClick={() => deleteuser(userData._id)}
              className="btn btn-danger btn-sm mx-2"
            >
              delete
            </button>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <h4 className="mt-2">
                Name:<span>{userData.name}</span>
              </h4>
              <h4 className="mt-2">
                Age:<span>{userData.age}</span>
              </h4>
              <p className="mt-2">
                Email:<span>{userData.email}</span>
              </p>
              <p className="mt-2">
                occupation:<span>{userData.work}</span>
              </p>
            </div>

            <div className="right_view col-lg-6 col-md-6 col-12">
              <p className="mt-2">
                Mobile:<span>{userData.mobile}</span>
              </p>
              <p className="mt-2">
                Location:<span>{userData.add}</span>
              </p>
              <p className="mt-2">
                Description:<span>{userData.desc}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Detail;
