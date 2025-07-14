import React from "react";
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

const ProfitReportSection = () => {
    const { reports } = useSelector((store) => store.carts);
    const params = new URLSearchParams(window.location.search);
    const initialStart = params.get("start");
    const initialEnd = params.get("end");

    const total_cost_store = reports?.data?.store?.reduce(
        (sum, item) => sum + Number(item.cost),
        0
    );
    const total_sales_store = reports?.data?.store?.reduce(
        (sum, item) => sum + Number(item.total),
        0
    );
    const total_profit_store = reports?.data?.store?.reduce(
        (sum, item) => sum + Number(item.profit),
        0
    );

    const total_cost_shopee = reports?.data?.shopee?.reduce(
        (sum, item) => sum + Number(item.cost),
        0
    );
    const total_sales_shopee = reports?.data?.shopee?.reduce(
        (sum, item) => sum + Number(item.total),
        0
    );
    const total_profit_shopee = reports?.data?.shopee?.reduce(
        (sum, item) => sum + Number(item.profit),
        0
    );

    const total_cost_credit = reports?.data?.credit?.reduce(
        (sum, item) => sum + Number(item.cost),
        0
    );
    const total_sales_credit = reports?.data?.credit?.reduce(
        (sum, item) => sum + Number(item.total),
        0
    );
    const total_profit_credit = reports?.data?.credit?.reduce(
        (sum, item) => sum + Number(item.profit),
        0
    );
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
                        <Text style={styles.colSmall}>Code</Text>
                        <Text style={styles.col}>Product</Text>
                        <Text style={styles.colSmall}>Quantity</Text>
                        <Text style={styles.colSmall}>Cost</Text>
                        <Text style={styles.colSmall}>Total</Text>
                        <Text style={styles.colSmall}>Profit</Text>
                        <Text style={styles.colSmall}>Margin</Text>
                    </View>

                    {/* Table Rows */}
                    {reports?.data?.store?.map((item, idx) => (
                        <View style={styles.tableRow} key={idx}>
                            <Text style={styles.colSmall}>{item.code}</Text>
                            <Text style={styles.col}>{item?.product}</Text>
                            <Text style={styles.colSmall}>{item.quantity}</Text>
                            <Text style={styles.colSmall}>
                                {peso_value(item.cost)}
                            </Text>
                            <Text style={styles.colSmall}>
                                {peso_value(item.total)}
                            </Text>
                            <Text style={styles.colSmall}>
                                {peso_value(item.profit)}
                            </Text>
                            <Text style={styles.colSmall}>{item.margin}</Text>
                            {/* <Text style={styles.colSmall}>
                                {item.cost.toLocaleString()}
                            </Text> */}
                            {/* <Text style={styles.colSmall}>
                                {item.total.toLocaleString()}
                            </Text> */}
                            {/* <Text style={styles.colSmall}>
                                {item.profit.toLocaleString()}
                            </Text> */}
                            {/* <Text style={styles.colSmall}>{item.margin}</Text> */}
                        </View>
                    ))}

                    <View style={styles.summary}>
                        <Text>Total Cost: {peso_value(total_cost_store)}</Text>
                        <Text>
                            Total Sales: {peso_value(total_sales_store)}
                        </Text>
                        <Text>
                            Total Profit: {peso_value(total_profit_store)}
                        </Text>
                    </View>
                    <Text style={styles.title}>Shopee</Text>
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={styles.colSmall}>Code</Text>
                        <Text style={styles.col}>Product</Text>
                        <Text style={styles.colSmall}>Quantity</Text>
                        <Text style={styles.colSmall}>Cost</Text>
                        <Text style={styles.colSmall}>Total</Text>
                        <Text style={styles.colSmall}>Profit</Text>
                        <Text style={styles.colSmall}>Margin</Text>
                    </View>

                    {/* Table Rows */}
                    {reports?.data?.shopee?.map((item, idx) => (
                        <View style={styles.tableRow} key={idx}>
                            <Text style={styles.colSmall}>{item.code}</Text>
                            <Text style={styles.col}>{item?.product}</Text>
                            <Text style={styles.colSmall}>{item.quantity}</Text>
                            <Text style={styles.colSmall}>
                                {peso_value(item.cost)}
                            </Text>
                            <Text style={styles.colSmall}>
                                {peso_value(item.total)}
                            </Text>
                            <Text style={styles.colSmall}>
                                {peso_value(item.profit)}
                            </Text>
                            <Text style={styles.colSmall}>{item.margin}</Text>
                            {/* <Text style={styles.colSmall}>
                                {item.cost.toLocaleString()}
                            </Text> */}
                            {/* <Text style={styles.colSmall}>
                                {item.total.toLocaleString()}
                            </Text> */}
                            {/* <Text style={styles.colSmall}>
                                {item.profit.toLocaleString()}
                            </Text> */}
                            {/* <Text style={styles.colSmall}>{item.margin}</Text> */}
                        </View>
                    ))}

                    <View style={styles.summary}>
                        <Text>Total Cost: {peso_value(total_cost_shopee)}</Text>
                        <Text>
                            Total Sales: {peso_value(total_sales_shopee)}
                        </Text>
                        <Text>
                            Total Profit: {peso_value(total_profit_shopee)}
                        </Text>
                    </View>

                    <Text style={styles.title}>Credits</Text>
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={styles.colSmall}>Code</Text>
                        <Text style={styles.col}>Product</Text>
                        <Text style={styles.colSmall}>Quantity</Text>
                        <Text style={styles.colSmall}>Cost</Text>
                        <Text style={styles.colSmall}>Total</Text>
                        <Text style={styles.colSmall}>Profit</Text>
                        <Text style={styles.colSmall}>Margin</Text>
                    </View>

                    {/* Table Rows */}
                    {reports?.data?.credit?.map((item, idx) => (
                        <View style={styles.tableRow} key={idx}>
                            <Text style={styles.colSmall}>{item.code}</Text>
                            <Text style={styles.col}>{item?.product}</Text>
                            <Text style={styles.colSmall}>{item.quantity}</Text>
                            <Text style={styles.colSmall}>
                                {peso_value(item.cost)}
                            </Text>
                            <Text style={styles.colSmall}>
                                {peso_value(item.total)}
                            </Text>
                            <Text style={styles.colSmall}>
                                {peso_value(item.profit)}
                            </Text>
                            <Text style={styles.colSmall}>{item.margin}</Text>
                            {/* <Text style={styles.colSmall}>
                                {item.cost.toLocaleString()}
                            </Text> */}
                            {/* <Text style={styles.colSmall}>
                                {item.total.toLocaleString()}
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
                        <Text>
                            Total Profit: {peso_value(total_profit_credit)}
                        </Text>
                    </View>
                    {/* Summary */}
                </Page>
            </Document>
        </PDFViewer>
    );
};

export default ProfitReportSection;
