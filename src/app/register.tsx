
export function Register() {

  return (
    <div className="registerContent">
      <form>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username"></input>
        <label htmlFor="password">密码</label>
        <input type="password" id="password"></input>
        <label htmlFor="email">邮箱</label>
        <input type="email" id="email"></input>
        <button type="submit">注册</button>
      </form>
    </div>
  )
}