import { app, Menu, Tray } from "electron";
import { resolve } from "node:path";

app.whenReady().then(() => {
  const tray = new Tray(resolve(__dirname, "rotionTemplate.png"));

  const menu = Menu.buildFromTemplate([
    { label: "Rotion", enabled: false },
    { type: "separator" },
    { type: "checkbox", label: "Ativar modo dark" },
  ]);

  tray.setContextMenu(menu);
});
