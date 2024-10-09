// JSON 요청을 처리하기 위해 body-parser 미들웨어 세팅
app.use(bodyParser.json());

// POST 요청을 받는 /payments/complete
app.post("/payment/complete", async (req, res) => {
    try {
        // 요청의 body로 imp_uid와 merchant_uid가 전달되기를 기대합니다.
        const { imp_uid, merchant_uid } = req.body;

        // 1. 포트원 API 엑세스 토큰 발급
        const tokenResponse = await fetch("https://api.iamport.kr/users/getToken", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                imp_key: "imp_apikey", // REST API 키
                imp_secret: "ekKoeW8RyKuT0zgaZsUtXXTLQ4AhPFW", // REST API Secret
            }),
        });
        if (!tokenResponse.ok)
            throw new Error(`tokenResponse: ${await tokenResponse.json()}`);
        const { access_token } = await tokenResponse.json();

        // 2. 포트원 결제내역 단건조회 API 호출
        const paymentResponse = await fetch(
            `https://api.iamport.kr/payments/${imp_uid}`,
            { headers: { Authorization: access_token } },
        );
        if (!paymentResponse.ok)
            throw new Error(`paymentResponse: ${await paymentResponse.json()}`);
        const payment = await paymentResponse.json();

        // 3. 고객사 내부 주문 데이터의 가격과 실제 지불된 금액을 비교합니다.
        const order = await OrderService.findById(merchant_uid);
        if (order.amount === payment.amount) {
            switch (payment.status) {
                case "ready": {
                    // 가상 계좌가 발급된 상태입니다.
                    // 계좌 정보를 이용해 원하는 로직을 구성하세요.
                    break;
                }
                case "paid": {
                    // 모든 금액을 지불했습니다! 완료 시 원하는 로직을 구성하세요.
                    break;
                }
            }
        } else {
            // 결제 금액이 불일치하여 위/변조 시도가 의심됩니다.
        }
    } catch (e) {
        // 결제 검증에 실패했습니다.
        res.status(400).send(e);
    }
});