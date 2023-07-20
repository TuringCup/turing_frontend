import { Dispatch, SetStateAction } from "react";
import { Login } from "./login";

export function Content(props:{content:number, setContent:Dispatch<SetStateAction<number>>}) {
    let content = props.content;
    let setContent = props.setContent;
    switch(content) {
      case 1:
        return (
          <div>
            Intro Content
          </div>
        );
        break;
      case 2:
        return (
          <div>
            <Login></Login>
          </div>
        );
        break;
      default:
        return (
          <div>
            Intro Content
          </div>
        )
        break;
    }
  }