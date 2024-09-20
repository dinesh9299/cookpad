import React, { useState } from "react";
import logo from "../images/logo1.png";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import MenuIcon from "@mui/icons-material/Menu";

import { Link, useNavigate } from "react-router-dom";

const HEader = () => {
  const [menu, setMenu] = useState(false);

  const navigate = useNavigate();

  const handleMenu = () => {
    setMenu(!menu);
  };

  const [search, setSearch] = useState(""); // Search state as a string

  const handleSearchChange = (e) => {
    e.preventDefault();
    const value = e.target.value; // Get the input value directly
    setSearch(value); // Update the search state directly with the new value
  };

  const handlesearchClick = (e) => {
    e.preventDefault();
    if (search !== "") {
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }

    // if (searchText.trim()) {
    //   navigate(`/search?query=${searchText}`); // Navigate to search page with query
    // }
  };

  return (
    <div className="">
      {/*Header section */}
      <header className=" p-3 bg-opacity-75 bg-info d-flex  align-items-center justify-content-between ">
        <div>
          <Link to={"/"}>
            <img
              src={logo}
              alt="logo"
              width={"200px "}
              height={"50px"}
              style={{ objectFit: "cover" }}
            ></img>
          </Link>
        </div>

        {/* desktop navigation */}

        <div className=" d-none d-lg-flex d-md-flex gap-3">
          <button className=" btn btn-secondary rounded-2">
            {" "}
            <Link to="/" className=" text-decoration-none  text-white">
              Home
            </Link>
          </button>
          <div>
            <Paper
              className=" bg-light"
              component="form"
              onSubmit={handlesearchClick}
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 250,
                height: "40px",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
                onChange={handleSearchChange}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton
                type="sybmit"
                sx={{ p: "10px" }}
                aria-label="search"
                // onClick={handlesearchClick}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
        </div>

        {/* mobile navigation */}

        <div className=" d-lg-none  d-md-none" onClick={handleMenu}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </header>
      {menu && (
        <div
          className=" text-start bg-secondary p-2  d-lg-none  d-md-none"
          style={{ transition: "transform 0.5s ease, opacity 2.5s ease" }}
        >
          <button className=" mb-2 btn btn-warning rounded-2">
            <Link to={"/"} className=" text-decoration-none text-dark">
              Home
            </Link>
          </button>
          <div>
            {" "}
            <Paper
              className=" bg-light rounded-3"
              component="form"
              onSubmit={handlesearchClick}
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: "40px",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
                onChange={handleSearchChange}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={handlesearchClick}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
        </div>
      )}
    </div>
  );
};

export default HEader;
