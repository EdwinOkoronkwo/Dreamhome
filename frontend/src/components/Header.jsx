import React from "react";
import { Link } from "react-router-dom";

export default function Header({ children }) {
  return (
    <>
      <div id="main-header-loading"></div>
      <header id="main-header">
        <div id="header-title">
          <h1>Dream Home</h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}
