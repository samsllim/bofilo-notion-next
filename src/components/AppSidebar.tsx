'use client'

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from "@/components/ui/sidebar"
import { UserButton, useUser } from '@clerk/nextjs'
import { collectionGroup, query, where, DocumentData, getDocs, collection } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "@/firebase";
import { useState } from "react";
import { collectionData } from 'rxfire/firestore';

interface RoomDocument extends DocumentData {
    createdAt: string;
    roomId: string;
    userId: string;
    role: string;
}

// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
]

export function AppSidebar() {
    const { user } = useUser();
    const [ groupedData, setGroupedData ] = useState<{
        owner: RoomDocument[];
        editor: RoomDocument[];
    }>({
        owner: [],
        editor: [],
    });

    const [data, setData] = useState([]);

    const userButtonAppearance = {
        elements: {
          userButtonAvatarBox: "w-8 h-8", // Custom width and height
          userButtonPopoverCard: "", // Custom background for the popover card
          userButtonPopoverActionButton: "", // Custom text color for action buttons
        },
    };

    useEffect(() => {
        if (user) {
            const userEmail = user.primaryEmailAddress?.emailAddress;
            const q = query(
                collectionGroup(db, "rooms"),
                where("userId", "==", userEmail)
            );

            // Create an observable for the Firestore query
            const subscription = collectionData(q, { idField: "id" }).subscribe((docs:[]) => {
                const ownerGroup: RoomDocument[] = [];
                const editorGroup: RoomDocument[] = [];

                docs.forEach((doc: any) => {
                    const roomData = doc as RoomDocument;
                    if (roomData.role === "owner") {
                        ownerGroup.push(roomData);
                    } else {
                        editorGroup.push(roomData);
                    }
                });

                setGroupedData({
                    owner: ownerGroup,
                    editor: editorGroup,
                });
            });

            // Clean up the subscription
            return () => {
                subscription.unsubscribe();
            };
        }
    }, [user]);


    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {groupedData.owner.map((item) => (
                            //navigate to room
                            <SidebarMenuItem key={item.roomId}>
                                <SidebarMenuButton asChild>
                                <a href={`/doc/${item.roomId}`}>
                                    <Calendar />
                                <span>{item.roomId}</span>
                                </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
                </SidebarGroup>
                <SidebarFooter className="mt-auto">
                    <div className="pb-4">
                        <UserButton appearance={userButtonAppearance}/>
                    </div>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    )
}
