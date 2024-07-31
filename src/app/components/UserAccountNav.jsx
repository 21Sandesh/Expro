'use client';

import { User } from "lucide-react";
import { Button } from "../../components/ui/button";
import Link from "next/link";
// import { UserMenu } from "./UserMenu";
import NavMenuDem from "./UserMenu";



const UserAccountNav = () => {
    return (
        <div className="flex gap-3  items-center">
            <NavMenuDem />
        </div>
    );
};

export default UserAccountNav;