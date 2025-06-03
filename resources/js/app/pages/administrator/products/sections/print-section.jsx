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
    const { products, selectedProducts } = useSelector(
        (state) => state.products
    ) || {
        products: { data: [], total: 0, last_page: 1 },
    };

    return (
        <>
            {selectedProducts.length != 0 && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 bg-pink-700 rounded-lg hover:bg-pink-600 text-white"
                >
                    {selectedProducts.length} Print
                </button>
            )}

            <Modal
                width="max-w-7xl"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
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
                                            PRODUCTS REPORT
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
                                    <Text
                                        style={[styles.tableCol, { flex: 1 }]}
                                    >
                                        Brand
                                    </Text>
                                    <Text
                                        style={[styles.tableCol, { flex: 1 }]}
                                    >
                                        Delivery Receipt
                                    </Text>
                                    <Text
                                        style={[styles.tableCol, { flex: 1 }]}
                                    >
                                        Category
                                    </Text>
                                    <Text
                                        style={[styles.tableCol, { flex: 1 }]}
                                    >
                                        Cost Per Unit
                                    </Text>
                                    <Text
                                        style={[styles.tableCol, { flex: 1 }]}
                                    >
                                        Shopee Price
                                    </Text>
                                    <Text
                                        style={[styles.tableCol, { flex: 1 }]}
                                    >
                                        SRP
                                    </Text>
                                    <Text
                                        style={[styles.tableCol, { flex: 1 }]}
                                    >
                                        Reseller
                                    </Text>
                                    <Text
                                        style={[styles.tableCol, { flex: 1 }]}
                                    >
                                        City
                                    </Text>
                                    <Text
                                        style={[styles.tableCol, { flex: 1 }]}
                                    >
                                        District
                                    </Text>
                                    <Text
                                        style={[styles.tableCol, { flex: 1 }]}
                                    >
                                        Provincial
                                    </Text>
                                </View>

                                {/* Table Rows */}
                                {selectedProducts?.map((product, index) => {
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
                                                {product.name}
                                            </Text>
                                            <Text style={styles.tableCol}>
                                                {product.brand}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.tableCol,
                                                    { flex: 1 },
                                                ]}
                                            >
                                                {product?.delivery_receipt_no}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.tableCol,
                                                    { flex: 1 },
                                                ]}
                                            >
                                                {product?.categories?.name}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.tableCol,
                                                    { flex: 1 },
                                                ]}
                                            >
                                                {" "}
                                                {Number(
                                                    product.cost
                                                ).toLocaleString("en-PH", {
                                                    minimumFractionDigits: 2,
                                                })}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.tableCol,
                                                    { flex: 1 },
                                                ]}
                                            >
                                                {Number(product.shopee).toFixed(
                                                    2
                                                )}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.tableCol,
                                                    { flex: 1 },
                                                ]}
                                            >
                                                {Number(
                                                    product.srp
                                                ).toLocaleString("en-PH", {
                                                    minimumFractionDigits: 2,
                                                })}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.tableCol,
                                                    { flex: 1 },
                                                ]}
                                            >
                                                {Number(
                                                    product.reseller
                                                ).toLocaleString("en-PH", {
                                                    minimumFractionDigits: 2,
                                                })}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.tableCol,
                                                    { flex: 1 },
                                                ]}
                                            >
                                                {Number(
                                                    product.city_distributor
                                                ).toLocaleString("en-PH", {
                                                    minimumFractionDigits: 2,
                                                })}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.tableCol,
                                                    { flex: 1 },
                                                ]}
                                            >
                                                {Number(
                                                    product.district_distributor
                                                ).toLocaleString("en-PH", {
                                                    minimumFractionDigits: 2,
                                                })}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.tableCol,
                                                    { flex: 1 },
                                                ]}
                                            >
                                                {Number(
                                                    product.provincial_distributor
                                                ).toLocaleString("en-PH", {
                                                    minimumFractionDigits: 2,
                                                })}
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
