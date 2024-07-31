import { FC, JSXElementConstructor, MouseEventHandler, ReactNode } from "react";
import { DropdownMenuItem } from "../../../../components/ui/dropdown-menu";


const DropdownMenuItemWithIcon = ({ Icon, children, onClick }) => {
    return (<DropdownMenuItem onClick={onClick}>
        <Icon className="mr-2 h-4 w-4" />
        {children}
    </DropdownMenuItem>);
};


export default DropdownMenuItemWithIcon;