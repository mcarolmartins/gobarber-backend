import { container } from "tsyringe";

import '@modules/users/providers'

import IHashProvider from "./HashProviders/models/IHashProvider";
import BCryptHashProvider from "./HashProviders/implementations/BCryptHashProvider";

container.registerSingleton<IHashProvider>(
  'HashProvider',
  BCryptHashProvider
);