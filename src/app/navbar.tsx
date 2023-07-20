import { Dispatch, SetStateAction } from "react";

export function NavBar(props:{setContent:Dispatch<SetStateAction<number>>}) {
    let setContent = props.setContent;
    return (
        <div className="NavBar">
            <button onClick={() => {setContent(1)}}>
                Logo
            </button>
            <button onClick={() => {setContent(2)}}>
                Login
            </button>
        </div>
    );
}