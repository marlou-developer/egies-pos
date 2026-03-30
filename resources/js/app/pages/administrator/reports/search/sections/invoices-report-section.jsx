import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    BlobProvider,
    Font,
} from "@react-pdf/renderer";
import { useSelector } from "react-redux";
import { peso_value } from "@/app/lib/peso";
import moment from "moment";

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
});

const loadingUI = (
    <>
        <style>
            {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}
        </style>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f5f5f5" }}>
            <div style={{ textAlign: "center", padding: 20, backgroundColor: "white", borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
                <div style={{ border: "4px solid #f3f3f3", borderTop: "4px solid #3498db", borderRadius: "50%", width: 40, height: 40, animation: "spin 1s linear infinite", margin: "0 auto 16px" }}></div>
                <h3 style={{ margin: 0, color: "#333" }}>Generating Report...</h3>
                <p style={{ margin: "8px 0 0", color: "#666" }}>Please wait while we prepare your invoice report</p>
            </div>
        </div>
    </>
);

const InvoiceReportSection = () => {
    const { reports } = useSelector((store) => store.carts);
    const params = new URLSearchParams(window.location.search);
    const initialStart = params.get("start");
    const initialEnd = params.get("end");

    const totalFixedPrice = reports?.data?.reduce((cartSum, cart) => {
        const cartTotal = cart.cart_items?.reduce((itemSum, item) => {
            if (item.fixed_price) {
                const price = parseFloat(item.fixed_price);
                const qty = parseInt(item.quantity);
                return itemSum + price * qty;
            }
            return itemSum;
        }, 0);
        return cartSum + cartTotal;
    }, 0);

    if (!reports?.data) {
        return loadingUI;
    }

    return (
        <BlobProvider
            document={
            <Document>
                <Page orientation="landscape" size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Text style={styles.title}>INVOICES</Text>

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

                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={styles.colSmall}>#</Text>
                        <Text style={styles.colSmall}>Date</Text>
                        <Text style={styles.colSmall}>Documents #</Text>
                        <Text style={styles.colSmall}>Customer</Text>
                        <Text style={styles.colSmall}>Shop</Text>
                        <Text style={styles.colSmall}>Shopee Store</Text>
                        <Text style={styles.colSmall}>Items Count</Text>
                        <Text style={styles.colSmall}>Quantity</Text>
                        <Text style={styles.colSmall}>Total</Text>
                    </View>

                    {/* Table Rows */}
                    {reports?.data?.map((item, idx) => {
                        const sum_quantity = item?.cart_items?.reduce(
                            (sum, item) => sum + Number(item.quantity),
                            0,
                        );
                        const sum_total = item?.cart_items?.reduce(
                            (sum, item) =>
                                sum + Number(item.fixed_price) * item.quantity,
                            0,
                        );
                        console.log("itemitemitem", item);
                        return (
                            <View style={styles.tableRow} key={idx}>
                                <Text style={styles.colSmall}>{idx + 1}</Text>
                                <Text style={styles.colSmall}>
                                    {moment(item?.created_at).format("LLL")}
                                </Text>
                                <Text style={styles.colSmall}>
                                    {item.cart_id}
                                </Text>
                                <Text style={styles.colSmall}>
                                    {item?.customer?.name ?? "Walk-In Customer"}
                                </Text>
                                <Text style={styles.colSmall}>
                                    {item?.shop ?? ""}
                                </Text>
                                <Text style={styles.colSmall}>
                                    {item?.shopee_store ?? "N/A"}
                                </Text>
                                <Text style={styles.colSmall}>
                                    {item?.cart_items.length}
                                </Text>
                                <Text style={styles.colSmall}>
                                    {sum_quantity}
                                </Text>
                                <Text style={styles.colSmall}>
                                    {peso_value(sum_total)}
                                </Text>
                            </View>
                        );
                    })}

                    {/* Summary */}
                    <View style={styles.summary}>
                        {/* <Text>Total Cost: 42,048.60</Text> */}
                        <Text> Total: {peso_value(totalFixedPrice)}</Text>
                        {/* <Text>Total Profit: 10,830.40</Text> */}
                    </View>
                </Page>
            </Document>
            }
        >
            {({ url, loading }) => {
                if (loading) return loadingUI;
                return (
                    <iframe
                        src={url}
                        style={{ width: "100%", height: "100vh", border: "none" }}
                    />
                );
            }}
        </BlobProvider>
    );
};

export default InvoiceReportSection;
