import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    PDFViewer,
    Image,
} from "@react-pdf/renderer";
import Modal from "@/app/_components/modal";
import moment from "moment";
import { peso_value } from "@/app/lib/peso";
import { FaPrint } from "react-icons/fa6";

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 10,
        fontFamily: "Helvetica",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    logo: {
        width: "60%",
        height: "100px",
    },
    companyInfo: {
        textAlign: "right",
    },
    invoiceTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    section: {
        marginBottom: 10,
    },
    tableHeader: {
        flexDirection: "row",
        borderBottomWidth: 1,
        backgroundColor: "#f0f0f0",
        padding: 5,
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        padding: 5,
    },
    tableCol: {
        flex: 1,
        paddingHorizontal: 2,
    },
    notes: {
        marginTop: 20,
        fontStyle: "italic",
    },
    totalSection: {
        marginTop: 10,
        alignItems: "flex-end",
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    bold: {
        fontWeight: "bold",
    },
});
export default function PrintSection() {
    const [isOpen, setIsOpen] = useState(false);
    const { products, selectedStocks } = useSelector(
        (state) => state.products
    ) || {
        products: { data: [], total: 0, last_page: 1 },
    };

    return (
        <>
            {selectedStocks.length != 0 && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 bg-pink-700 rounded-lg flex hover:bg-pink-600 text-white"
                >
                    {selectedStocks.length} &nbsp;<FaPrint className="mr-1"/> PRINT
                </button>
            )}

            <Modal
                width="max-w-7xl"
                isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="p-3">
                    <PDFViewer style={{ width: "100%", height: "85vh" }}>
                        <Document>
                            <Page size="A4" style={styles.page}>
                                {/* Header */}
                                <View style={styles.header}>
                                    <Image
                                        src="/images/logo.png"
                                        style={styles.logo}
                                    />
                                    <View style={styles.companyInfo}>
                                        <Text style={styles.invoiceTitle}>
                                            STOCKS REPORT
                                        </Text>
                                        {/* <Text># INVOICE-{cart_id}</Text> */}
                                    </View>
                                </View>

                                {/* Company Info */}
                                <View style={styles.section}>
                                    <Text style={styles.bold}>
                                        Egie’s Beauty Boutique
                                    </Text>
                                    <Text>Rizal Street</Text>
                                    <Text>
                                        San Carlos City, Negros Occidental 6127
                                    </Text>
                                    <Text>Philippines</Text>
                                </View>

                                {/* Billing Info */}
                                <View style={styles.section}>
                                    {/* <Text>
                                            Bill To:{" "}
                                            <Text style={styles.bold}>
                                                {cart?.data?.customer?.name}
                                            </Text>
                                        </Text>
                                        <Text>Invoice Date: {moment().format("LLL")}</Text> */}
                                    {/* <Text>Terms: Net 15</Text> */}
                                    <Text>Date: {moment().format("LL")}</Text>
                                </View>

                                {/* Table Header */}
                                <View style={styles.tableHeader}>
                                    <Text
                                        style={[styles.tableCol, { flex: 1 }]}
                                    >
                                        Product
                                    </Text>
                                    <Text style={styles.tableCol}>Stocks</Text>
                                    <Text
                                        style={[styles.tableCol, { flex: 1 }]}
                                    >
                                        Status
                                    </Text>
                                    <Text
                                        style={[styles.tableCol, { flex: 1 }]}
                                    >
                                        Date last stock(s) added
                                    </Text>
                                    <Text
                                        style={[styles.tableCol, { flex: 1 }]}
                                    >
                                        Total Inventory Retail Price
                                    </Text>
                                    <Text
                                        style={[styles.tableCol, { flex: 1 }]}
                                    >
                                        Total Inventory Capital
                                    </Text>
                                </View>

                                {/* Table Rows */}
                                {selectedStocks?.map((item, index) => {
                                    return (
                                        <View
                                            style={styles.tableRow}
                                            key={index}
                                        >
                                            <Text
                                                style={[
                                                    styles.tableCol,
                                                    { flex: 1 },
                                                ]}
                                            >
                                                {item.name}
                                            </Text>
                                            <Text style={styles.tableCol}>
                                                {item.quantity}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.tableCol,
                                                    { flex: 1 },
                                                ]}
                                            >
                                                {item.quantity == 0
                                                    ? "Out of Stock"
                                                    : item.quantity <= 10
                                                        ? "Low Stock"
                                                        : "In Stock"}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.tableCol,
                                                    { flex: 1 },
                                                ]}
                                            >
                                                {item.stocks?.length > 0
                                                    ? new Date(
                                                        [...item.stocks].sort(
                                                            (a, b) =>
                                                                new Date(
                                                                    b.date
                                                                ) -
                                                                new Date(
                                                                    a.date
                                                                )
                                                        )[0].date
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                        }
                                                    )
                                                    : "No Stocks Added"}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.tableCol,
                                                    { flex: 1 },
                                                ]}
                                            >
                                                {peso_value(
                                                    Number(item.quantity) *
                                                    Number(item.srp)
                                                )}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.tableCol,
                                                    { flex: 1 },
                                                ]}
                                            >
                                                {peso_value(
                                                    Number(item.quantity) *
                                                    Number(item.cost)
                                                )}
                                            </Text>
                                        </View>
                                    );
                                })}

                                {/* Totals */}
                                <View style={styles.totalSection}>
                                    {/* <View style={styles.totalRow}>
                                            <Text>Payment Status: {cart.data?.status}</Text>
                                        </View>
                                        <View style={styles.totalRow}>
                                            <Text>
                                                Subtotal Price:{" "}
                                                {peso_value(Number(cart.data?.sub_total))}
                                            </Text>
                                        </View>
                                        <View style={styles.totalRow}>
                                            <Text>
                                                Discount Price:{" "}
                                                {peso_value(Number(
                                                    cart.data?.customer_total_discount
                                                ))}
                                            </Text>
                                        </View> */}
                                    {/* <View style={styles.totalRow}>
                                            <Text>Sf: PHP{shippingFee.toLocaleString()}</Text>
                                        </View> */}
                                    {/* <View style={styles.totalRow}>
                                            <Text style={styles.bold}>
                                                Total:{" "}
                                                {peso_value(Number(cart.data?.total_price))}
                                            </Text>
                                        </View> */}
                                    {/* <View style={styles.totalRow}>
                                            <Text style={styles.bold}>
                                                Balance Due: PHP{total.toLocaleString()}
                                            </Text>
                                        </View> */}
                                </View>

                                {/* Notes */}
                                <Text style={styles.notes}>
                                    Notes: Thanks for your business.
                                </Text>
                            </Page>
                        </Document>
                    </PDFViewer>
                </div>
            </Modal>
        </>
    );
}
