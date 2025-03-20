import {ReactNode} from "react";
import MuiButton, {ButtonProps} from "@mui/material/Button";

export default function Button({children, ...rest}: { children?: ReactNode } & Partial<ButtonProps>) {
    return <MuiButton {...rest}>{children}</MuiButton>
};