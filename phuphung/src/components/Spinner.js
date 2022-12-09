import React from "react";

export default function LoadingSpinner() {
    return (
        <>
            <span
                class='spinner-border spinner-border-sm'
                role='status'
                aria-hidden='true'
            ></span>
            <span class='visually-hidden'></span>
        </>
    );
}
