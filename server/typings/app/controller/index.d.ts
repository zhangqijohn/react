// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportGame from '../../../app/controller/game';
import ExportRole from '../../../app/controller/role';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    game: ExportGame;
    role: ExportRole;
    user: ExportUser;
  }
}
