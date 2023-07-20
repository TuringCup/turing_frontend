import { Dispatch, SetStateAction } from "react";

// Todo: 美化并且添加功能
export function NavBar(props:{setContent:Dispatch<SetStateAction<number>>}) {
    let setContent = props.setContent;
    return (
        <div className="NavBar">
            <button onClick={() => {setContent(1)}}>
                {/* Todo: 将这个改为图灵杯Logo */}
                Logo
            </button>
            <button onClick={() => {setContent(2)}}>
                Login
            </button>
        </div>
    );
}