import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { AssignmentTurnedIn } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { AzureGroupList, AzureGroupTrain } from "../../../helpers/api-azure";

const PersonaGrupo = () => {
  const [list, setList] = useState([]);

  const onClickEntrenar = (idGrupo) => {
    AzureGroupTrain(idGrupo).then(() => {
      console.log("Grupo en entrenamiento.");
    });
  };

  useEffect(() => {
    AzureGroupList().then((resp) => {
      setList(resp);
    });
  }, []);

  return (
    <div>
      <br />
      <Typography variant="h4">Grupo de Personas</Typography>
      <br />

      <br />
      {!list || list.length === 0 ? (
        <p>No hay grupos de personas registrados.</p>
      ) : (
        <TableContainer>
          <Table size="small" style={{ maxWidth: 600 }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row) => (
                <TableRow key={row.personGroupId}>
                  <TableCell>{row.personGroupId}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.userData}</TableCell>
                  <TableCell>
                    <Tooltip title="Entrenar Grupo" placement="top">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => onClickEntrenar(row.personGroupId)}
                      >
                        <AssignmentTurnedIn></AssignmentTurnedIn>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default PersonaGrupo;
