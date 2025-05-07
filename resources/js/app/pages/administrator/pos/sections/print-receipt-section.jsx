import {
    render,
    Printer,
    Text,
    Row,
    Line,
    Br,
    Cut,
} from "react-thermal-printer";

export default function PrintReceiptSection() {
    const handlePrint = async () => {
        try {
            const data = await render(
                <Printer type="epson" width={42} characterSet="korea">
                    <Text size={{ width: 2, height: 2 }}>9,500원</Text>
                    <Text bold={true}>결제 완료</Text>
                    <Br />
                    <Line />
                    <Row left="결제방법" right="체크카드" />
                    <Row left="카드번호" right="123456**********" />
                    <Row left="할부기간" right="일시불" />
                    <Row left="결제금액" right="9,500" />
                    <Row left="부가세액" right="863" />
                    <Row left="공급가액" right="8,637" />
                    <Line />
                    <Row left="맛있는 옥수수수염차 X 2" right="11,000" />
                    <Text>옵션1(500)/옵션2/메모</Text>
                    <Row left="(-) 할인" right="- 500" />
                    <Br />
                    <Line />
                    <Row left="합계" right="9,500" />
                    <Row left="(-) 할인 2%" right="- 1,000" />
                    <Line />
                    <Row left="대표" right="김대표" />
                    <Row left="사업자등록번호" right="000-00-00000" />
                    <Row left="대표번호" right="0000-0000" />
                    <Row left="주소" right="어디시 어디구 어디동 몇동몇호" />
                    <Line />
                    <Br />
                    <Text align="center">Wifi: some-wifi / PW: 123123</Text>
                    <Cut />
                </Printer>
            );

            // Ask user to select the serial port (printer must be connected)
            const port = await window.navigator.serial.requestPort();

            // Open the port with the appropriate baud rate (check your printer's manual)
            await port.open({ baudRate: 9600 });

            // Write the data to the printer
            const writer = port.writable?.getWriter();
            if (writer != null) {
                await writer.write(data);
                writer.releaseLock();
            }
        } catch (err) {
            console.error("Print failed:", err);
            alert("Printing failed. Check your printer connection.");
        }
    };

    return (
        <button
            onClick={handlePrint}
            className="px-4 py-4 w-full rounded-md shadow-lg text-center bg-pink-300 hover:bg-pink-400 text-white font-semibold"
        >
            Pay
        </button>
    );
}
