const ButtonComponent = ({ className, name, type, isLink, url }) => {
    const renderButton = () => {
        if (isLink) {
            return <a href={url} className={`Button-component ${className}`}>{name}</a>;
        } else {
            return <button type={type} className={`Button-component ${className}`}>{name}</button>;
        }
    }
    return (
        <>
            {renderButton()}
        </>
    );
}
export default ButtonComponent;


// class Nav extends Component {
//     render() {
//         return (
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//                 <div className="collapse navbar-collapse" id="navbarNav">
//                     <ul className="navbar-nav">
//                         <li className="nav-item active">
//                             <a className="nav-link" href="#">Home</a>
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link" href="#">Features</a>
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link" href="#">Pricing</a>
//                         </li>
//                     </ul>
//                 </div>
//             </nav>
//         );
//     }
// }

// export default Nav;