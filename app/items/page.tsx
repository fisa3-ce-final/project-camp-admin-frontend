"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye } from "lucide-react";

// 임시 데이터
const items = [
    { id: 1, name: "자전거", category: "운동", status: "승인됨", price: 50000 },
    { id: 2, name: "텐트", category: "캠핑", status: "대기 중", price: 80000 },
    {
        id: 3,
        name: "카메라",
        category: "전자기기",
        status: "거부됨",
        price: 300000,
    },
    {
        id: 4,
        name: "스키",
        category: "스포츠",
        status: "승인됨",
        price: 100000,
    },
    {
        id: 5,
        name: "서핑보드",
        category: "수상스포츠",
        status: "대기 중",
        price: 150000,
    },
];

interface Item {
    id: number;
    name: string;
    category: string;
    status: string;
    price: number;
}

interface ItemTableProps {
    items: Item[];
}

interface ItemDetailProps {
    item: Item;
}

export default function ItemManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "승인됨":
                return <Badge className="bg-green-500">승인됨</Badge>;
            case "대기 중":
                return <Badge className="bg-yellow-500">대기 중</Badge>;
            case "거부됨":
                return <Badge className="bg-red-500">거부됨</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    const filterItems = (status: string) => {
        return items.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (status === "all" || item.status === status)
        );
    };

    const ItemTable = ({ items }: ItemTableProps) => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>이름</TableHead>
                    <TableHead>카테고리</TableHead>
                    <TableHead>가격</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>액션</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.price.toLocaleString()}원</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setSelectedItem(item)}
                                    >
                                        <Eye className="h-4 w-4 mr-2" />
                                        상세보기
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            {selectedItem?.name}
                                        </DialogTitle>
                                        <DialogDescription>
                                            물품 상세 정보
                                        </DialogDescription>
                                    </DialogHeader>
                                    {selectedItem && (
                                        <div className="mt-4">
                                            <p>
                                                <strong>ID:</strong>{" "}
                                                {selectedItem.id}
                                            </p>
                                            <p>
                                                <strong>카테고리:</strong>{" "}
                                                {selectedItem.category}
                                            </p>
                                            <p>
                                                <strong>가격:</strong>{" "}
                                                {selectedItem.price.toLocaleString()}
                                                원
                                            </p>
                                            <p>
                                                <strong>상태:</strong>{" "}
                                                {selectedItem.status}
                                            </p>
                                        </div>
                                    )}
                                </DialogContent>
                            </Dialog>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">물품 관리</h1>

            <Card className="mb-6">
                <CardContent className="pt-6">
                    <div className="mb-4">
                        <Input
                            type="text"
                            placeholder="물품 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-1/3"
                        />
                    </div>

                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="all">전체</TabsTrigger>
                            <TabsTrigger value="승인됨">승인됨</TabsTrigger>
                            <TabsTrigger value="대기 중">대기 중</TabsTrigger>
                            <TabsTrigger value="거부됨">거부됨</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all">
                            <ItemTable items={filterItems("all")} />
                        </TabsContent>
                        <TabsContent value="승인됨">
                            <ItemTable items={filterItems("승인됨")} />
                        </TabsContent>
                        <TabsContent value="대기 중">
                            <ItemTable items={filterItems("대기 중")} />
                        </TabsContent>
                        <TabsContent value="거부됨">
                            <ItemTable items={filterItems("거부됨")} />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
