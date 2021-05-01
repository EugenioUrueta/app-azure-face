import General from "./general";

const headers = {
  "Content-Type": "application/json",
  "Ocp-Apim-Subscription-Key": General.Ocp_Apim_Subscription_Key,
};

export function AzureGroupList() {
  let url = `${General.URL_API_AZURE}/persongroups?start=0&top=1000&returnRecognitionModel=false`;

  return fetch(url, {
    method: "GET",
    headers,
  })
    .then((resp) => resp.json())
    .then((result) => {
      console.log(result);
      return result;
    });
}

export function AzureGroupTrain(idGrupo) {
  let url = `${General.URL_API_AZURE}/persongroups/${idGrupo}/train`;

  return fetch(url, {
    method: "POST",
    headers,
  }).then((resp) => resp);
}

export function AzurePersonAdd(idGrupo, nombre) {
  let url = `${General.URL_API_AZURE}/persongroups/${idGrupo}/persons`;

  return fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: nombre,
      userData: "",
    }),
  })
    .then((resp) => resp.json())
    .then((result) => {
      console.log(result);
      return result;
    });
}

export function AzurePersonList(idGrupo) {
  let url = `${General.URL_API_AZURE}/persongroups/${idGrupo}/persons?start=0&top=1000`;

  return fetch(url, {
    method: "GET",
    headers,
  })
    .then((resp) => resp.json())
    .then((result) => {
      console.log(result);
      return result;
    });
}

export function AzurePersonDelete(idGrupo, idPersona) {
  let url = `${General.URL_API_AZURE}/persongroups/${idGrupo}/persons/${idPersona}`;

  return fetch(url, {
    method: "DELETE",
    headers,
  }).then((resp) => resp);
}

export function AzurePersonFaceAdd(idGrupo, idPersona, urlImage) {
  let urlAPI = `${General.URL_API_AZURE}/persongroups/${idGrupo}/persons/${idPersona}/persistedFaces?detectionModel=${General.DETECTION_MODEL}`;

  return fetch(urlAPI, {
    method: "POST",
    headers,
    body: JSON.stringify({
      url: urlImage,
    }),
  }).then((resp) => resp.json());
}

const Azure_AddFace = async (urlImage, name) => {
  let result = { isError: false, resp: {} };

  try {
    let urlAPI = `${General.URL_API_AZURE}/facelists/${General.ID_FACE_LIST}/persistedFaces?userData=${name}&detectionModel=${General.DETECTION_MODEL}`;

    let resp = await fetch(urlAPI, {
      method: "POST",
      headers,
      body: JSON.stringify({
        url: urlImage,
      }),
    });

    let respJson = await resp.json();

    if (respJson.error) result.error = true;
    result.resp = respJson;
  } catch (error) {
    result.isError = true;
    result.resp = error;
  }

  console.log("AddFace", result);
  return result;
};

const Azure_Detect = async (urlImage) => {
  let result = { isError: false, resp: [] };

  try {
    let urlAPI = `${General.URL_API_AZURE}/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_03&returnRecognitionModel=false&detectionModel=${General.DETECTION_MODEL}&faceIdTimeToLive=86400`;

    let resp = await fetch(urlAPI, {
      method: "POST",
      headers,
      body: JSON.stringify({
        url: urlImage,
      }),
    });

    let respJson = await resp.json();

    if (respJson.error) result.error = true;
    result.resp = respJson;
  } catch (error) {
    result.isError = true;
    result.resp = error;
  }

  console.log("Detect", result);
  return result;
};

const Azure_Identify = async (idGrupo, faceIds) => {
  let result = { isError: false, resp: [] };

  try {
    let urlAPI = `${General.URL_API_AZURE}/identify`;

    let resp = await fetch(urlAPI, {
      method: "POST",
      headers,
      body: JSON.stringify({
        faceIds,
        personGroupId: idGrupo,
      }),
    });

    let respJson = await resp.json();

    if (respJson.error) result.isError = true;
    result.resp = respJson;
  } catch (error) {
    result.isError = true;
    result.resp = error;
  }

  console.log("Identify", result);
  return result;
};

const Azure_PersonGet = async (idGrupo, idPersona) => {
  let url = `${General.URL_API_AZURE}/persongroups/${idGrupo}/persons/${idPersona}`;

  const resp = await fetch(url, {
    method: "GET",
    headers,
  });
  const result = await resp.json();
  return result;
};

export { Azure_AddFace, Azure_Detect, Azure_Identify, Azure_PersonGet };