import { Link } from 'react-router-dom';
import './Sidebar.css';


export const Sidebar = () => {

    const { submenu } = JSON.parse(localStorage.getItem('menu'));
    
    return (
        <div className="sidebar">
            <h1>Menu</h1>
            <div className="separator"></div>
            { 
                submenu.map((elem, key) => {
                    return <Link key={ key } to={elem.url}>{ elem.title }</Link>
                })
            }
        </div>
    )
}