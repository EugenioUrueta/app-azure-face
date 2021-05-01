import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardMedia,
  CardActionArea,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

import { ExpandMore, ChevronRight } from "@material-ui/icons";
import { TreeItem, TreeView } from "@material-ui/lab";

import azureImage from "../../../azure.jpg";
import {
  AzureGroupList,
  Azure_PersonGet,
  Azure_Detect,
  Azure_Identify,
} from "../../../helpers/api-azure";

const Identificar = () => {
  const [urlImagen, setUrlImagen] = useState("");
  const [idGrupo, setIdGrupo] = useState(0);
  const [listGrupos, setListGrupo] = useState([]);
  const [rostrosDetectatos, setRostrosDetectatos] = useState([]);
  const [rostrosIdentificados, setRostrosIdentificados] = useState([]);

  useEffect(() => {
    AzureGroupList().then((resp) => {
      setListGrupo(resp);
    });
  }, []);

  const onClickIdentificar = async () => {
    let resp = await Azure_Detect(urlImagen);
    if (resp.isError) {
      alert("Error: " + resp.resp);
    } else {
      let faceIds = resp.resp.map((x) => x.faceId);
      let respIdent = await Azure_Identify(idGrupo, faceIds);

      if (respIdent && respIdent.resp.length > 0) {
        for (let i = 0; i < respIdent.resp.length; i++) {
          for (let j = 0; j < respIdent.resp[i].candidates.length; j++) {
            let person = await Azure_PersonGet(idGrupo, respIdent.resp[i].candidates[j].personId);
            let result = { ...respIdent.resp[i].candidates[j], ...person };
            respIdent.resp[i].candidates[j] = result;
          }
        }            
      }

      setRostrosDetectatos(resp.resp);
      setRostrosIdentificados(respIdent.resp);
    }
  };

  return (
    <div>
      <br />
      <Typography variant="h4">Identificar Personas</Typography>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="idGrupo-label">Grupo</InputLabel>
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
        <Grid item xs={4}>
          <TextField
            label="Url Imagen"
            fullWidth
            value={urlImagen}
            onChange={(event) => setUrlImagen(event.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <br></br>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => onClickIdentificar()}
          >
            Identificar Rostros
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <CardActionArea>
              <CardMedia
                style={{
                  height: 400,
                  backgroundColor: "#eee",
                  backgroundSize: urlImagen === "" ? "" : "contain",
                }}
                image={urlImagen === "" ? azureImage : urlImagen}
              ></CardMedia>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <br />
          <TreeView
            defaultCollapseIcon={<ExpandMore></ExpandMore>}
            defaultExpandIcon={<ChevronRight></ChevronRight>}
          >
            <TreeItem nodeId="1" label="Rostros Detectados">
              {rostrosDetectatos.map((item) => (
                <TreeItem nodeId={item.faceId} label={"ID:" + item.faceId}>
                  <TreeItem
                    nodeId={item.faceId + "_top"}
                    label={"top: " + item.faceRectangle.top}
                  />
                  <TreeItem
                    nodeId={item.faceId + "_left"}
                    label={"left: " + item.faceRectangle.left}
                  />
                  <TreeItem
                    nodeId={item.faceId + "_width"}
                    label={"width: " + item.faceRectangle.width}
                  />
                  <TreeItem
                    nodeId={item.faceId + "_height"}
                    label={"height: " + item.faceRectangle.height}
                  />
                </TreeItem>
              ))}
            </TreeItem>
          </TreeView>
          <br />
          <TreeView
            defaultCollapseIcon={<ExpandMore></ExpandMore>}
            defaultExpandIcon={<ChevronRight></ChevronRight>}
          >
            <TreeItem nodeId="1" label="Rostros Identificados">
              {rostrosIdentificados.map((item) =>
                item.candidates.length > 0 ? (
                  <TreeItem
                    nodeId={item.faceId}
                    label={"ID Detectado: " + item.faceId}
                  >
                    {item.candidates.map((cand) => (
                      <TreeItem
                        nodeId={cand.personId}
                        label={"Persona: " + cand.name}
                      />
                    ))}
                  </TreeItem>
                ) : null
              )}
            </TreeItem>
          </TreeView>
        </Grid>
      </Grid>
    </div>
  );
};

export default Identificar;
