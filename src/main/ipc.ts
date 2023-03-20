import { ipcMain } from "electron";

// essa estratégia de comunicação entre processos do electron, é totalmente
// baseada em nomenclaturas para os eventos, cada evento precisa ter um titulo,
// uma string quer represente aquele evento
ipcMain.on("fetch-documents", (event, params) => {
  console.log(params);
});
