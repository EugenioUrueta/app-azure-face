import React, { useEffect, useState } from "react";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  CircularProgress,
  Badge,
} from "@material-ui/core";
import { Delete, Face } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

import {
  AzureGroupList,
  AzurePersonAdd,
  AzurePersonDelete,
  AzurePersonList,
} from "../../../helpers/api-azure";
import DialogAddFace from "./components/DialogAddFace";

const Persona = () => {
  const [loading, setLoading] = useState(false);
  const [idGrupo, setIdGrupo] = useState(0);
  const [listGrupos, setListGrupo] = useState([]);
  const [nombre, setNombre] = useState("");

  const [listPersonas, setListPersonas] = useState([]);
  const [openDialogAddFace, setOpenDialogAddFace] = useState(false);
  const [personaSeleccionada, setPersonaSeleccionada] = useState({
    personId: "",
    name: "",
  });

  const onClickRegistrar = () => {
    AzurePersonAdd(idGrupo, nombre).then((resp) => {
      setNombre("");
      onClickBuscarTodo();
    });
  };

  const onClickBuscarTodo = () => {
    setLoading(true);
    AzurePersonList(idGrupo).then((resp) => {
      setListPersonas(resp);
      setLoading(false);
    });
  };

  const onClickBorrarPersona = (idPersona) => {
    AzurePersonDelete(idGrupo, idPersona).then(() => {
      if (listPersonas && listPersonas.length > 0) {
        let index = listPersonas.findIndex((x) => x.personId === idPersona);
        let tempList = [...listPersonas];
        tempList.splice(index, 1);
        setListPersonas(tempList);
      }
    });
  };

  const onClickAgregarRostro = (persona) => {
    setPersonaSeleccionada(persona);
    setOpenDialogAddFace(true);
  };

  useEffect(() => {
    setLoading(true);
    AzureGroupList().then((resp) => {
      setListGrupo(resp);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <br />
      <Typography variant="h4">Personas</Typography>
      <br />
      <DialogAddFace
        open={openDialogAddFace}
        person={personaSeleccionada}
        idGrupo={idGrupo}
        onClose={() => setOpenDialogAddFace(false)}
      ></DialogAddFace>
      <Grid container>
        <Grid item xs={2} className="grid-control">
          <FormControl fullWidth>
            <InputLabel id="modo-label">Grupo</InputLabel>
            <Select
              labelId="idGrupo-label"
              id="idGrupo-select"
              value={idGrupo}
              onChange={(event) => setIdGrupo(event.target.value)}
            >
              <MenuItem value={0}>-- Seleccione --</MenuItem>
              {listGrupos.map((item) => (
                <MenuItem value={item.personGroupId} key={item.personGroupId}>
                  {item.personGroupId + " - " + item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2} className="grid-control">
          <TextField
            id="nombre"
            label="Nombre"
            value={nombre}
            fullWidth
            onChange={(event) => setNombre(event.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <br />
          <Button
            variant="contained"
            size="small"
            color="primary"
            component="span"
            onClick={() => onClickRegistrar()}
          >
            Registrar Persona
          </Button>
          &nbsp;
          <Button
            variant="contained"
            size="small"
            color="secondary"
            component="span"
            onClick={() => onClickBuscarTodo()}
          >
            Buscar Todo
          </Button>
        </Grid>
      </Grid>
      <br />
      {loading ? (
        <Grid item xs={6} style={{ textAlign: "center", marginTop: 20 }}>
          <CircularProgress color="secondary"></CircularProgress>
        </Grid>
      ) : (
        <TableContainer>
          <Table size="small" style={{ maxWidth: 600 }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listPersonas.map((row) => (
                <TableRow key={row.personId}>
                  <TableCell>{row.personId}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <Tooltip title="Agregar Rostros">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => onClickAgregarRostro(row)}
                      >
                        <Badge
                          badgeContent={
                            row.persistedFaceIds
                              ? row.persistedFaceIds.length
                              : 0
                          }
                          color="error"
                        >
                          <Face></Face>
                        </Badge>
                      </IconButton>
                    </Tooltip>
                    &nbsp;
                    <IconButton
                      color="secondary"
                      size="small"
                      onClick={() => onClickBorrarPersona(row.personId)}
                    >
                      <Delete></Delete>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <br />
      <Grid item xs={8}>
        <Alert severity="info">
          Después de agregar rostros debe entrenar el grupo para que permita un
          mejor reconocimiento de las personas.
        </Alert>
      </Grid>
    </div>
  );
};

export default Persona;
