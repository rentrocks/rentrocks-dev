export const NextArrow = ({ className, onClick, to }) => {
    return (
        <div
            className={`${className} z-10 ltr:right-4 `}
            onClick={onClick}
            aria-label={to}
        />
    );
};
export const PrevArrow = ({ className, onClick, to }) => {
    return (
        <div
            className={`${className} z-10 ltr:left-4 `}
            onClick={onClick}
            aria-label={to}
        />
    );
};