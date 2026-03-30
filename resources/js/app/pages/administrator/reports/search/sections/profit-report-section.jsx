import React, { useState, useEffect } from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    PDFViewer,
    Font,
} from "@react-pdf/renderer";
import { useSelector } from "react-redux";
import { peso_value } from "@/app/lib/peso";

// Register font (if needed)
Font.register({
    family: "NotoSans",
    fonts: [
        {
            src: "/fonts/Noto_Sans/static/NotoSans-Regular.ttf",
            fontWeight: "normal",
        },
        {
            src: "/fonts/Noto_Sans/static/NotoSans-Bold.ttf",
            fontWeight: "bold",
        },
    ],
});

const styles = StyleSheet.create({
    page: {
        fontFamily: "NotoSans",
        fontSize: 10,
        padding: 30,
    },
    header: {
        marginBottom: 20,
    },
    companyInfo: {
        textAlign: "right",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 10,
    },
    summary_title: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 2,
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#f0f0f0",
        borderBottom: 1,
        padding: 5,
        fontWeight: "bold",
    },
    tableRow: {
        flexDirection: "row",
        borderBottom: 1,
        padding: 5,
    },
    col: {
        flex: 1,
        paddingHorizontal: 3,
    },
    colSmall: {
        flex: 0.5,
        paddingHorizontal: 3,
    },
    summary: {
        marginTop: 10,
        alignItems: "flex-end",
    },
    summary_all: {
        marginTop: 10,
        alignItems: "flex-start",
        fontWeight: "bold",
    },
    loadingContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
    },
    loadingContent: {
        textAlign: "center",
        padding: 20,
        backgroundColor: "white",
        borderRadius: 8,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    },
    spinner: {
        border: "4px solid #f3f3f3",
        borderTop: "4px solid #3498db",
        borderRadius: "50%",
        width: 40,
        height: 40,
        animation: "spin 1s linear infinite",
        margin: "0 auto 16px",
    },
});

const ProfitReportSection = () => {
    const { reports } = useSelector((store) => store.carts);
    const [isLoading, setIsLoading] = useState(true);
    const params = new URLSearchParams(window.location.search);
    const initialStart = params.get("start");
    const initialEnd = params.get("end");

    // Simulate loading time for PDF generation
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); // 1.5 seconds loading time

        return () => clearTimeout(timer);
    }, [reports]);

    // Reset loading when reports data changes
    useEffect(() => {
        setIsLoading(true);
    }, [reports]);

    const total_cost_store = reports?.data?.store?.reduce(
        (sum, item) => sum + Number(item.cost),
        0,
    );
    const total_sales_store = reports?.data?.store?.reduce(
        (sum, item) => sum + Number(item.sales),
        0,
    );
    const total_discount_store = reports?.data?.store?.reduce(
        (sum, item) => sum + Number(item.discount ?? 0),
        0,
    );

    const total_profit_store = reports?.data?.store?.reduce(
        (sum, item) => sum + Number(item.profit ?? 0),
        0,
    );

    const total_profit_shopee_bip = reports?.data?.shopee_bip?.reduce(
        (sum, item) => sum + Number(item.profit ?? 0),
        0,
    );

    const total_profit_shopee_ygd = reports?.data?.shopee_ygd?.reduce(
        (sum, item) => sum + Number(item.profit ?? 0),
        0,
    );

    const total_profit_credit = reports?.data?.credit?.reduce(
        (sum, item) => sum + Number(item.profit ?? 0),
        0,
    );

    const total_cost_shopee_bip = reports?.data?.shopee_bip?.reduce(
        (sum, item) => sum + Number(item.cost),
        0,
    );
    const total_sales_shopee_bip = reports?.data?.shopee_bip?.reduce(
        (sum, item) => sum + Number(item.sales),
        0,
    );

    const total_cost_shopee_ygd = reports?.data?.shopee_ygd?.reduce(
        (sum, item) => sum + Number(item.cost),
        0,
    );
    const total_sales_shopee_ygd = reports?.data?.shopee_ygd?.reduce(
        (sum, item) => sum + Number(item.sales),
        0,
    );
    const total_expenses = reports?.data?.expenses?.reduce(
        (sum, item) => sum + Number(item.total_cost),
        0,
    );

    const total_cost_credit = reports?.data?.credit?.reduce(
        (sum, item) => sum + Number(item.cost),
        0,
    );
    const total_sales_credit = reports?.data?.credit?.reduce(
        (sum, item) => sum + Number(item.sales),
        0,
    );
    const total_discount_credit = reports?.data?.credit?.reduce(
        (sum, item) => sum + Number(item.discount ?? 0),
        0,
    );

    const total_summary_cost =
        Number(total_cost_credit) +
        Number(total_cost_shopee_bip) +
        Number(total_cost_shopee_ygd) +
        (Array.isArray(total_cost_store)
            ? total_cost_store.reduce((sum, item) => sum + Number(item.cost), 0)
            : Number(total_cost_store) || 0);

    const total_summary_sales =
        Number(total_sales_credit) +
        Number(total_sales_shopee_bip) +
        Number(total_sales_shopee_ygd) +
        (Array.isArray(total_sales_store)
            ? total_sales_store.reduce(
                  (sum, item) => sum + Number(item.cost),
                  0,
              )
            : Number(total_sales_store) || 0);

    const total_summary_profit =
        Number(total_summary_sales) -
        Number(total_summary_cost) -
        Number(total_expenses);
    // Sort data by product name
    const sortedStore = (reports?.data?.store || [])
        .slice()
        .sort((a, b) => (a?.product || "").localeCompare(b?.product || ""));
    const sortedShopeeBip = (reports?.data?.shopee_bip || [])
        .slice()
        .sort((a, b) => (a?.product || "").localeCompare(b?.product || ""));
    const sortedShopeeYgd = (reports?.data?.shopee_ygd || [])
        .slice()
        .sort((a, b) => (a?.product || "").localeCompare(b?.product || ""));
    const sortedCredit = (reports?.data?.credit || [])
        .slice()
        .sort((a, b) => (a?.product || "").localeCompare(b?.product || ""));
    const sortedExpenses = (reports?.data?.expenses || [])
        .slice()
        .sort((a, b) => (a?.category || "").localeCompare(b?.category || ""));

    // Show loading spinner while generating report
    if (isLoading) {
        return (
            <>
                <style>
                    {`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}
                </style>
                <div style={styles.loadingContainer}>
                    <div style={styles.loadingContent}>
                        <div style={styles.spinner}></div>
                        <h3 style={{ margin: 0, color: "#333" }}>
                            Generating Report...
                        </h3>
                        <p style={{ margin: "8px 0 0", color: "#666" }}>
                            Please wait while we prepare your profit report
                        </p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
            <Document>
                <Page orientation="landscape" size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Profit and Margin</Text>

                        <View
                            style={{
                                width: "100%",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginBottom: 10,
                            }}
                        >
                            {/* Left Side: Labels and Values */}
                            <View style={{ flex: 1 }}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginBottom: 2,
                                    }}
                                >
                                    <Text style={{ width: 60 }}>Period:</Text>
                                    <Text>
                                        {initialStart} - {initialEnd}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginBottom: 2,
                                    }}
                                >
                                    <Text style={{ width: 60 }}>Customer:</Text>
                                    <Text>
                                        {reports?.customer?.name ?? "All"}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginBottom: 2,
                                    }}
                                >
                                    <Text style={{ width: 60 }}>User:</Text>
                                    <Text>{reports?.user?.name ?? "All"}</Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginBottom: 2,
                                    }}
                                >
                                    <Text style={{ width: 60 }}>Product:</Text>
                                    <Text>
                                        {reports?.product?.name ?? "All"}
                                    </Text>
                                </View>
                            </View>

                            {/* Right Side: Company Info */}
                            <View style={{ flex: 1, textAlign: "left" }}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "flex-start",
                                        marginBottom: 2,
                                    }}
                                >
                                    <Text style={{ width: 60 }}>
                                        Company: &emsp;{" "}
                                    </Text>
                                    <Text>Egie's Beauty Boutique</Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "flex-start",
                                    }}
                                >
                                    <Text style={{ width: 53 }}>
                                        Address:&emsp;{" "}
                                    </Text>
                                    <Text>
                                        Rizal Street Brgy V, 6127 San Carlos
                                        City
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.title}>Store</Text>
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={styles.col}>Cart ID</Text>
                        <Text style={styles.colSmall}>Code</Text>
                        <Text style={styles.col}>Product</Text>
                        <Text style={styles.colSmall}>Quantity</Text>
                        <Text style={styles.colSmall}>Cost</Text>
                        <Text style={styles.colSmall}>Total</Text>
                        <Text style={styles.colSmall}>Profit</Text>
                        <Text style={styles.colSmall}>Margin</Text>
                    </View>

                    {/* Table Rows */}
                    {sortedStore.map((item, idx) => (
                        <View style={styles.tableRow} key={idx}>
                            <Text style={styles.col}>{item.cart_id}</Text>
                            <Text style={styles.colSmall}>{item.code}</Text>
                            <Text style={styles.col}>{item?.product}</Text>
                            <Text style={styles.colSmall}>{item.quantity}</Text>
                            <Text style={styles.colSmall}>
                                {peso_value(item.cost)}
                            </Text>
                            <Text style={styles.colSmall}>
                                {peso_value(item.sales)}
                            </Text>
                            <Text style={styles.colSmall}>
                                {peso_value(item.profit)}
                            </Text>
                            <Text style={styles.colSmall}>{item.margin}</Text>
                        </View>
                    ))}

                    <View style={styles.summary}>
                        <Text>Total Cost: {peso_value(total_cost_store)}</Text>
                        <Text>
                            Total Sales: {peso_value(total_sales_store)}
                        </Text>
                        {/* <Text>
                            Total Discount: {peso_value(total_discount_store)}
                        </Text> */}
                        <Text>
                            Total Profit:{" "}
                            {peso_value(total_sales_store - total_cost_store)}
                        </Text>
                    </View>
                    <Text style={styles.title}>Shopee — Beauty In Pink</Text>
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={styles.col}>Cart ID</Text>
                        <Text style={styles.colSmall}>Code</Text>
                        <Text style={styles.col}>Product</Text>
                        <Text style={styles.colSmall}>Quantity</Text>
                        <Text style={styles.colSmall}>Cost</Text>
                        <Text style={styles.colSmall}>Total</Text>
                        <Text style={styles.colSmall}>Profit</Text>
                        <Text style={styles.colSmall}>Margin</Text>
                    </View>

                    {/* Table Rows */}
                    {sortedShopeeBip.map((item, idx) => (
                        <View style={styles.tableRow} key={idx}>
                            <Text style={styles.col}>{item.cart_id}</Text>
                            <Text style={styles.colSmall}>{item.code}</Text>
                            <Text style={styles.col}>{item?.product}</Text>
                            <Text style={styles.colSmall}>{item.quantity}</Text>
                            <Text style={styles.colSmall}>
                                {peso_value(item.cost)}
                            </Text>
                            <Text style={styles.colSmall}>
                                {peso_value(item.sales ?? 0)}
                            </Text>
                            <Text style={styles.colSmall}>
                                {peso_value(item.profit)}
                            </Text>
                            <Text style={styles.colSmall}>{item.margin}</Text>
                        </View>
                    ))}

                    <View style={styles.summary}>
                        <Text>
                            Total Cost: {peso_value(total_cost_shopee_bip)}
                        </Text>
                        <Text>
                            Total Sales: {peso_value(total_sales_shopee_bip)}
                        </Text>
                        <Text>
                            Total Profit:{" "}
                            {peso_value(
                                total_sales_shopee_bip - total_cost_shopee_bip,
                            )}
                        </Text>
                    </View>

                    <Text style={styles.title}>
                        Shopee — You Glow Darling PH
                    </Text>
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={styles.col}>Cart ID</Text>
                        <Text style={styles.colSmall}>Code</Text>
                        <Text style={styles.col}>Product</Text>
                        <Text style={styles.colSmall}>Quantity</Text>
                        <Text style={styles.colSmall}>Cost</Text>
                        <Text style={styles.colSmall}>Total</Text>
                        <Text style={styles.colSmall}>Profit</Text>
                        <Text style={styles.colSmall}>Margin</Text>
                    </View>

                    {/* Table Rows */}
                    {sortedShopeeYgd.map((item, idx) => {
                        console.log("sortedShopeeYgd item:", item);
                        return (
                            <View style={styles.tableRow} key={idx}>
                                <Text style={styles.col}>{item.cart_id}</Text>
                                <Text style={styles.colSmall}>{item.code}</Text>
                                <Text style={styles.col}>{item?.product}</Text>
                                <Text style={styles.colSmall}>
                                    {item.quantity}
                                </Text>
                                <Text style={styles.colSmall}>
                                    {peso_value(item.cost)}
                                </Text>
                                <Text style={styles.colSmall}>
                                    {peso_value(item.sales ?? 0)}
                                </Text>
                                <Text style={styles.colSmall}>
                                    {peso_value(item.profit)}
                                </Text>
                                <Text style={styles.colSmall}>
                                    {item.margin}
                                </Text>
                            </View>
                        );
                    })}

                    <View style={styles.summary}>
                        <Text>
                            Total Cost: {peso_value(total_cost_shopee_ygd)}
                        </Text>
                        <Text>
                            Total Sales: {peso_value(total_sales_shopee_ygd)}
                        </Text>
                        <Text>
                            Total Profit:{" "}
                            {peso_value(
                                total_sales_shopee_ygd - total_cost_shopee_ygd,
                            )}
                        </Text>
                    </View>

                    <Text style={styles.title}>Credits</Text>
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={styles.col}>Cart ID</Text>
                        <Text style={styles.colSmall}>Code</Text>
                        <Text style={styles.col}>Product</Text>
                        <Text style={styles.colSmall}>Quantity</Text>
                        <Text style={styles.colSmall}>Cost</Text>
                        <Text style={styles.colSmall}>Total</Text>
                        <Text style={styles.colSmall}>Profit</Text>
                        <Text style={styles.colSmall}>Margin</Text>
                    </View>

                    {/* Table Rows */}
                    {sortedCredit.map((item, idx) => (
                        <View style={styles.tableRow} key={idx}>
                            <Text style={styles.col}>{item.cart_id}</Text>
                            <Text style={styles.colSmall}>{item.code}</Text>
                            <Text style={styles.col}>{item?.product}</Text>
                            <Text style={styles.colSmall}>{item.quantity}</Text>
                            <Text style={styles.colSmall}>
                                {peso_value(item.cost)}
                            </Text>
                            <Text style={styles.colSmall}>
                                {peso_value(item.sales)}
                            </Text>
                            <Text style={styles.colSmall}>
                                {peso_value(item.profit)}
                            </Text>
                            <Text style={styles.colSmall}>{item.margin}</Text>
                            {/* <Text style={styles.colSmall}>
                                {item.cost.toLocaleString()}
                            </Text> */}
                            {/* <Text style={styles.colSmall}>
                                {item.sales.toLocaleString()}
                            </Text> */}
                            {/* <Text style={styles.colSmall}>
                                {item.profit.toLocaleString()}
                            </Text> */}
                            {/* <Text style={styles.colSmall}>{item.margin}</Text> */}
                        </View>
                    ))}

                    <View style={styles.summary}>
                        <Text>Total Cost: {peso_value(total_cost_credit)}</Text>
                        <Text>
                            Total Sales: {peso_value(total_sales_credit)}
                        </Text>
                        {/* <Text>
                            Total Discount: {peso_value(total_discount_credit)}
                        </Text> */}
                        <Text>
                            Total Profit:{" "}
                            {peso_value(total_sales_credit - total_cost_credit)}
                        </Text>
                    </View>

                    {/* <Text style={styles.title}>Expenses</Text>
                    <View style={styles.tableHeader}>
                        <Text style={styles.col}>Category</Text>
                        <Text style={styles.col}>Item</Text>
                        <Text style={styles.colSmall}>Quantity</Text>
                        <Text style={styles.colSmall}>Date</Text>
                        <Text style={styles.colSmall}>Total Cost</Text>
                    </View>

                    {sortedExpenses.map((item, idx) => (
                        <View style={styles.tableRow} key={idx}>
                            <Text style={styles.col}>{item.category}</Text>
                            <Text style={styles.col}>{item.item}</Text>
                            <Text style={styles.colSmall}>
                                {item.total_qty}
                            </Text>
                            <Text style={styles.col}>{item.date}</Text>
                            <Text style={styles.colSmall}>
                                {peso_value(item.total_cost)}
                            </Text>
                        </View>
                    ))}

                    <View style={styles.summary}>
                        <Text>
                            Total Expenses: {peso_value(total_expenses)}
                        </Text>
                    </View> */}

                    <Text style={[styles.summary_title, { marginTop: 40 }]}>
                        Summary
                    </Text>

                    <View style={styles.summary_all}>
                        <Text>
                            Total Overall Cost: {peso_value(total_summary_cost)}
                        </Text>
                        <Text>
                            Total Overall Sales:{" "}
                            {peso_value(total_summary_sales)}
                        </Text>
                        <Text>
                            Total Expenses: {peso_value(total_expenses)}
                        </Text>
                        <Text>
                            Total Overall Profit:{" "}
                            {peso_value(total_summary_profit)}
                        </Text>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
};

export default ProfitReportSection;
