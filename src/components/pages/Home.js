import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
} from "@material-ui/core";
import azureImage from "../../azure.jpg";

const Home = () => {
  return (
    <Grid container>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <br />
        <Typography variant="h4" color="primary">
          Prueba Azure Face
        </Typography>
        <br />
      </Grid>
      <Grid item xs={6}>
        <p>
          Este proyecto es un ejemplo del consumo de la API IA de Microsoft
          Azure Face, los integrantes de grupo son:{" "}
        </p>
        <ul>
          <li>Eugenio Urueta</li>
          <li>Jhon Ramirez</li>
          <li>Alejandro Pabon</li>
          <li>Emiro Urango</li>
        </ul>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardActionArea>
            <CardMedia
              style={{
                height: 200,
              }}
              image={azureImage}
            ></CardMedia>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Home;
