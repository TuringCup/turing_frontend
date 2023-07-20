
export function Login() {
    
    return (
        <form action="/api/login" method="post">
            <label htmlFor="username">用户名</label>
            <input id="username" type="text"></input>
            <br></br>
            <label htmlFor="password">密码</label>
            <input id="password" type="password"></input>
            <br></br>
            <button type="submit">登录</button>
        </form>
    );
}