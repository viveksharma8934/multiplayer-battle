import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Paper } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import userAPIS from "../../apis/auth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LeaderBoardAPI from "../../apis/leaderboard";
import TxnAPI from "../../apis/transactions";
import {useState} from "@hookstate/core";
import config from "../../config"
const pages = ["Home", "LeaderBoard"];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [userName, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [logId, setLogid] = React.useState("LogIn");
  const [balance, setBalance] = React.useState("Signup");
  const [open, setOpen] = React.useState(false);
  const [openLeaderBoard, setOpenLeaderboard] = React.useState(false);
  const [leaderBoard, setLeaderBoard] = React.useState([]);
  const [openTxn, setOpenTxn] = React.useState(false);
  const [txn, setTxn] = React.useState([]);
  const ustate = useState(config.userState)
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const login = async () => {
    console.log(userName, password);
    let result = await userAPIS.loginUser(userName, password);
    console.log(result);
    if (result.status) {
      setBalance(`₹ ${result.balance}`);
      setLogid("Welcome,  " + result.username);
      console.log(result);
      ustate.set(result?.id)
    } else {
      alert(result?.err);
    }
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const create = async () => {
    console.log(userName, password);
    await userAPIS.createUser(userName, password);
  };
  const handleOpenLeaderBoard = async () => {
    let resp = await LeaderBoardAPI.GetLeaderBoard();
    console.log(resp);
    if (resp.status) {
      setLeaderBoard(resp.leaderboard);
      setOpenLeaderboard(true);
    }
  };
  const handleCloseLeaderBoard = () => setOpenLeaderboard(false);
  const handleOpenTxn = async () => {
    let resp = await TxnAPI.GetAllTransactions(ustate.get());
    console.log(resp);
    if (resp.status) {
      setTxn(resp.txns ? resp.txns :[]);
      setOpenTxn(true);
    }
  };
  const handleCloseTxn = () => setOpenTxn(false);
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <Box
      sx={{
        borderRadius: `20px !important`,
        width: "90vw",
        margin: "10px auto 0px auto",
      }}
    >
      <Paper
        elevation={24}
        sx={{
          borderRadius: `20px !important`,
        }}
      >
        <AppBar
          position="static"
          sx={{
            margin: "10px auto 0px auto",
            width: "90vw",
            height: "80px",
            borderRadius: "20px",
            backgroundColor: "white",
            verticalAlign: "middle",
            color: "black",
          }}
        >
          <Toolbar disableGutters>
            <Typography
              variant="h3"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                margin: "12px",
              }}
            >
              BattlePlay
            </Typography>
            <Button
              color="success"
              style={{
                backgroundColor: "black",
                color: "white",
                borderRadius: "40px",
              }}
              size="medium"
              onClick={handleOpenLeaderBoard}
            >
              LeaderBoard
            </Button>
            <Button
              color="success"
              style={{
                backgroundColor: "black",
                color: "white",
                borderRadius: "40px",
                margin: "10px",
              }}
              size="medium"
              onClick={handleOpenTxn}
            >
              Transactions
            </Button>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              ethMatch
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Button sx={{  backgroundColor: "black",
                color: "white",
                borderRadius: "40px",
                margin: "10px", }} onClick={handleOpen}>
                {logId}
              </Button>
              <Button sx={{  backgroundColor: "black",
                color: "white",
                borderRadius: "40px",
                margin: "10px", }} onClick={login}>
                {balance}
              </Button>
            </Box>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box
                sx={{
                  ...style,
                  width: 400,
                  "& .MuiTextField-root": { m: 1, width: "100%" },
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4 id="parent-modal-title">Login / SignUp</h4>
                  <Button onClick={handleClose}>X</Button>
                </div>
                <TextField
                  fullWidth
                  required
                  id="outlined-required"
                  label="Username"
                  defaultValue="Username"
                  onChange={(v) => {
                    setUsername(v.target.value);
                  }}
                />
                <TextField
                  fullWidth
                  required
                  id="outlined-required"
                  label="Password"
                  type="password"
                  defaultValue="Hello World"
                  style={{ marginBottom: "10px" }}
                  onChange={(v) => {
                    setPassword(v.target.value);
                  }}
                />
                <Stack spacing={1} direction="row">
                  <Button
                    variant="contained"
                    style={{ marginLeft: "10px" }}
                    onClick={login}
                  >
                    Login
                  </Button>
                  <Button variant="contained" onClick={create}>
                    SignUp
                  </Button>
                </Stack>
              </Box>
            </Modal>
          </Toolbar>
        </AppBar>
      </Paper>
      <Modal
        open={openLeaderBoard}
        onClose={handleCloseLeaderBoard}
        sx={{}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Paper
            elevation={24}
            sx={{
              borderRadius: "18px",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                marginTop: "12px",
              }}
            >
              Leaderboard
            </Typography>
            <TableContainer
              sx={{
                height: "30vh",
              }}
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell align="right">username</TableCell>
                    <TableCell align="right">score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaderBoard.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.username}</TableCell>
                      <TableCell align="right">{row.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Modal>
      <Modal
        open={openTxn}
        onClose={handleCloseTxn}
        sx={{}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Paper
            elevation={24}
            sx={{
              borderRadius: "18px",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                marginTop: "12px",
              }}
            >
              Transactions
            </Typography>
            <TableContainer
              sx={{
                height: "30vh",
              }}
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell align="right">title</TableCell>
                    <TableCell align="right">amount</TableCell>
                    <TableCell align="right">status</TableCell>
                    <TableCell align="right">type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {txn.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">{`₹ ${row.amount}`}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Modal>
    </Box>
  );
};

export default ResponsiveAppBar;
