"use client"

import * as React from "react";
import { signOut } from 'next-auth/react';
import { useToast } from "./../../components/ui/use-toast";

import { cn } from "../../lib/utils";
import { Icons } from "./Icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../components/ui/navigation-menu";

const components = [
  {
    title: "Profile",
    href: "/dashboard/profile",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
  },
  {
    title: "Sign Out",
    href: "/",
  }
];

export default function NavMenu() {
  const { toast } = useToast();
  const logOut = async () => {
        await signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/`
        });

        toast({
        title : 'Success',
        description: "Log Out Successfull!",
        variant: 'success',
      });
    };
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>User</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] p-2 md:w-[500px] lg:w-[600px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                    onClick={component.title === "Sign Out" ? logOut : undefined}
                  >
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
