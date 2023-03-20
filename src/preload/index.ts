// o preload tem um papel muito importante de expor para o processo renderer as
// possíveis comunicações que podemos ter entre renderer e main, ou seja, toda
// possível comunicação precisa estar declarada dentro desse arquivo

import { contextBridge, ipcRenderer } from "electron";
import { electronAPI, ElectronAPI } from "@electron-toolkit/preload";

declare global {
  export interface Window {
    electron: ElectronAPI;
    api: typeof api;
  }
}

// Custom APIs for renderer
const api = {
  fetchDocuments(): Promise<Array<{ id: string; title: string }>> {
    return ipcRenderer.invoke("fetch-documents");
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
