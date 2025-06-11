import React, { useEffect } from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    PDFViewer,
    Image,
    Font,
} from "@react-pdf/renderer";
import store from "@/app/store/store";
import { get_cart_by_id_thunk } from "@/app/redux/cart-thunk";
import { useSelector } from "react-redux";
import moment from "moment";
import { peso_value } from "@/app/lib/peso";
// Styles

Font.register({
    family: "NotoSans",
    fonts: [
        {
            src: "/fonts/Noto_Sans/static/NotoSans-Regular.ttf",
            fontWeight: "normal",
            fontStyle: "normal",
        },
        {
            src: "/fonts/Noto_Sans/static/NotoSans-Italic.ttf",
            fontWeight: "normal",
            fontStyle: "italic",
        },
        {
            src: "/fonts/Noto_Sans/static/NotoSans-ExtraBold.ttf",
            fontWeight: "normal",
            fontStyle: "bold",
        },
    ],
});

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 11,
        fontFamily: "NotoSans",
        // fontFamily: "Helvetica",
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
        width: "28%",
        alignSelf: "flex-end",
    },

    totalRow: {
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bold: {
        fontWeight: "bold",
    },
});

const InvoicePDF = () => {
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
                        <Text>
                            Invoice Date: &nbsp;
                            {moment(cart?.data?.created_at).format("LLL")}
                        </Text>
                        {/* <Text>Terms: Net 15</Text> */}
                        {cart?.data?.due_date && (
                            <Text>
                                Due Date:{" "}
                                {moment(cart?.data?.due_date).format("LL")}
                            </Text>
                        )}
                    </View>

                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableCol, { flex: 0.5 }]}>#</Text>
                        <Text style={[styles.tableCol, { fontWeight: "bold" }]}>
                            Item & Description
                        </Text>
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
                                    {peso_value(Number(item.price))}
                                </Text>
                                <Text style={[styles.tableCol, { flex: 1 }]}>
                                    {peso_value(Number(item.total))}
                                </Text>
                            </View>
                        );
                    })}

                    {/* Totals */}
                    <View style={styles.totalSection}>
                        <View style={styles.totalRow}>
                            <Text>
                                Payment Status:
                            </Text>
                            <Text>
                                &nbsp;{cart.data?.status}
                            </Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text>
                                Subtotal Price:{" "}
                            </Text>
                            <Text>
                                {peso_value(Number(cart.data?.sub_total))}
                            </Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text>
                                Discount Price:{" "}
                            </Text>
                            <Text>
                                {peso_value(
                                    Number(
                                        cart.data?.customer_total_discount ?? 0
                                    ) +
                                    Number(
                                        cart?.data?.discount_per_item ?? 0
                                    ) +
                                    Number(
                                        cart?.data?.discount_per_order ?? 0
                                    )
                                )}
                            </Text>
                        </View>
                        {/* <View style={styles.totalRow}>
                            <Text>Sf: PHP{shippingFee.toLocaleString()}</Text>
                        </View> */}

                        <View
                            style={{
                                height: 1,
                                backgroundColor: "#000",
                                width: "100%",
                                marginTop: 5,
                                marginBottom: 5,
                            }}
                        />

                        <View style={styles.totalRow}>
                            <Text style={styles.bold}>
                                Total:{" "}
                            </Text>
                            <Text style={styles.bold}>
                                {peso_value(Number(cart.data?.total_price))}
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
