// o preload tem um papel muito importante de expor para o processo renderer as
// possíveis comunicações que podemos ter entre renderer e main, ou seja, toda
// possível comunicação precisa estar declarada dentro desse arquivo

import { contextBridge, ipcRenderer } from "electron";
import { electronAPI, ElectronAPI } from "@electron-toolkit/preload";

import { IPC } from "@shared/constants/ipc";
import { FetchAllDocumentsResponse } from "@shared/types/ipc";

declare global {
  export interface Window {
    electron: ElectronAPI;
    api: typeof api;
  }
}

// Custom APIs for renderer
const api = {
  fetchDocuments(): Promise<FetchAllDocumentsResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH_ALL);
  },
};

if (process.contextIsolated) {
  try {
    // exposeInMainWorld expõe alguma funcionalidade, algum método, alguma função
    // para dentro do processo do renderer, ou seja, a partir do momento que eu
    // tenho o contextBridge.exposeInMainWorld("api", api) eu vou ter algum método
    // server-side, disponível no processo renderer
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
