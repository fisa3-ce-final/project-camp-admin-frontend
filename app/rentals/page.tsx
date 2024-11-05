"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 샘플 데이터 - 실제 API 데이터로 대체 필요
const rentalItems = [
    {
        id: 1,
        name: "카메라",
        description: "고성능 DSLR 카메라",
        price: 20000,
        status: "reserved",
        category: "전자제품",
    },
    {
        id: 2,
        name: "노트북",
        description: "가볍고 휴대성이 좋은 노트북",
        price: 50000,
        status: "available",
        category: "전자제품",
    },
    {
        id: 3,
        name: "프로젝터",
        description: "고화질 프로젝터",
        price: 40000,
        status: "unavailable",
        category: "전자제품",
    },
];

export default function RentalManagementPage() {
    const [items, setItems] = useState(rentalItems);
    const [selectedTab, setSelectedTab] = useState("all");

    useEffect(() => {
        // 실제 API 호출 로직으로 데이터 가져오기
        // fetchRentalItems().then(data => setItems(data));
    }, []);

    // 승인 및 반려 기능
    const approveItem = (id: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, status: "available" } : item
            )
        );
    };

    const rejectItem = (id: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, status: "unavailable" } : item
            )
        );
    };

    // 탭에 따른 필터링 함수
    const filteredItems = items.filter((item) => {
        if (selectedTab === "all") return true;
        return item.status === selectedTab;
    });

    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-6">대여 관리</h1>

            {/* 탭 메뉴 */}
            <Tabs
                defaultValue="all"
                onValueChange={(value) => setSelectedTab(value)}
            >
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">전체 물품</TabsTrigger>
                    <TabsTrigger value="reserved">심사 대기</TabsTrigger>
                    <TabsTrigger value="available">승인된 물품</TabsTrigger>
                    <TabsTrigger value="unavailable">반려된 물품</TabsTrigger>
                </TabsList>

                {/* 물품 목록 테이블 */}
                <TabsContent value={selectedTab}>
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>
                                {selectedTab === "all"
                                    ? "전체 물품"
                                    : selectedTab === "available"
                                    ? "승인된 물품"
                                    : selectedTab === "reserved"
                                    ? "심사 대기"
                                    : "반려된 물품"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableCell>물품명</TableCell>
                                        <TableCell>설명</TableCell>
                                        <TableCell>가격</TableCell>
                                        <TableCell>카테고리</TableCell>
                                        <TableCell>상태</TableCell>
                                        <TableCell>액션</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredItems.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>
                                                {item.description}
                                            </TableCell>
                                            <TableCell>
                                                {item.price}원
                                            </TableCell>
                                            <TableCell>
                                                {item.category}
                                            </TableCell>
                                            <TableCell>
                                                {item.status === "reserved"
                                                    ? "심사 대기"
                                                    : item.status ===
                                                      "available"
                                                    ? "승인됨"
                                                    : "반려됨"}
                                            </TableCell>
                                            <TableCell>
                                                {item.status === "reserved" && (
                                                    <>
                                                        <Button
                                                            onClick={() =>
                                                                approveItem(
                                                                    item.id
                                                                )
                                                            }
                                                            className="mr-2"
                                                        >
                                                            승인
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            onClick={() =>
                                                                rejectItem(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            반려
                                                        </Button>
                                                    </>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
