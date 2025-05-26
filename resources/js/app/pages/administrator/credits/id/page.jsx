import React, { useEffect } from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    PDFViewer,
    Image,
} from "@react-pdf/renderer";
import store from "@/app/store/store";
import { get_cart_by_id_thunk } from "@/app/redux/cart-thunk";
import { useSelector } from "react-redux";
import moment from "moment";

// Styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 11,
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
        fontWeight: "bold",
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

// Invoice Data
const items = [
    {
        description: "Perfect Skin Twinpack Tinted With Free Wipes",
        qty: 60,
        rate: 135,
    },
    {
        description: "Perfect Skin Twinpack Melasma With Free Wipes",
        qty: 20,
        rate: 135,
    },
    {
        description: "Perfect Skin Melasma Sunblock",
        qty: 10,
        rate: 125,
    },
    {
        description: "PS Vitamin C Set",
        qty: 50,
        rate: 200,
    },
];

const shippingFee = 375;

const InvoicePDF = () => {
    const subtotal = items.reduce((sum, item) => sum + item.qty * item.rate, 0);
    const total = subtotal + shippingFee;
    const cart_id = window.location.pathname.split("/")[3];
    const { cart } = useSelector((store) => store.carts);
    useEffect(() => {
        store.dispatch(get_cart_by_id_thunk(cart_id));
    }, []);

    console.log("cartcart", cart?.data);
    return (
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
            <Document>
                <Page size="A4" style={styles.page}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Image src="/images/logo.png" style={styles.logo} />
                        <View style={styles.companyInfo}>
                            <Text style={styles.invoiceTitle}>INVOICE</Text>
                            <Text># INVOICE-{cart_id}</Text>
                            {/* <Text>Balance Due</Text>
                            <Text style={styles.bold}>
                                PHP{total.toLocaleString()}
                            </Text> */}
                        </View>
                    </View>

                    {/* Company Info */}
                    <View style={styles.section}>
                        <Text style={styles.bold}>Egie’s Beauty Boutique</Text>
                        <Text>Rizal Street</Text>
                        <Text>San Carlos City, Negros Occidental 6127</Text>
                        <Text>Philippines</Text>
                    </View>

                    {/* Billing Info */}
                    <View style={styles.section}>
                        <Text>
                            Bill To:{" "}
                            <Text style={styles.bold}>
                                {cart?.data?.customer?.name}
                            </Text>
                        </Text>
                        <Text>Invoice Date: {moment().format("LLL")}</Text>
                        {/* <Text>Terms: Net 15</Text> */}
                        <Text>
                            Due Date:{" "}
                            {moment(cart?.data?.due_date).format("LL")}
                        </Text>
                    </View>

                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableCol, { flex: 0.5 }]}>#</Text>
                        <Text style={styles.tableCol}>Item & Description</Text>
                        <Text style={[styles.tableCol, { flex: 0.8 }]}>
                            Qty
                        </Text>
                        <Text style={[styles.tableCol, { flex: 0.8 }]}>
                            Rate
                        </Text>
                        <Text style={[styles.tableCol, { flex: 1 }]}>
                            Amount
                        </Text>
                    </View>

                    {/* Table Rows */}
                    {cart?.data?.cart_items?.map((item, index) => {
                        return (
                            <View style={styles.tableRow} key={index}>
                                <Text style={[styles.tableCol, { flex: 0.5 }]}>
                                    {index + 1}
                                </Text>
                                <Text style={styles.tableCol}>
                                    {item.product.name}
                                </Text>
                                <Text style={[styles.tableCol, { flex: 0.8 }]}>
                                    {item.quantity}
                                </Text>
                                <Text style={[styles.tableCol, { flex: 0.8 }]}>
                                    {Number(item.price).toFixed(2)}
                                </Text>
                                <Text style={[styles.tableCol, { flex: 1 }]}>
                                    {Number(item.total).toFixed(2)}
                                </Text>
                            </View>
                        );
                    })}

                    {/* Totals */}
                    <View style={styles.totalSection}>
                        <View style={styles.totalRow}>
                            <Text>Payment Status: {cart.data?.status}</Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text>
                                Subtotal Price:{" "}
                                {Number(cart.data?.sub_total).toFixed(2)}
                            </Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text>
                                Discount Price:{" "}
                                {Number(
                                    cart.data?.customer_total_discount
                                ).toFixed(2)}
                            </Text>
                        </View>
                        {/* <View style={styles.totalRow}>
                            <Text>Sf: PHP{shippingFee.toLocaleString()}</Text>
                        </View> */}
                        <View style={styles.totalRow}>
                            <Text style={styles.bold}>
                                Total:{" "}
                                {Number(cart.data?.total_price).toFixed(2)}
                            </Text>
                        </View>
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
    );
};

export default InvoicePDF;
