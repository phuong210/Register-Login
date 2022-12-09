const ButtonComponent = ({ className, name, type, isLink, url, children }) => {
    const renderButton = () => {
        if (isLink) {
            return (
                <a href={url} className={`Button-component ${className}`}>
                    {name}
                </a>
            );
        } else {
            return (
                <button type={type} className={`Button-component ${className}`}>
                    {children}
                    {name}
                </button>
            );
        }
    };
    return <>{renderButton()}</>;
};
export default ButtonComponent;
