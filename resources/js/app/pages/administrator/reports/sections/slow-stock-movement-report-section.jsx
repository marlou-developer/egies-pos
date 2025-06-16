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

const data = [
    {
        code: "1",
        product: "Perfect Skin Rejuvenating Set",
        qty: 12,
        cost: 1500,
        total: 1850,
        profit: 350,
        margin: "18.92%",
    },
    {
        code: "123",
        product: "Dr. Alvin Rejuvenating Set",
        qty: 2,
        cost: 155,
        total: 300,
        profit: 145,
        margin: "48.33%",
    },
    {
        code: "144",
        product: "Hikari Ultra",
        qty: 20,
        cost: 4500,
        total: 5700,
        profit: 1200,
        margin: "21.06%",
    },
    {
        code: "224",
        product: "Perfect Skin Flawless White Egg",
        qty: 20,
        cost: 2068.6,
        total: 2600,
        profit: 531.4,
        margin: "20.44%",
    },
    {
        code: "234",
        product: "Perfect Skin Big Toner",
        qty: 5,
        cost: 330,
        total: 600,
        profit: 270,
        margin: "45.00%",
    },
    {
        code: "235",
        product: "Habibi Babad Soap",
        qty: 50,
        cost: 4000,
        total: 6000,
        profit: 2000,
        margin: "33.33%",
    },
    {
        code: "320",
        product: "Pinky Secret",
        qty: 10,
        cost: 500,
        total: 1000,
        profit: 500,
        margin: "50.00%",
    },
    {
        code: "329",
        product: "Ashley Hair Serum",
        qty: 35,
        cost: 3360,
        total: 4200,
        profit: 840,
        margin: "20.00%",
    },
    {
        code: "334",
        product: "KiffyFied Feminine Wash",
        qty: 30,
        cost: 2400,
        total: 4275,
        profit: 1875,
        margin: "43.90%",
    },
    {
        code: "337",
        product: "Beauty White Soap",
        qty: 170,
        cost: 16150,
        total: 18640,
        profit: 2490,
        margin: "13.36%",
    },
    {
        code: "346",
        product: "Hikari SB 50g",
        qty: 50,
        cost: 6000,
        total: 6500,
        profit: 500,
        margin: "7.69%",
    },
];

const SlowStockMovementReportSection = () => {
    const { reports } = useSelector((store) => store.carts);
    const params = new URLSearchParams(window.location.search);
    const initialStart = params.get("start");
    const initialEnd = params.get("end");

    const total_sales = reports.reduce(
        (sum, item) => sum + Number(item.total_sales),
        0
    );
      const total_sold = reports.reduce(
        (sum, item) => sum + Number(item.total_sold),
        0
    );
    return (
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Text style={styles.title}>SLOW STOCK MOVEMENT</Text>

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
                                    <Text>4/13/2025 - 4/13/2025</Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginBottom: 2,
                                    }}
                                >
                                    <Text style={{ width: 60 }}>Customer:</Text>
                                    <Text>All</Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginBottom: 2,
                                    }}
                                >
                                    <Text style={{ width: 60 }}>User:</Text>
                                    <Text>All</Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginBottom: 2,
                                    }}
                                >
                                    <Text style={{ width: 60 }}>Product:</Text>
                                    <Text>All</Text>
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
                        <Text>#</Text>
                        <Text style={styles.colSmall}>Products</Text>
                        {/* <Text style={styles.col}>Fast Moving</Text> */}
                        <Text style={styles.colSmall}>Number of Sold</Text>
                        <Text style={styles.colSmall}>Number of Sales</Text>
                    </View>

                    {/* Table Rows */}
                    {reports.map((item, idx) => (
                        <View style={styles.tableRow} key={idx}>
                            <Text>{idx+1}.</Text>
                            <Text style={styles.colSmall}>{item.product_name}</Text>
                            <Text style={styles.colSmall}>{item.total_sold} (quantity)</Text>
                            <Text style={styles.colSmall}>{peso_value(item.total_sales)}</Text>
                        </View>
                    ))}

                    {/* Summary */}
                    <View style={styles.summary}>
                        {/* <Text>Total Cost: 42,048.60</Text> */}
                        <Text>Total Sales: {peso_value(total_sold)}</Text>
                        <Text>Total Sold: {total_sold}</Text>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
};

export default SlowStockMovementReportSection;
