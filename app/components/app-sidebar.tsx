import {
    Calendar,
    Home,
    Inbox,
    LayoutDashboard,
    Package,
    PartyPopper,
    Search,
    Settings,
    ShoppingCart,
    Ticket,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

// Menu items.
const items = [
    {
        title: "대시보드",
        url: "/",
        icon: LayoutDashboard,
    },
    {
        title: "물품 관리",
        url: "/items",
        icon: Package,
    },
    {
        title: "대여 관리",
        url: "/rentals",
        icon: ShoppingCart,
    },
    {
        title: "쿠폰 관리",
        url: "/coupons",
        icon: Ticket,
    },
];

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
