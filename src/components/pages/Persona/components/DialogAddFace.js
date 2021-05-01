import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Card,
  CardActionArea,
  CardMedia,
  CircularProgress,
} from "@material-ui/core";
import { Face } from "@material-ui/icons";
import azureImage from "../../../../azure.jpg";
import { AzurePersonFaceAdd } from "../../../../helpers/api-azure";

const DialogAddFace = ({ open, idGrupo, person, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [urlImagen, setUrlImagen] = useState("");

  const onCloseDialog = () => {
    if (!loading) {
      setUrlImagen("");
      onClose();
    }
  };

  const onClickAgregarRostro = () => {
    if (urlImagen === "") {
      alert("Debe ingresar una Url para la imagen.");
    } else {
      setLoading(true);
      AzurePersonFaceAdd(idGrupo, person.personId, urlImagen).then((resp) => {
        console.log(resp);
        setLoading(false);
        onCloseDialog();
      });
    }
  };

  return (
    <Dialog open={open} onClose={onCloseDialog} style={{ minHeight: 400 }}>
      <DialogTitle>
        <Face />
        {" Agregar rostos a "} <b>{person?.name}</b>
      </DialogTitle>
      {loading ? (
        <Grid item xs={6} style={{ textAlign: "center", marginTop: 20 }}>
          <CircularProgress color="secondary"></CircularProgress>
        </Grid>
      ) : (
        <>
          <DialogContent>
            <Grid container>
              <Grid item xs={12}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      style={{
                        height: 200,
                        backgroundSize: urlImagen === "" ? "" : "contain",
                      }}
                      image={urlImagen === "" ? azureImage : urlImagen}
                    ></CardMedia>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12} style={{ marginTop: 20 }}>
                <TextField
                  label="Url Imagen"
                  value={urlImagen}
                  fullWidth
                  onChange={(event) => setUrlImagen(event.target.value)}
                ></TextField>
              </Grid>
            </Grid>
          </DialogContent>
        </>
      )}
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          disabled={loading}
          onClick={() => onClickAgregarRostro()}
        >
          Agregar
        </Button>
        <Button
          color="secondary"
          variant="contained"
          disabled={loading}
          onClick={() => onCloseDialog()}
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAddFace;
