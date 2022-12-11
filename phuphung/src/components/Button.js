const ButtonComponent = ({
    className,
    name,
    type,
    isLink,
    url,
    children,
    isLoading,
}) => {
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
                    {isLoading ? (
                        <>
                            <span
                                class='spinner-border spinner-border-sm'
                                role='status'
                                aria-hidden='true'
                            ></span>
                            <span class='visually-hidden'></span>
                        </>
                    ) : (
                        ""
                    )}

                    {name}
                </button>
            );
        }
    };
    return <>{renderButton()}</>;
};
export default ButtonComponent;
