// Assets
import pluginLogo from "./assets/images/logo.svg";

// Components
import ColorPicker from "./components/ColorPicker";

// Package
import pluginPkg from "../../package.json";

// Utils
import pluginId from "./pluginId";

export default (strapi) => {
  const pluginDescription =
    pluginPkg.strapi.description || pluginPkg.description;

  const plugin = {
    blockerComponent: null,
    blockerComponentProps: {},
    description: pluginDescription,
    icon: pluginPkg.strapi.icon,
    id: pluginId,
    initializer: () => null,
    injectedComponents: [],
    isReady: true,
    mainComponent: null,
    name: pluginPkg.strapi.name,
    pluginLogo,
    preventComponentRendering: false,
    trads: {},
  };

  strapi.registerField({ type: "colorpicker", Component: ColorPicker });

  return strapi.registerPlugin(plugin);
};
