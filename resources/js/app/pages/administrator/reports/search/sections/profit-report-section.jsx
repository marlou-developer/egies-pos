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

const ROWS_PER_PAGE = 40;

const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
};

const TableHeader = () => (
    <View style={styles.tableHeader}>
        <Text style={styles.col}>Invoice No.</Text>
        <Text style={styles.colSmall}>Code</Text>
        <Text style={styles.col}>Product</Text>
        <Text style={styles.colSmall}>Quantity</Text>
        <Text style={styles.colSmall}>Cost</Text>
        <Text style={styles.colSmall}>Total</Text>
        <Text style={styles.colSmall}>Profit</Text>
        <Text style={styles.colSmall}>Margin</Text>
    </View>
);

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
        <div style={styles.loadingContainer}>
            <div style={styles.loadingContent}>
                <div style={styles.spinner}></div>
                <h3 style={{ margin: 0, color: "#333" }}>
                    Generating Report...
                </h3>
                <p style={{ margin: "8px 0 0", color: "#666" }}>
                    Please wait while we prepare your profit & margin report
                </p>
            </div>
        </div>
    </>
);

const ProfitReportSection = () => {
    const { reports } = useSelector((store) => store.carts);
    const params = new URLSearchParams(window.location.search);
    const initialStart = params.get("start");
    const initialEnd = params.get("end");

    console.log("reportsss", reports);

    const total_cost_store = reports?.data?.store?.reduce(
        (sum, item) => sum + Number(item.cost),
        0,
    ) ?? 0;
    const total_sales_store = reports?.data?.store?.reduce(
        (sum, item) => sum + Number(item.sales),
        0,
    ) ?? 0;

    const total_cost_shopee_bip = reports?.data?.shopee_bip?.reduce(
        (sum, item) => sum + Number(item.cost),
        0,
    ) ?? 0;
    const total_sales_shopee_bip = reports?.data?.shopee_bip?.reduce(
        (sum, item) => sum + Number(item.sales),
        0,
    ) ?? 0;

    const total_cost_shopee_ygd = reports?.data?.shopee_ygd?.reduce(
        (sum, item) => sum + Number(item.cost),
        0,
    ) ?? 0;
    const total_sales_shopee_ygd = reports?.data?.shopee_ygd?.reduce(
        (sum, item) => sum + Number(item.sales),
        0,
    ) ?? 0;

    const total_expenses = reports?.data?.expenses?.reduce(
        (sum, item) => sum + Number(item.total_cost),
        0,
    ) ?? 0;

    const total_cost_credit = reports?.data?.credit?.reduce(
        (sum, item) => sum + Number(item.cost),
        0,
    ) ?? 0;
    const total_sales_credit = reports?.data?.credit?.reduce(
        (sum, item) => sum + Number(item.sales),
        0,
    ) ?? 0;

    const total_summary_cost =
        Number(total_cost_store) +
        Number(total_cost_shopee_bip) +
        Number(total_cost_shopee_ygd) +
        Number(total_cost_credit);

    const total_summary_sales =
        Number(total_sales_store) +
        Number(total_sales_shopee_bip) +
        Number(total_sales_shopee_ygd) +
        Number(total_sales_credit);

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

    // Chunk into pages to avoid RangeError with large datasets
    const storeChunks = chunkArray(sortedStore, ROWS_PER_PAGE);
    const shopeeBipChunks = chunkArray(sortedShopeeBip, ROWS_PER_PAGE);
    const shopeeYgdChunks = chunkArray(sortedShopeeYgd, ROWS_PER_PAGE);
    const creditChunks = chunkArray(sortedCredit, ROWS_PER_PAGE);

    if (!reports?.data) {
        return loadingUI;
    }

    return (
        <BlobProvider
            document={
                <Document>
                    {/* Store section — one Page per chunk */}
                    {storeChunks.map(
                        (chunk, pageIdx) => (
                            <Page
                                key={`store-${pageIdx}`}
                                orientation="landscape"
                                size="A4"
                                style={styles.page}
                            >
                                {/* Report header only on the very first page */}
                                {pageIdx === 0 && (
                                    <View style={styles.header}>
                                        <Text style={styles.title}>
                                            Profit and Margin
                                        </Text>
                                        <View
                                            style={{
                                                width: "100%",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                marginBottom: 10,
                                            }}
                                        >
                                            <View style={{ flex: 1 }}>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        marginBottom: 2,
                                                    }}
                                                >
                                                    <Text
                                                        style={{ width: 60 }}
                                                    >
                                                        Period:
                                                    </Text>
                                                    <Text>
                                                        {initialStart} -{" "}
                                                        {initialEnd}
                                                    </Text>
                                                </View>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        marginBottom: 2,
                                                    }}
                                                >
                                                    <Text
                                                        style={{ width: 60 }}
                                                    >
                                                        Customer:
                                                    </Text>
                                                    <Text>
                                                        {reports?.customer
                                                            ?.name ?? "All"}
                                                    </Text>
                                                </View>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        marginBottom: 2,
                                                    }}
                                                >
                                                    <Text
                                                        style={{ width: 60 }}
                                                    >
                                                        User:
                                                    </Text>
                                                    <Text>
                                                        {reports?.user?.name ??
                                                            "All"}
                                                    </Text>
                                                </View>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        marginBottom: 2,
                                                    }}
                                                >
                                                    <Text
                                                        style={{ width: 60 }}
                                                    >
                                                        Product:
                                                    </Text>
                                                    <Text>
                                                        {reports?.product
                                                            ?.name ?? "All"}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View
                                                style={{
                                                    flex: 1,
                                                    textAlign: "left",
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        justifyContent:
                                                            "flex-start",
                                                        marginBottom: 2,
                                                    }}
                                                >
                                                    <Text
                                                        style={{ width: 60 }}
                                                    >
                                                        Company: &emsp;{" "}
                                                    </Text>
                                                    <Text>
                                                        Egie's Beauty Boutique
                                                    </Text>
                                                </View>
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        justifyContent:
                                                            "flex-start",
                                                    }}
                                                >
                                                    <Text
                                                        style={{ width: 53 }}
                                                    >
                                                        Address:&emsp;{" "}
                                                    </Text>
                                                    <Text>
                                                        Rizal Street Brgy V,
                                                        6127 San Carlos City
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )}

                                <Text style={styles.title}>
                                    Store
                                    {storeChunks.length > 1
                                        ? ` (${pageIdx + 1}/${storeChunks.length})`
                                        : ""}
                                </Text>
                                <TableHeader />
                                {chunk.map((item, idx) => (
                                    <View style={styles.tableRow} key={idx}>
                                        <Text style={styles.col}>
                                            {item.cart_id}
                                        </Text>
                                        <Text style={styles.colSmall}>
                                            {item.code}
                                        </Text>
                                        <Text style={styles.col}>
                                            {item?.product}
                                        </Text>
                                        <Text style={styles.colSmall}>
                                            {item.quantity}
                                        </Text>
                                        <Text style={styles.colSmall}>
                                            {peso_value(item.cost)}
                                        </Text>
                                        <Text style={styles.colSmall}>
                                            {peso_value(item.sales)}
                                        </Text>
                                        <Text style={styles.colSmall}>
                                            {peso_value(item.profit)}
                                        </Text>
                                        <Text style={styles.colSmall}>
                                            {item.margin}
                                        </Text>
                                    </View>
                                ))}
                                {/* Section totals on the last chunk only */}
                                {pageIdx === storeChunks.length - 1 && (
                                    <View style={styles.summary}>
                                        <Text>
                                            Total Cost:{" "}
                                            {peso_value(total_cost_store)}
                                        </Text>
                                        <Text>
                                            Total Sales:{" "}
                                            {peso_value(total_sales_store)}
                                        </Text>
                                        <Text>
                                            Total Profit:{" "}
                                            {peso_value(
                                                total_sales_store -
                                                    total_cost_store,
                                            )}
                                        </Text>
                                    </View>
                                )}
                            </Page>
                        ),
                    )}

                    {/* Shopee — Beauty In Pink section */}
                    {(shopeeBipChunks.length > 0 ? shopeeBipChunks : [[]]).map(
                        (chunk, pageIdx) => {
                            console.log("chunkkkbip", chunk);
                            return (
                            <Page
                                key={`bip-${pageIdx}`}
                                orientation="landscape"
                                size="A4"
                                style={styles.page}
                            >
                                <Text style={styles.title}>
                                    Shopee — Beauty In Pink
                                    {shopeeBipChunks.length > 1
                                        ? ` (${pageIdx + 1}/${shopeeBipChunks.length})`
                                        : ""}
                                </Text>
                                <TableHeader />
                                {chunk.map((item, idx) => (
                                    <View style={styles.tableRow} key={idx}>
                                        <Text style={styles.col}>
                                            {item.cart_id}
                                        </Text>
                                        <Text style={styles.colSmall}>
                                            {item.code}
                                        </Text>
                                        <Text style={styles.col}>
                                            {item?.product}
                                        </Text>
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
                                ))}
                                {pageIdx === shopeeBipChunks.length - 1 && (
                                    <View style={styles.summary}>
                                        <Text>
                                            Total Cost:{" "}
                                            {peso_value(total_cost_shopee_bip)}
                                        </Text>
                                        <Text>
                                            Total Sales:{" "}
                                            {peso_value(total_sales_shopee_bip)}
                                        </Text>
                                        <Text>
                                            Total Profit:{" "}
                                            {peso_value(
                                                total_sales_shopee_bip -
                                                    total_cost_shopee_bip,
                                            )}
                                        </Text>
                                    </View>
                                )}
                            </Page>
                        );
                        },
                    )}

                    {/* Shopee — You Glow Darling PH section */}
                    {(shopeeYgdChunks.length > 0 ? shopeeYgdChunks : [[]]).map(
                        (chunk, pageIdx) => (
                            <Page
                                key={`ygd-${pageIdx}`}
                                orientation="landscape"
                                size="A4"
                                style={styles.page}
                            >
                                <Text style={styles.title}>
                                    Shopee — You Glow Darling PH
                                    {shopeeYgdChunks.length > 1
                                        ? ` (${pageIdx + 1}/${shopeeYgdChunks.length})`
                                        : ""}
                                </Text>
                                <TableHeader />
                                {chunk.map((item, idx) => (
                                    <View style={styles.tableRow} key={idx}>
                                        <Text style={styles.col}>
                                            {item.cart_id}
                                        </Text>
                                        <Text style={styles.colSmall}>
                                            {item.code}
                                        </Text>
                                        <Text style={styles.col}>
                                            {item?.product}
                                        </Text>
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
                                ))}
                                {pageIdx === shopeeYgdChunks.length - 1 && (
                                    <View style={styles.summary}>
                                        <Text>
                                            Total Cost:{" "}
                                            {peso_value(total_cost_shopee_ygd)}
                                        </Text>
                                        <Text>
                                            Total Sales:{" "}
                                            {peso_value(total_sales_shopee_ygd)}
                                        </Text>
                                        <Text>
                                            Total Profit:{" "}
                                            {peso_value(
                                                total_sales_shopee_ygd -
                                                    total_cost_shopee_ygd,
                                            )}
                                        </Text>
                                    </View>
                                )}
                            </Page>
                        ),
                    )}

                    {/* Credits section */}
                    {creditChunks.map(
                        (chunk, pageIdx) => (
                            <Page
                                key={`credit-${pageIdx}`}
                                orientation="landscape"
                                size="A4"
                                style={styles.page}
                            >
                                <Text style={styles.title}>
                                    Credits
                                    {creditChunks.length > 1
                                        ? ` (${pageIdx + 1}/${creditChunks.length})`
                                        : ""}
                                </Text>
                                <TableHeader />
                                {chunk.map((item, idx) => (
                                    <View style={styles.tableRow} key={idx}>
                                        <Text style={styles.col}>
                                            {item.cart_id}
                                        </Text>
                                        <Text style={styles.colSmall}>
                                            {item.code}
                                        </Text>
                                        <Text style={styles.col}>
                                            {item?.product}
                                        </Text>
                                        <Text style={styles.colSmall}>
                                            {item.quantity}
                                        </Text>
                                        <Text style={styles.colSmall}>
                                            {peso_value(item.cost)}
                                        </Text>
                                        <Text style={styles.colSmall}>
                                            {peso_value(item.sales)}
                                        </Text>
                                        <Text style={styles.colSmall}>
                                            {peso_value(item.profit)}
                                        </Text>
                                        <Text style={styles.colSmall}>
                                            {item.margin}
                                        </Text>
                                    </View>
                                ))}
                                {pageIdx === creditChunks.length - 1 && (
                                    <View style={styles.summary}>
                                        <Text>
                                            Total Cost:{" "}
                                            {peso_value(total_cost_credit)}
                                        </Text>
                                        <Text>
                                            Total Sales:{" "}
                                            {peso_value(total_sales_credit)}
                                        </Text>
                                        <Text>
                                            Total Profit:{" "}
                                            {peso_value(
                                                total_sales_credit -
                                                    total_cost_credit,
                                            )}
                                        </Text>
                                    </View>
                                )}
                            </Page>
                        ),
                    )}

                    {/* Summary page */}
                    <Page orientation="landscape" size="A4" style={styles.page}>
                        <Text
                            style={[styles.summary_title, { marginTop: 40 }]}
                        >
                            Summary
                        </Text>
                        <View style={styles.summary_all}>
                            <Text>
                                Total Overall Cost:{" "}
                                {peso_value(total_summary_cost)}
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

export default ProfitReportSection;
