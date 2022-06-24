import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  // const [userData, setUserdata] = useState([]);
const history = useNavigate()

  const [inp, setInp] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    add: "",
    desc: "",
  });

  const setData = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setInp((preVal) => {
      return {
        ...preVal, 
        [name]: value,
      };
    });
  };

  const { id } = useParams("");
  console.log(id);

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
      setInp(data);
      console.log("data recieved");
    }
  };

  useEffect(() => {
    getuser();
  },[]);

  const updateuser = async (e) => {
    e.preventDefault();

    const { name, email, age, mobile, work, add, desc } = inp;

    const res2 = await fetch(`http://localhost:8003/edit/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        age,
        mobile,
        work,
        add,
        desc,
      }),
    });
    const data2 = await res2.json();
    // console.log(data2);

    if (res2.status === 422 || !data2) {
      alert(`please fill the data`);
    } else {
      setInp(data2);
      history('/')
      alert(`data upadated`);
    }
  };

  return (
    <div className="container">
      <NavLink to="/">Home</NavLink>
      <form className="mt-4">
        <div className="row ">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="name"
              name="name"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={setData}
              value={inp.name}
            />
          </div>

          <div className="mb-3 col-md-6 col-lg-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={setData}
              value={inp.email}
            />
          </div>

          <div className="mb-3 col-md-6 col-lg-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Age
            </label>
            <input
              type="text"
              name="age"
              className="form-control"
              id="exampleInputPassword1"
              onChange={setData}
              value={inp.age} 
            />
          </div>

          <div className="mb-3 col-md-6 col-lg-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Mobile
            </label>
            <input
              type="number"
              name="mobile"
              className="form-control"
              id="exampleInputPassword1"
              onChange={setData}
              value={inp.mobile}
            />
          </div>

          <div className="mb-3 col-md-6 col-lg-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Work
            </label>
            <input
              type="text"
              name="text"
              className="form-control"
              id="exampleInputPassword1"
              onChange={setData}
              value={inp.work}
            />
          </div>

          <div className="mb-3 col-md-6 col-lg-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input
              type="text"
              name="add"
              className="form-control"
              id="exampleInputPassword1"
              onChange={setData}
              value={inp.add}
            />
          </div>

          <div className="mb-3 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              name="desc"
              cols="30"
              rows="5"
              className="form-control"
              id="exampleInputPassword1"
              onChange={setData}
              value={inp.desc}
            />
          </div>

          <button
            type="submit"
            onClick={updateuser}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
