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

const SalesByCustomerReportSection = () => {
    const { reports } = useSelector((store) => store.carts);
    const params = new URLSearchParams(window.location.search);
    const initialStart = params.get("start");
    const initialEnd = params.get("end");

    const total_sales = reports?.data?.reduce(
        (sum, item) => sum + Number(item.total_sales),
        0
    );

    return (
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Text style={styles.title}>SALES BY CUSTOMER</Text>

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
                        <Text style={styles.colSmall}>Customer</Text>
                        <Text style={styles.colSmall}>Total Before Tax</Text>
                        <Text style={styles.colSmall}>Total</Text>
                    </View>

                    {/* Table Rows */}
                    {reports?.data?.map((item, idx) => (
                        <View style={styles.tableRow} key={idx}>
                            <Text style={styles.colSmall}>
                                {item.customer_name}
                            </Text>
                            <Text style={styles.colSmall}>
                                {peso_value(item.total_sales)}
                            </Text>
                            <Text style={styles.colSmall}>
                                {peso_value(item.total_sales)}
                            </Text>
                        </View>
                    ))}

                    {/* Summary */}
                    <View style={styles.summary}>
                        {/* <Text>Total Cost: 42,048.60</Text> */}
                        <Text>Total Sales: {peso_value(total_sales)}</Text>
                        {/* <Text>Total Profit: 10,830.40</Text> */}
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
};

export default SalesByCustomerReportSection;
