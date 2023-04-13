// const path = import("path");
// const fs = import("fs");
// const directoryPath = path.join(__dirname, "Documents");
// * an experiment, not good for practical work, need to write the file name key type manually,and the props type cannot be used for individual component

import { ReactNode, JSXElementConstructor } from "react";

// console.log(directoryPath);
const files = import.meta.glob("../components/*.tsx");

const modules = {};

const examplePromises = Object.keys(files)
  .map((x) => files[x])
  .map((f) => f());

const regex = /^.*[\\\/]|(.tsx$)/gi;

// const fileName = Object.keys(files).map((x) =>
//   x.replaceAll(regex, "")
// );

const gamesComponent = Promise.all(examplePromises).then(
  (list) => {
    for (let module of list) {
      console.log(module);
      for (let key in module) {
        console.log(key);
        const Component = module[key];
        modules[module.default.name] = Component;
      }
    }
    return modules;
  }
);
type fileName = "Level" | "Lights";

// * ts cannot run on runtime, only compile time,so it does not know whats inside an array after some operations
type TModules = Record<
  fileName,
  JSXElementConstructor<any>
>;

export default (await gamesComponent) as TModules;
