import "./__header.scss";
import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
export class Header extends React.Component {
  render() {
    var loggedIN = false;
    var truncate = function (fullStr, strLen, separator) {
      if (fullStr.length <= strLen) return fullStr;

      separator = separator || "...";

      var sepLen = separator.length,
        charsToShow = strLen - sepLen,
        frontChars = Math.ceil(charsToShow / 2),
        backChars = Math.floor(charsToShow / 2);

      return (
        fullStr.substr(0, frontChars) +
        separator +
        fullStr.substr(fullStr.length - backChars)
      );
    };
    function setCookie(name, value, days) {
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    function getCookie(name) {
      var dc = document.cookie;
      var prefix = name + "=";
      var begin = dc.indexOf("; " + prefix);
      if (begin === -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
      } else {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end === -1) {
          end = dc.length;
        }
      }
      // because unescape has been deprecated, replaced with decodeURI
      //return unescape(dc.substring(begin + prefix.length, end));
      return decodeURI(dc.substring(begin + prefix.length, end));
    }
    function eraseCookie(name) {
      document.cookie =
        name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
    function toggleSidebar() {
      var sidebar = document.querySelector(".Sidebar");
      if (sidebar.classList.contains("active")) {
        sidebar.classList.remove("active");
      } else {
        sidebar.classList.add("active");
      }
    }
    function gettronweb() {
      if (getCookie("accountAddr") === null) {
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
          loggedIN = true;
          var accountADDR = window.tronWeb.defaultAddress.base58;
          var inputField = document.querySelector(".register-767273");
          console.log(inputField);
          var addr = truncate(accountADDR, 9, ".....");
          inputField.innerHTML = addr;
          setCookie("accountAddr", accountADDR, 5);
        }
      } else {
        console.log("noy empty");
      }
    }
    if (getCookie("accountAddr") === null) {
      var button = (
        <a className="register-767273" onClick={gettronweb}>
          Connect
        </a>
      );
    } else {
      const accountADDR = getCookie("accountAddr");
      const addr = truncate(accountADDR, 9, ".....");
      var button = (
        <a className="register-767273" onClick={gettronweb}>
          {addr}
        </a>
      );
    }

    return (
      <div className="Header">
        <div className="logo-f125d6">
          <img src="images/LOGO.png" alt="PSRS" />
        </div>
        <div className="menu-01d6f6">
          <div className="menu-toggle-86fad">
            <img
              onClick={toggleSidebar}
              src="images/svg/menu-toggle.svg"
              alt="menu"
            />
          </div>
        </div>
        <div className="register-01d6f6">{button}</div>
      </div>
    );
  }
}
