import { ipcMain } from "electron";

import { IPC } from "@shared/constants/ipc";
import { FetchAllDocumentsResponse } from "@shared/types/ipc";

// essa estratégia de comunicação entre processos do electron, é totalmente
// baseada em nomenclaturas para os eventos, cada evento precisa ter um titulo,
// uma string quer represente aquele evento
ipcMain.handle(
  IPC.DOCUMENTS.FETCH_ALL,
  async (): Promise<FetchAllDocumentsResponse> => {
    return {
      data: [
        { id: "1", title: "Ignite", content: "" },
        { id: "2", title: "Discover", content: "" },
        { id: "3", title: "Rocketseat", content: "" },
        { id: "4", title: "Docs", content: "" },
      ],
    };
  }
);
