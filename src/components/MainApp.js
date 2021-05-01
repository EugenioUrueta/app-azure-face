import React from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { Face } from "@material-ui/icons";
import { Link, Redirect, Route, Router } from "wouter";

// Páginas
import Home from "./pages/Home";
import PersonaGrupo from "./pages/PersonaGrupo/PersonaGrupo";
import Persona from "./pages/Persona/Persona";
import Identificar from "./pages/Identificar/Identificar";

export const MainApp = () => {
  return (
    <>
      <Route path="/">
        <Redirect to="/prueba-azure" />
      </Route>
      <Router base="/prueba-azure">
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton edge="start" color="inherit">
              <Face></Face>&nbsp;
              <Link className="menu-item" href="/">
                <Typography variant="h6" style={{ marginRight: "20px" }}>
                  Prueba Azure Face
                </Typography>
              </Link>
            </IconButton>
            <Link className="menu-item" href="/grupo-personas">
              <Button color="inherit"> Grupo de Personas</Button>
            </Link>
            <Link className="menu-item" href="/personas">
              <Button color="inherit"> Personas</Button>
            </Link>
            <Link className="menu-item" href="/identificar">
              <Button color="inherit"> Identificar</Button>
            </Link>
          </Toolbar>
        </AppBar>
        <Container>
          <Route path="/" component={Home} />
          <Route path="/grupo-personas" component={PersonaGrupo} />
          <Route path="/personas" component={Persona} />
          <Route path="/identificar" component={Identificar} />        
        </Container>
      </Router>
    </>
  );
};
