import { BaseHTMLAttributes } from 'react';

import '../styles/button.scss'

type ButtonProps = BaseHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
    return (
        <button className="button" {...props} />
    );
}
