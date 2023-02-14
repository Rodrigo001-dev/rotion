import { app, shell, BrowserWindow } from "electron";
import { join, resolve } from "node:path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png?asset";

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: "#17141f",
    titleBarStyle: "hiddenInset",
    trafficLightPosition: {
      x: 20,
      y: 20,
    },
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

// o app.whenReady() é um event listener muito parecido com o document.onLoad que
// temos na web, que é basicamente um evento que é disparado quando a nossa aplicação
// está pronta para ser exibida em tela, ou seja, quando a aplicação estiver pronta
// para ser exibida em tela vai executar o método createWindow()
app.whenReady().then(() => {
  electronApp.setAppUserModelId("com.electron");

  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  // quando o aplicativo está aberto porém sem nenhuma janela, quando ele voltar
  // a ter o foco ele vai criar a janela novamente
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// quando todas as janelas estiverem fechadas e o sistema operacional for
// diferente de MacOS(darwin) vai fechar a aplicação
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
