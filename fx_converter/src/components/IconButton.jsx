export default function IconButton({
    children,
    onClick,
    active = false,
    variant = "outline",
    ariaLabel,
    disabled = false,
}){
    return (
        <button
            type = "button"
            className={`icon-btn icon-btn--${variant} ${active ? 'is-active' : ''}`}
            onClick={onClick}
            aria-label={ariaLabel}
            aria-pressed={variant === 'outline' ? active : undefined}
            disabled={disabled}
            >
                {children}
            </button>

    )
}