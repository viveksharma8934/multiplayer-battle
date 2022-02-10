import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Button } from "@mui/material";

export default function ActionAreaCard(props) {
  return (
    <div style={{display:'flex',justifyContent:'space-between',marginTop:'200px',marginLeft:'50px'}}>
    <div>
    <Card
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
        boxShadow: `0px 0px 15px 0px rgba(255,70,85,0.9)`
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
                  marginTop: "5px"
                }}
              >
                Enter MatchMaking
              </Button>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
    <div style={{marginRight:'80px'}}>
    <iframe src="http://localhost/FlappyBird/" title="W3Schools Free Online Web Tutorials" width='450' height="500"></iframe>
    </div>
    </div>
  );
}
