import Link from "next/link";
import { ThemeToggle } from "./Themetoggle";

export function Navbar() {
    return (
        <nav className="border-b bg-background h-[10vh]">
            <div className="container flex items-center justify-between">
                <Link href="/">
                    <h1 className="font-bold text-3xl">CosaNostraaSAAS</h1>
                </Link>

                <div className="flex items-center gap-x-3">
            <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
