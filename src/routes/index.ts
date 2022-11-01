import * as Auth from './auth';
import * as Main from './main';

export * as Auth from './auth';
export * as Main from './main';

export const all = [
    ...Auth.all,
    ...Main.all,
]