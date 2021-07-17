import "./__sidebar.scss";
import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
export class Sidebar extends React.Component {
  render() {
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
    function logOutACC() {
      eraseCookie("accountAddr");
      var inputFieldsb = document.querySelector(".register-767273-pc");
      var inputField = document.querySelector(".register-767273");
      inputField.innerHTML = "Connect";
      inputFieldsb.innerHTML = "Connect";
    }

    function setCookie(name, value, days) {
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    function gettronweb() {
      if (getCookie("accountAddr") === null) {
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
          var accountADDR = window.tronWeb.defaultAddress.base58;
          var inputField = document.querySelector(".register-767273");
          console.log(inputField);
          var addr = truncate(accountADDR, 9, ".....");
          var inputFieldsb = document.querySelector(".register-767273-pc");
          inputField.innerHTML = addr;
          inputFieldsb.innerHTML = addr;
          setCookie("accountAddr", accountADDR, 5);
        }
      } else {
        console.log("noy empty");
      }
    }
    if (getCookie("accountAddr") === null) {
      var button = (
        <a className="register-767273-pc" onClick={gettronweb}>
          Connect
        </a>
      );
    } else {
      const accountADDR = getCookie("accountAddr");
      const addr = truncate(accountADDR, 9, ".....");
      var button = (
        <a className="register-767273-pc" onClick={gettronweb}>
          {addr}
        </a>
      );
    }
    return (
      <div className="Sidebar">
        <div className="sidebar-main">
          <div className="register-01d6f6">{button}</div>
          <div className="register-01d6f6">
            {" "}
            <a className="register-767273-pc" onClick={logOutACC}>
              Log out
            </a>
          </div>
        </div>
      </div>
    );
  }
}
