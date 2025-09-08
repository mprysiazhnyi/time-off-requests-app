import "../src/vendor";
import { setupIonicReact } from "@ionic/react";

setupIonicReact();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true },
};
