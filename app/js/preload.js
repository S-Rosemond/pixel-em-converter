const { contextBridge } = require("electron");

function convertPxToEm(px, baseFontSize = 16) {
  return px / baseFontSize;
}

function convertEmToPx(em, baseFontSize = 16) {
  return em * baseFontSize;
}

const API = { convertPxToEm, convertEmToPx };

contextBridge.exposeInMainWorld("api", API);
