import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CreditCard, DoorClosed, Home, Settings } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

export const navItem= [
    {name:'Home', href: '/dashboard', icon:Home},
    {name:'Settings', href: '/dashboard/settings', icon:Settings},
    {name:'Billing', href: '/dashboard/billing', icon:CreditCard},

]

export function UserNav() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 rounded-full">
                        <AvatarImage src="https://github.com/shadcn.png" alt="" />
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end"
                forceMount>
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Cosa Nostraa</p>
                        <p className="text-xs leading-none text-muted-foreground">cosanostraa@wavoon.com</p>

                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {navItem.map((item, index) => (
                        <DropdownMenuItem asChild key={index}>
                            <Link href={item.href} className="w-full flex justify-between items-center">
                            {item.name}
                            <span> 
                                <item.icon className="w-4 h'4" />
                            </span>
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="w-full justify-between items-center" asChild>
                    <LogoutLink>
                    Logout{""}
                    <span>
                        <DoorClosed className="w-4 h-4"/>
                    </span>

                    </LogoutLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}