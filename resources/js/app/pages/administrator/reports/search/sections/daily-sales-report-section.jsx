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
import moment from "moment";
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
    loadingContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    loadingContent: {
        textAlign: "center",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    spinner: {
        border: "4px solid #f3f3f3",
        borderTop: "4px solid #3498db",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        animation: "spin 1s linear infinite",
        margin: "0 auto 10px auto",
    },
});

const DailySalesReportSection = () => {
    const { reports } = useSelector((store) => store.carts);
    const params = new URLSearchParams(window.location.search);
    const initialStart = params.get("start");
    const initialEnd = params.get("end");

    const [isLoading, setIsLoading] = useState(true);
    const [pdfReady, setPdfReady] = useState(false);

    // Set initial loading state based on reports availability
    useEffect(() => {
        if (!reports) {
            setIsLoading(true);
            setPdfReady(false);
        }
    }, []);

    const total_sales = reports?.data?.reduce(
        (sum, item) => sum + Number(item.total_sales),
        0,
    );

    // Handle loading state
    useEffect(() => {
        if (reports?.data && reports.data.length > 0) {
            // Show loading initially
            setIsLoading(true);

            // Simulate PDF rendering time - you can adjust this based on your needs
            const timer = setTimeout(() => {
                setIsLoading(false);
                setPdfReady(true);
            }, 1500); // 1.5 seconds to allow PDF to render

            return () => clearTimeout(timer);
        } else if (reports?.data) {
            // If no data but reports object exists, show immediately
            setIsLoading(false);
            setPdfReady(true);
        }
    }, [reports]);

    console.log("reportsreports", reports.data);

    // Inline styles for spinner animation
    const spinnerKeyframes = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    // Add keyframes to document if not already added
    React.useEffect(() => {
        const styleElement = document.createElement("style");
        styleElement.type = "text/css";
        styleElement.innerHTML = spinnerKeyframes;
        document.getElementsByTagName("head")[0].appendChild(styleElement);

        return () => {
            // Cleanup: remove the style element when component unmounts
            const existingStyle = document.querySelector(
                'style[data-spinner="true"]',
            );
            if (existingStyle) {
                existingStyle.remove();
            }
        };
    }, []);

    return (
        <div style={{ position: "relative" }}>
            {/* Loading Overlay */}
            {isLoading && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            textAlign: "center",
                            padding: "20px",
                            backgroundColor: "white",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <div
                            style={{
                                border: "4px solid #f3f3f3",
                                borderTop: "4px solid #3498db",
                                borderRadius: "50%",
                                width: "40px",
                                height: "40px",
                                animation: "spin 1s linear infinite",
                                margin: "0 auto 10px auto",
                            }}
                        ></div>
                        <p style={{ margin: 0, color: "#666" }}>
                            Generating Daily Sales report...
                            {/* {reports?.data?.length > 0 && ` (${reports.data.length} records)`} */}
                        </p>
                    </div>
                </div>
            )}

            {/* PDF Viewer */}
            <PDFViewer
                style={{
                    width: "100%",
                    height: "100vh",
                    opacity: isLoading ? 0.3 : 1,
                }}
            >
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.header}>
                            <Text style={styles.title}>DAILY SALES</Text>

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
                            <Text style={styles.colSmall}>Customer</Text>
                            <Text style={styles.colSmall}>Product ID</Text>
                            <Text style={styles.colSmall}>Product</Text>
                            <Text style={styles.colSmall}>Quantity</Text>
                            <Text style={styles.colSmall}>Total</Text>
                            <Text style={styles.colSmall}>Date</Text>
                        </View>

                        {/* Table Rows */}
                        {reports?.data?.map((item, idx) => {
                            return (
                                <View key={idx}>
                                    <View>
                                        {item?.carts.length != 0 &&
                                            item?.carts?.map((res, i) => {
                                                return (
                                                    <View key={i}>
                                                        {res.cart_items
                                                            .length != 0 &&
                                                            res.cart_items.map(
                                                                (result) => {
                                                                    console.log(
                                                                        "waaassssss",
                                                                        res
                                                                            ?.customer
                                                                            ?.name ??
                                                                            "Walk-in",
                                                                    );
                                                                    return (
                                                                        <View
                                                                            style={
                                                                                styles.tableRow
                                                                            }
                                                                            key={
                                                                                idx
                                                                            }
                                                                        >
                                                                            <Text
                                                                                style={
                                                                                    styles.colSmall
                                                                                }
                                                                            >
                                                                                {res
                                                                                    ?.customer
                                                                                    ?.name ??
                                                                                    "Walk-in"}
                                                                            </Text>
                                                                            <Text
                                                                                style={
                                                                                    styles.colSmall
                                                                                }
                                                                            >
                                                                                {
                                                                                    result
                                                                                        ?.product
                                                                                        .id
                                                                                }
                                                                            </Text>
                                                                            <Text
                                                                                style={
                                                                                    styles.colSmall
                                                                                }
                                                                            >
                                                                                {
                                                                                    result
                                                                                        ?.product
                                                                                        .name
                                                                                }
                                                                            </Text>
                                                                            <Text
                                                                                style={
                                                                                    styles.colSmall
                                                                                }
                                                                            >
                                                                                {
                                                                                    result?.quantity
                                                                                }
                                                                            </Text>
                                                                            <Text
                                                                                style={
                                                                                    styles.colSmall
                                                                                }
                                                                            >
                                                                                {peso_value(
                                                                                    result?.total,
                                                                                )}
                                                                            </Text>
                                                                            <Text
                                                                                style={
                                                                                    styles.colSmall
                                                                                }
                                                                            >
                                                                                {moment(
                                                                                    result.created_at,
                                                                                ).format(
                                                                                    "LLL",
                                                                                )}
                                                                            </Text>
                                                                        </View>
                                                                    );
                                                                },
                                                            )}
                                                    </View>
                                                );
                                            })}
                                    </View>
                                    <View
                                        style={{
                                            ...styles.tableRow,
                                            backgroundColor: "black",
                                            color: "white",
                                        }}
                                        key={idx}
                                    >
                                        <Text style={styles.colSmall}>
                                            {moment(item.date).format("LL")}
                                        </Text>
                                        <Text style={styles.colSmall}>
                                            &nbsp;
                                        </Text>
                                        <Text style={styles.colSmall}>
                                            &nbsp;
                                        </Text>
                                        <Text style={styles.colSmall}>
                                            Total:{" "}
                                            {peso_value(item.total_sales)}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}

                        {/* Summary */}
                        <View style={styles.summary}>
                            {/* <Text>Total Cost: 42,048.60</Text> */}
                            <Text>Total Sales:{peso_value(total_sales)}</Text>
                            {/* <Text>Total Profit: 10,830.40</Text> */}
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
};

export default DailySalesReportSection;
