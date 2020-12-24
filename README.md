## Strapi - Color Picker Field

<p align="center">
  <a href="https://www.npmjs.org/package/strapi-plugin-colorpicker">
    <img src="https://img.shields.io/npm/v/strapi-plugin-colorpicker/latest.svg" alt="NPM Version" />
  </a>
  <a href="https://www.npmjs.org/package/strapi-plugin-colorpicker">
    <img src="https://img.shields.io/npm/dm/strapi-plugin-colorpicker.svg" alt="Monthly download on NPM" />
  </a>
</p>

A plugin for [Strapi Headless CMS](https://github.com/strapi/strapi) that provides colorpicker field:

![GIF as a demo](https://github.com/danestves/strapi-plugin-colorpicker/blob/main/public/assets/demo.gif?raw=true)

### 🖐 Requirements

Complete installation requirements are exact same as for Strapi itself and can be found in the documentation under <a href="https://strapi.io/documentation/v3.x/installation/cli.html#step-1-make-sure-requirements-are-met">Installation Requirements</a>.

**Supported Strapi versions**:

- Strapi >= v3.3.x

**We recommend always using the latest version of Strapi to start your new projects**.

### ⏳ Installation

```bash
# npm
npm install strapi-plugin-colorpicker

# yarn
yarn add strapi-plugin-colorpicker
```

### ✏️ Usage

Component by default is not going to appear in the UI you need to enable manually. To enable the component in any content type you've to add the attribute in a configuration model json file (`*.settings.json`):

```diff
{
  "attributes": {
    "background_color": {
-      "type": "string",
+      "type": "colorpicker",
+      "columnType": "string"
    }
  }
}
```

⚠️⚠️ **Note:** because of how the field API is working at the moment, the data returned from your endpoint > `background_color` will be a string and not a JSON object. You'll just have to parse the data in your front (`JSON.parse(background_color)`).

### 📁 Copy required files [REQUIRED ⚠️]

‼️**This step is required:** Until now Strapi doesn't offer a way to validate custom fields types and for that reason we need to edit manually the files of `content-type-builder` to make a corresponding validation of our new field.

Inside `strapi-files` we have a list of folders with the Strapi version, enter to the version that correspond with your installation, and you will see this files

<img src="https://github.com/danestves/strapi-plugin-colorpicker/blob/main/public/assets/folder.png?raw=true" alt="Folders" />

Copy the folder named content-type-builder inside your `<project-root>/extensions` folder

### 🚀 Run your project

After successful installation you've to build a fresh package that includes plugin UI. To archive that simply use:

```bash
# npm
npm run build && npm run develop

# yarn
yarn build && yarn develop
```

### 📦 API Response

How i mentioned before the data is storing as a string because we don't have a API to manage JSON objects at this time, so for example when you make your REST api query or your query in GraphQL it will response with a string like this:

```json
{
  "id": 1,
  "background_color": "{\"hex\":\"#007effff\",\"rgb\":{\"r\":0,\"g\":126,\"b\":255,\"a\":1},\"css\":\"rgba(0,126,255,1)\"}",
  "published_at": "2020-12-24T16:50:00.815Z",
  "created_at": "2020-12-24T16:49:06.795Z",
  "updated_at": "2020-12-24T16:50:00.839Z"
}
```

So in your frontend you can use `JSON.parse(myobject.background_color)` and will transform the string to this:

```json
{
  "hex": "#007effff",
  "rgb": {
    "r": 0,
    "g": 126,
    "b": 255,
    "a": 1
  },
  "css": "rgba(0,126,255,1)"
}
```

✨ Done! Now you have `hex`, `rgba` and `css` to use in any frontend like you want

## Contributing

Feel free to fork and make a Pull Request to this plugin project. All the input is warmly welcome!

## Community support

For general help using Strapi, please refer to [the official Strapi documentation](https://strapi.io/documentation/). For additional help, you can use one of these channels to ask a question:

- [Slack](http://slack.strapi.io) We're present on official Strapi slack workspace. Look for @danestves and DM.
- [GitHub](https://github.com/danestves/strapi-plugin-preview-content/issues) (Bug reports, Contributions, Questions and Discussions)

## License

[MIT License](LICENSE.md) Copyright (c) 2020 [Daniel Esteves](https://danestves.com/) &amp; [Strapi Solutions](https://strapi.io/).
