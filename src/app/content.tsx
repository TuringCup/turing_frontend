import { Dispatch, SetStateAction } from "react";
import { Login } from "./login";
import { Intro } from "./intro";

export function Content(props:{content:number, setContent:Dispatch<SetStateAction<number>>}) {
    let content = props.content;
    let setContent = props.setContent;
    switch(content) {
      case 1:
        return (<Intro></Intro>);
      case 2:
        return (
            <Login></Login>
        );
      default:
        return (<Intro></Intro>);
    }
  }