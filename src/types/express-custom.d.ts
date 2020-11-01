import ApplicationModel from "../models/application"
import Collaboration from "../models/collaboration";

export {}; // this file needs to be a module

declare global {
  namespace Express {
    interface Request {
      locals: {
        application?: ApplicationModel
        collaboration?: Collaboration
      }
    }
  }
}
