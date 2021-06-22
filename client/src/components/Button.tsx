import React from 'react';

type ButtonProps = {
    text?: string;
}

export const Button = (props: ButtonProps) => {
    return (
        <button>{props.text}</button>
    );
}
