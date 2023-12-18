import React from "react";

export type categoriesSelectType = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    category: string;
};

function CategoriesSelect(props: categoriesSelectType) {
    const { category, ...rest } = props;
    return <button {...rest}> {category} </button>;
}

export default CategoriesSelect;
