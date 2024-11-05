"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

// 샘플 쿠폰 데이터 - 실제 API 데이터로 대체 필요
const initialCoupons = [
    {
        id: 1,
        discount: 10,
        type: "percent",
        expiry_date: "2023-12-31",
        created_at: "2023-01-01",
    },
    {
        id: 2,
        discount: 5000,
        type: "price",
        expiry_date: "2024-06-30",
        created_at: "2023-06-01",
    },
];

export default function CouponManagementPage() {
    const [coupons, setCoupons] = useState(initialCoupons);
    const [newCoupon, setNewCoupon] = useState({
        discount: "",
        type: "percent",
        expiry_date: "",
    });

    // 쿠폰 추가 함수
    const handleAddCoupon = () => {
        const newId = coupons.length ? coupons[coupons.length - 1].id + 1 : 1;
        const coupon = {
            id: newId,
            discount: parseFloat(newCoupon.discount),
            type: newCoupon.type,
            expiry_date: newCoupon.expiry_date,
            created_at: format(new Date(), "yyyy-MM-dd"),
        };
        setCoupons([...coupons, coupon]);
        setNewCoupon({ discount: "", type: "percent", expiry_date: "" });
    };

    // 쿠폰 삭제 함수
    const handleDeleteCoupon = (id: number) => {
        setCoupons(coupons.filter((coupon) => coupon.id !== id));
    };

    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-6">쿠폰 관리</h1>

            {/* 탭 메뉴 */}
            <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="all">전체 쿠폰</TabsTrigger>
                    <TabsTrigger value="add">쿠폰 생성</TabsTrigger>
                </TabsList>

                {/* 전체 쿠폰 목록 */}
                <TabsContent value="all">
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>쿠폰 목록</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableCell>할인율/금액</TableCell>
                                        <TableCell>타입</TableCell>
                                        <TableCell>만료일</TableCell>
                                        <TableCell>생성일</TableCell>
                                        <TableCell>액션</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {coupons.map((coupon) => (
                                        <TableRow key={coupon.id}>
                                            <TableCell>
                                                {coupon.type === "percent"
                                                    ? `${coupon.discount}%`
                                                    : `${coupon.discount}원`}
                                            </TableCell>
                                            <TableCell>
                                                {coupon.type === "percent"
                                                    ? "비율 할인"
                                                    : "금액 할인"}
                                            </TableCell>
                                            <TableCell>
                                                {coupon.expiry_date}
                                            </TableCell>
                                            <TableCell>
                                                {coupon.created_at}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() =>
                                                        handleDeleteCoupon(
                                                            coupon.id
                                                        )
                                                    }
                                                >
                                                    삭제
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* 쿠폰 생성 폼 */}
                <TabsContent value="add">
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>새 쿠폰 생성</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="discount">할인율/금액</Label>
                                <Input
                                    id="discount"
                                    type="number"
                                    value={newCoupon.discount}
                                    onChange={(e) =>
                                        setNewCoupon({
                                            ...newCoupon,
                                            discount: e.target.value,
                                        })
                                    }
                                    placeholder="할인율 또는 금액을 입력하세요"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="type">할인 타입</Label>
                                <select
                                    id="type"
                                    value={newCoupon.type}
                                    onChange={(e) =>
                                        setNewCoupon({
                                            ...newCoupon,
                                            type: e.target.value,
                                        })
                                    }
                                    className="border rounded-md px-3 py-2 w-full"
                                >
                                    <option value="percent">비율 할인</option>
                                    <option value="price">금액 할인</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="expiry_date">만료일</Label>
                                <Input
                                    id="expiry_date"
                                    type="date"
                                    value={newCoupon.expiry_date}
                                    onChange={(e) =>
                                        setNewCoupon({
                                            ...newCoupon,
                                            expiry_date: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleAddCoupon}>쿠폰 저장</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
