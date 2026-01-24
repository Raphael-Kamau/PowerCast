import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { 
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    ...props
}) => {
    const variantClass =
        variant === 'primary' ? 'btn btn-primary' :
            variant === 'secondary' ? 'btn btn-secondary' :
                'btn btn-outline-secondary';
    
    const sizeClass = size === 'sm' ? 'btn-sm' : "";

    return (
        <button className={`${variantClass} ${sizeClass}`} {...props}>
            {children}
        </button>
    );
};