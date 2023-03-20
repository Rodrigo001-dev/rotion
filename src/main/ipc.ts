import { ipcMain } from "electron";

// essa estratégia de comunicação entre processos do electron, é totalmente
// baseada em nomenclaturas para os eventos, cada evento precisa ter um titulo,
// uma string quer represente aquele evento
ipcMain.handle("fetch-documents", async () => {
  return [
    { id: "1", title: "Ignite" },
    { id: "2", title: "Discover" },
    { id: "3", title: "Rocketseat" },
    { id: "4", title: "Docs" },
  ];
});
