// o preload tem um papel muito importante de expor para o processo renderer as
// possíveis comunicações que podemos ter entre renderer e main, ou seja, toda
// possível comunicação precisa estar declarada dentro desse arquivo

import { contextBridge, ipcRenderer } from "electron";

import { IPC } from "@shared/constants/ipc";
import {
  CreateDocumentResponse,
  DeleteDocumentRequest,
  FetchAllDocumentsResponse,
  FetchDocumentRequest,
  FetchDocumentResponse,
  SaveDocumentRequest,
} from "@shared/types/ipc";

declare global {
  export interface Window {
    api: typeof api;
  }
}

// Custom APIs for renderer
const api = {
  fetchDocuments(): Promise<FetchAllDocumentsResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH_ALL);
  },

  fetchDocument(req: FetchDocumentRequest): Promise<FetchDocumentResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH, req);
  },

  createDocument(): Promise<CreateDocumentResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.CREATE);
  },

  saveDocument(req: SaveDocumentRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.SAVE, req);
  },

  deleteDocument(req: DeleteDocumentRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.DELETE, req);
  },

  onNewDocumentRequest(callback: () => void) {
    ipcRenderer.on("new-document", callback);

    return () => {
      ipcRenderer.off("new-document", callback);
    };
  },
};

if (process.contextIsolated) {
  try {
    // exposeInMainWorld expõe alguma funcionalidade, algum método, alguma função
    // para dentro do processo do renderer, ou seja, a partir do momento que eu
    // tenho o contextBridge.exposeInMainWorld("api", api) eu vou ter algum método
    // server-side, disponível no processo renderer
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.api = api;
}
