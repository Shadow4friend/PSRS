import React, { useEffect, useState } from "react";
import { getTronWeb } from "../web/utils";
import { toast, ToastContainer } from "react-toastify";
import { Box, Link, makeStyles, Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./__body.scss";
import { useAlert } from "react-alert";
const TronWeb = require("tronweb");
const fullNode = "https://api.shasta.trongrid.io";

const tronWeb = new TronWeb({ fullHost: "https://api.trongrid.io" });
// This provider is optional, you can just use a url for the nodes instead
const HttpProvider = TronWeb.providers.HttpProvider;

export const BodyContainer = () => {
  const [isLiquidity, setIsLiquidity] = useState(true);

  const handleOnLiquidityStaking = () => {
    setIsLiquidity(true);
  };
  const alert = useAlert();

  const [publicAddress, setPublicAddress] = useState("");
  const [lpBalance, setLPBalance] = useState(0);
  const [lprewards, setLPrewards] = useState(0);
  const [lpLogged, setlpLogged] = useState(true);
  const [lpFroze, setlpfroze] = useState(true);
  const handleOnTokenBaking = () => {
    setIsLiquidity(false);
  };
  let curWeb = getTronWeb();
  function initWindow() {
    if (curWeb == null) {
      setlpLogged((lpLogged) => false);
      alert.show("We were unable to find any suitble providder.");
    } else {
      setlpLogged((lpLogged) => true);
    }
  }
  async function approveAndcall(amount) {
    if (publicAddress != null) {
      console.log(amount);
      let curAddr = curWeb.defaultAddress.base58;
      if (true) {
        var trc = "TUB36fG5eRGSM634Lw6P3TTimjLRP8xqjj";
        var functionSelector = "approve(address,uint256)";
        var parameter = [
          {
            type: "address",
            value: trc
          },
          {
            type: "uint256",
            value: amount
          }
        ];

        let transaction = await curWeb.transactionBuilder.triggerSmartContract(
          "TFXX6gSzYFhy1wEbvZhS75G2g3JM1pgc8t",
          functionSelector,
          { feeLimit: 40000000 },
          parameter
        );
        const signedTransaction = await curWeb.trx.sign(
          transaction.transaction
        );
        console.log(transaction);
        if (!signedTransaction.signature) {
          return console.error("Transaction was not signed properly");
        }
        const broadcast = await curWeb.trx.sendRawTransaction(
          signedTransaction
        );
        return broadcast.txid;
      }
    }
  }
  async function initStaker(amount) {
    alert.show("Sorry Freezing is in maintanence. It will be live soon");
    // amount = amount * Math.pow(10, 8);
    // console.log(amount);
    // var ac = amount + lpFroze * Math.pow(10, 8);

    // if (curWeb != null) {
    //   // var amounts = lpFroze * 100000000;
    //   // amounts = parseInt(amounts);

    //   let curAddr = curWeb.defaultAddress.base58;
    //   setPublicAddress((publicAddress) => curAddr);
    //   if (true) {
    //     await approveAndcall(amount);
    //     try {
    //       // tronWeb.setAddress(curAddr);
    //       var contract = await curWeb
    //         .contract()
    //         .at("TUB36fG5eRGSM634Lw6P3TTimjLRP8xqjj");
    //       var transaction = await contract.AddStaker(curAddr, amount, 21).send({
    //         feeLimit: 5000_000_000
    //       });
    //       console.log(transaction);
    //       // var transaction = await contract.StartFreeze().send();
    //       // console.log(transaction);
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   }
    // }
  }
  async function startFreeze() {
    if (curWeb != null) {
      let curAddr = curWeb.defaultAddress.base58;
      setPublicAddress((publicAddress) => curAddr);
      if (true) {
        try {
          tronWeb.setAddress("TUB36fG5eRGSM634Lw6P3TTimjLRP8xqjj");
          var contract = await tronWeb
            .contract()
            .at("TUB36fG5eRGSM634Lw6P3TTimjLRP8xqjj");
          var transaction = await contract
            .AddStaker(curAddr, amount, time)
            .call();
          const signedTransaction = await curWeb.trx.sign(
            transaction.transaction
          );
          if (!signedTransaction.signature) {
            return console.error("Transaction was not signed properly");
          }
          const broadcast = await curWeb.trx.sendRawTransaction(
            signedTransaction
          );
        } catch (err) {}
      }
    }
  }
  async function initFroze() {
    if (curWeb != null) {
      let curAddr = curWeb.defaultAddress.base58;
      setPublicAddress((publicAddress) => curAddr);
      if (true) {
        try {
          tronWeb.setAddress("TUB36fG5eRGSM634Lw6P3TTimjLRP8xqjj");
          var contract = await tronWeb
            .contract()
            .at("TUB36fG5eRGSM634Lw6P3TTimjLRP8xqjj");
          var transaction = await contract.StakersInfo(curAddr).call();
          let LP = curWeb.BigNumber(transaction["FreezeBalance"]["_hex"]);
          setlpfroze((lpFroze) => LP.toNumber() / Math.pow(10, 8));
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
  async function initRewards() {
    if (curWeb != null) {
      let curAddr = curWeb.defaultAddress.base58;
      setPublicAddress((publicAddress) => curAddr);
      if (true) {
        tronWeb.setAddress(curAddr);
        var contract = await tronWeb
          .contract()
          .at("TUB36fG5eRGSM634Lw6P3TTimjLRP8xqjj");
        var transaction = await contract.GetTotalReward().call();
        let LP = curWeb.BigNumber(transaction["_amount"]["_hex"]);
        setLPrewards((lprewards) => LP.toNumber() / Math.pow(10, 8));
      }
    }
  }
  async function unFreeze() {
    if (curWeb != null) {
      let curAddr = curWeb.defaultAddress.base58;
      setPublicAddress((publicAddress) => curAddr);
      if (true) {
        try {
          tronWeb.setAddress(curAddr);
          var contract = await curWeb
            .contract()
            .at("TUB36fG5eRGSM634Lw6P3TTimjLRP8xqjj");
          var transaction = await contract.StartUnFreeze().send();
          console.log(transaction);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
  async function unClaim() {
    if (curWeb != null) {
      let curAddr = curWeb.defaultAddress.base58;
      setPublicAddress((publicAddress) => curAddr);
      if (true) {
        try {
          tronWeb.setAddress(curAddr);
          var contract = await curWeb
            .contract()
            .at("TUB36fG5eRGSM634Lw6P3TTimjLRP8xqjj");
          var transaction = await contract.ClaimReward().send();
          alert.show(transaction.message);
        } catch (e) {
          alert.show(e.message);
        }
      }
    }
  }
  const initBalance = async () => {
    if (curWeb != null) {
      let curAddr = curWeb.defaultAddress.base58;
      setPublicAddress((publicAddress) => curAddr);
      if (true) {
        var functionSelector = "balanceOf(address)";

        var parameter = [
          {
            type: "address",
            value: curAddr
          }
        ];

        let transaction = await curWeb.transactionBuilder.triggerConstantContract(
          "TFXX6gSzYFhy1wEbvZhS75G2g3JM1pgc8t",
          functionSelector,
          {},
          parameter
        );
        let LP = curWeb.BigNumber("0x" + transaction["constant_result"][0]);
        setLPBalance((lpBalance) => LP.toNumber() / Math.pow(10, 8));
      }
    } else {
      setlpLogged((lpLogged) => false);
    }
  };
  async function handleApprove() {
    var amount = document.querySelector("#Amount").value;
    amount = parseInt(amount);
    if (Number.isInteger(amount) == true) {
      if (amount >= 1) {
        await initStaker(amount);
      } else {
        alert.show("Minimum amount 10 PSRS.");
      }
    } else {
      alert.show("Enter A valid number");
    }
  }
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
  const addressMod = truncate(publicAddress, 28, ".....");
  const useStyles = makeStyles({
    root: {
      minWidth: 200
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)"
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    }
  });
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  useEffect(() => {
    var interval = setInterval(() => {
      initBalance();
      initFroze();
      initWindow();
      initRewards();
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-scale">
      {lpLogged === true ? (
        <Grid container spacing={2} className="gridContainer" justify="center">
          <Grid className="grid-layout" item xs={12} sm={4} md={6}>
            <Card className="card-component" variant="outlined">
              <CardContent>
                <div className="header">
                  <Typography
                    className="title"
                    color="textSecondary"
                    gutterBottom
                  >
                    General
                  </Typography>
                </div>

                <div className="content">
                  <ul>
                    <li>
                      <p className="active">
                        <span>Wallet&nbsp;:&nbsp;</span>
                        <span>{addressMod}</span>
                      </p>
                    </li>
                    <li>
                      <p className="active">
                        <span>PSRS&nbsp;Balance&nbsp;:&nbsp;</span>
                        <span>{lpBalance} PSRS</span>
                      </p>
                    </li>
                    <li>
                      <p className="active">
                        <span>Frozen&nbsp;Balance&nbsp;:&nbsp;</span>
                        <span>{lpFroze} PSRS</span>
                      </p>
                    </li>
                    <li>
                      <p className="active">
                        <span>Available&nbsp;To use&nbsp;:&nbsp;</span>
                        <span>{lpBalance} PSRS</span>
                      </p>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardActions>
                <a size="small" href="https://app.psrsfinance.com">
                  Visit Our site
                </a>
              </CardActions>
              <CardActions>
                <a size="small" href="#stakeHere">
                  Stake Psrs
                </a>
              </CardActions>
            </Card>
          </Grid>
          <Grid
            id="stakeHere"
            className="grid-layout"
            item
            xs={12}
            sm={4}
            md={6}
          >
            <Card className="card-component" variant="outlined">
              <CardContent>
                <div className="header">
                  <Typography
                    className="title"
                    color="textSecondary"
                    gutterBottom
                  >
                    Stake
                  </Typography>
                </div>

                <div className="content">
                  <ul>
                    <li>
                      <p className="active">
                        <span>Wallet&nbsp;:&nbsp;</span>
                        <span>{addressMod}</span>
                      </p>
                    </li>{" "}
                    <li>
                      <p className="active">
                        <span>Current&nbsp;Rewards&nbsp;:&nbsp;</span>
                        <span>{lprewards} PSRS</span>
                      </p>
                    </li>
                    <li>
                      <button type="button" onClick={unClaim}>
                        Claim Rewards
                      </button>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardActions>
                <form className="witholdForm">
                  <input
                    type="text"
                    id="Amount"
                    placeholder="Enter the amount"
                  />
                  <button type="button" onClick={handleApprove}>
                    Approve & Freeze
                  </button>
                  <button type="button" onClick={unFreeze}>
                    Unstake
                  </button>
                  <small>
                    Note: Staking is in maintanence so you cannot stake more
                    psrs until maintanence. You can unstack and claim your
                    rewards.
                  </small>
                </form>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} className="gridContainer" justify="center">
          <Grid className="grid-layout" item xs={12} sm={4} md={6}>
            <Card className="card-component" variant="outlined">
              <CardContent>
                <div className="header">
                  <Typography
                    className="title"
                    color="textSecondary"
                    gutterBottom
                  >
                    General
                  </Typography>
                </div>

                <div className="content">
                  <ul>
                    <li>
                      <span className="expert active">
                        You are not allowed to perform this action. Are you
                        using dapp browser with tron mainnet?
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
