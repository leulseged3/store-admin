import { Models } from '@rematch/core';
import { Auth } from './auth';
export interface RootModel extends Models<RootModel> {
  Auth: typeof Auth;
}

export const models: RootModel = {
  Auth
};
