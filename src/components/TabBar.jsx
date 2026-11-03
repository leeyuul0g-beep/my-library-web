import { NavLink } from 'react-router-dom'

export default function TabBar() {
  return (
    <nav className="tabbar">
      <NavLink to="/" end>서재</NavLink>
      <NavLink to="/records">기록</NavLink>
    </nav>
  )
}
