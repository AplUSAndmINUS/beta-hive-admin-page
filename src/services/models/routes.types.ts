import { NonIndexRouteObject } from "react-router-dom";

export interface Routes extends NonIndexRouteObject {
  name?: string;
  storySubmission?: boolean;
}