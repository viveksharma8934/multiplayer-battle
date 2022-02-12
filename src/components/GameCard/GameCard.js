import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Button, Grid, Box } from "@mui/material";
import TxnAPI from "../../apis/transactions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { textAlign } from "@mui/system";
import BattleAPI from "../../apis/battle";
const darkTheme = createTheme({ palette: { mode: "dark" } });

export default function ActionAreaCard(props) {
  const [openGame, setOpenGame] = React.useState(false);
  const [battles, setBattles] = React.useState([]);
  const [transactions, setTransactions] = React.useState([]);
  const [currentBattle, setCurrentBattle] = React.useState(null);
  const fetchTransactions = async () => {
    let result = await BattleAPI.GetAllBattles(5);
    console.log(result);
    if (result.status) {
      setBattles(result.battles);
    }
  };
  const handleEvent = (event) => {
    const { message, data, origin } = event;
    try {
      let result = JSON.parse(data);
      console.log(currentBattle, result);
      if (currentBattle) {
        console.log(currentBattle, result);
        BattleAPI.SendResult(currentBattle, result.score, 5);
        setCurrentBattle(null);
        setOpenGame(false);
        fetchTransactions();
        window.removeEventListener("message", handleEvent);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const createNewBattle = async () => {
    let resp = await BattleAPI.CreateBattle(5);

    console.log(resp);
    if (resp.status) {
      setCurrentBattle(resp.battle_id);
      setOpenGame(true);
      fetchTransactions();
    } else {
      alert(resp.err);
    }
  };
  React.useEffect(() => {
   
    window.addEventListener("message", handleEvent, false);
  }, [currentBattle]);
  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginTop: "30px",
        padding: "50px",
      }}
    >
      <Grid
        item
        xs={6}
        md={6}
        sx={{
         
          
        }}
      >
        <Button variant="outlined" size="large" onClick={createNewBattle} sx={{
          backgroundColor:"black",
          color:"white",
          borderRadius:"40px",
          fontSize:"20px",
          marginLeft:"18vw",
          marginBottom:"12px"
        }}>
          Play Now (₹ 2.50)
        </Button>
        {/* <Card
          sx={{
            maxWidth: 345,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "15vh",
            background: "#212121",
            borderLeft: "5px solid #ff4655",
            borderRight: "5px solid #ff4655",
            borderRadius: "20px",
            paddingLeft: "20px",
            paddingRight: "20px",
            marginBottom: "40px",
            webkitBoxShadow: `0px 0px 15px 0px rgba(255,70,85,0.9)`,
            mozBoxShadow: `0px 0px 15px 0px rgba(255,70,85,0.9)`,
            boxShadow: `0px 0px 15px 0px rgba(255,70,85,0.9)`,
          }}
        >
          <CardActionArea>
            <CardContent style={{ color: "white", width: "100%" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "50%" }}>
                  <img
                    style={{ height: "100%", width: "80%" }}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFWdiqW7gN-eFTeRag-Su0C-VDgKH5QyiToQ&usqp=CAU"
                    alt="img"
                  />
                </div>
                <div style={{ width: "70%" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Entry Fee : ${props.stake}
                  </Typography>
                  <Button
                    variant="outlined"
                    style={{
                      backgroundColor: "#212121",
                      color: "white",
                      borderColor: "white",
                      marginTop: "5px",
                    }}
                    onClick={createNewBattle}
                  >
                    Play New Battle
                  </Button>
                </div>
              </div>
            </CardContent>
          </CardActionArea>
        </Card> */}
        <Box
          sx={{
            textAlign: "center",
            color: "white",
          }}
        >
          <img
            alt="balaji"
            src="/battle.svg"
            style={{
              height: "40px",
              marginRight: "10px",
              textAlign: "center",
            }}
          />
          <Typography
            variant="h3"
            sx={{
              display: "inline",
              padding: `0px !important`,
              margin: `0px !important`,
            }}
          >
            Battles
          </Typography>
        </Box>
        <Box>
          <Paper
            elevation={24}
            sx={{
              borderRadius: "18px",
            }}
          >
            <TableContainer
              sx={{
                height: "60vh",
              }}
            >
              <Table aria-label="simple table" theme={darkTheme}>
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell align="right">entry_fee</TableCell>
                    <TableCell align="right">status</TableCell>
                    <TableCell align="right">score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {battles.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{`₹ ${row.entry_fee}`}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell align="right">{row.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Grid>
      <Grid
        item
        xs={6}
        md={6}
        sx={{
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {openGame ? (
          <Box
            sx={{
              padding: `0px !important`,
              margin: `0px !important`,
              background: `linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)`,
            }}
          >
            <Paper
              elevation={24}
              sx={{
                padding: `0px !important`,
                margin: `0px !important`,
                background: `linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)`,
              }}
            >
              <Card
                sx={{
                  padding: `0px !important`,
                  borderRadius: "7px",
                  background: `linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)`,
                }}
              >
                <CardContent
                  sx={{
                    padding: `0px !important`,
                    backgroundColor: "transparent",
                  }}
                >
                  <iframe
                    src="http://localhost:3000/game"
                    title="W3Schools Free Online Web Tutorials"
                    width="420"
                    key={currentBattle}
                    height="600"
                    frameborder="0"
                    style={{
                      marginLeft: `-10px !important`,
                    }}
                    overflow="scroll"
                    scrolling="no"
                  ></iframe>
                </CardContent>
              </Card>
            </Paper>
          </Box>
        ) : (
          <Box>
            <Paper elevation={24}>
              <Card
                sx={{
                  padding: `0px !important`,
                  height: "600px",
                  borderRadius: "7px",
                  backgroundColor: "transparent",
                }}
              >
                <CardContent
                  sx={{
                    padding: `0px !important`,
                    backgroundColor: "transparent",
                  }}
                >
                  <img
                    alt="lkasdnkls"
                    src="https://user-images.githubusercontent.com/44725090/67148880-e7dba280-f2a4-11e9-8dbf-d154842ee0cf.gif"
                    style={{
                      height: "600px",
                      width: "400px",
                    }}
                  />
                </CardContent>
              </Card>
            </Paper>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
