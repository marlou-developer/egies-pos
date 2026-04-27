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
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f5f5f5",
            }}
        >
            <div
                style={{
                    textAlign: "center",
                    padding: 20,
                    backgroundColor: "white",
                    borderRadius: 8,
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
            >
                <div
                    style={{
                        border: "4px solid #f3f3f3",
                        borderTop: "4px solid #3498db",
                        borderRadius: "50%",
                        width: 40,
                        height: 40,
                        animation: "spin 1s linear infinite",
                        margin: "0 auto 16px",
                    }}
                ></div>
                <h3 style={{ margin: 0, color: "#333" }}>
                    Generating Report...
                </h3>
                <p style={{ margin: "8px 0 0", color: "#666" }}>
                    Please wait while we prepare your purchase invoice report
                </p>
            </div>
        </div>
    </>
);

const PurchaseInvoiceReportSection = () => {
    const { reports } = useSelector((store) => store.carts);
    const params = new URLSearchParams(window.location.search);
    const initialStart = params.get("start");
    const initialEnd = params.get("end");

    const total = reports?.data?.reduce(
        (sum, item) => sum + Number(item.total),
        0,
    );

    if (!reports?.data) {
        return loadingUI;
    }

    return (
        <BlobProvider
            document={
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.header}>
                            <Text style={styles.title}>PURCHASE INVOICES</Text>

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
                                        <Text style={{ width: 60 }}>
                                            Period:
                                        </Text>
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
                                        <Text style={{ width: 60 }}>
                                            Customer:
                                        </Text>
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
                                        <Text>
                                            {reports?.user?.name ?? "All"}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            marginBottom: 2,
                                        }}
                                    >
                                        <Text style={{ width: 60 }}>
                                            Product:
                                        </Text>
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
                                        <Text style={{ width: 60 }}>
                                            Address:
                                        </Text>
                                        <Text style={{ flex: 1 }}>
                                            Sacatel Bldg. V. Gustillo St. Brgy
                                            5, San Carlos City, Negros
                                            Occidental 6127 Philippines
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Table Header */}
                        <View style={styles.tableHeader}>
                            <Text style={styles.colSmall}>#</Text>
                            <Text style={styles.col}>Supplier</Text>
                            <Text style={styles.colSmall}>Purchase Number</Text>
                            <Text style={styles.colSmall}>
                                External Documents
                            </Text>
                            <Text style={styles.colSmall}>Date</Text>
                            <Text style={styles.colSmall}>Total</Text>
                        </View>

                        {/* Table Rows */}

                        {reports?.data?.map((item, idx) => (
                            <View style={styles.tableRow} key={idx}>
                                <Text style={styles.colSmall}>{item?.id}</Text>
                                <Text style={styles.col}>
                                    {item?.supplier_name}
                                </Text>
                                <Text style={styles.colSmall}>
                                    {item.delivery_receipt_no}
                                </Text>
                                <Text style={styles.colSmall}>
                                    {item?.none}
                                </Text>
                                <Text style={styles.colSmall}>
                                    {moment(item.date).format("LL")}
                                </Text>

                                <Text style={styles.colSmall}>
                                    {peso_value(item?.cost)}
                                </Text>
                            </View>
                        ))}

                        {/* Summary */}
                        <View style={styles.summary}>
                            {/* <Text>Total Cost: 42,048.60</Text> */}
                            <Text> Total: {peso_value(total)}</Text>
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
                        style={{
                            width: "100%",
                            height: "100vh",
                            border: "none",
                        }}
                    />
                );
            }}
        </BlobProvider>
    );
};

export default PurchaseInvoiceReportSection;
