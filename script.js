class CryptoPatternAnalyzer {
    constructor() {
        this.socket = null;
        this.cryptoData = new Map();
        this.currentTimeframe = '1d';
        this.selectedPattern = 'all';
        this.proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // إضافة proxy
        this.binanceApiUrl = 'https://api.binance.com/api/v3/ticker/24h';
        this.init();
    }

    async loadInitialData() {
        try {
            // استخدام proxy مع API
            const response = await fetch(this.proxyUrl + this.binanceApiUrl, {
                method: 'GET',
                headers: {
                    'Origin': window.location.origin,
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            const filteredData = data.filter(item => 
                item.symbol.endsWith('USDT') && 
                !this.isStableCoin(item.symbol) &&
                parseFloat(item.volume) > 0
            );

            filteredData.forEach(item => this.initializeCryptoData(item));
            this.updateUI();
        } catch (error) {
            console.error('Error loading initial data:', error);
            // في حالة فشل الاتصال، نستخدم بيانات تجريبية
            this.loadDummyData();
        }
    }

    // إضافة دالة للبيانات التجريبية
    loadDummyData() {
        const dummyData = [
            {
                symbol: 'BTCUSDT',
                price: '45000',
                volume: '1000000',
                priceChange24h: '2.5'
            },
            {
                symbol: 'ETHUSDT',
                price: '3000',
                volume: '500000',
                priceChange24h: '1.8'
            }
            // يمكنك إضافة المزيد من العملات
        ];

        dummyData.forEach(item => this.initializeCryptoData(item));
        this.updateUI();
    }

    // إضافة دالة تهيئة بيانات العملة
    initializeCryptoData(item) {
        const cryptoData = {
            symbol: item.symbol,
            price: parseFloat(item.price),
            volume: parseFloat(item.volume),
            priceChange24h: parseFloat(item.priceChange24h),
            volumePercentage: this.calculateVolumePercentage(item.volume),
            patterns: [],
            patternStatus: 'لا يتوفر نموذج فني حالياً'
        };

        this.cryptoData.set(item.symbol, cryptoData);
    }

    calculateVolumePercentage(volume) {
        // حساب نسبة حجم التداول (مثال بسيط)
        const maxVolume = 1000000000; // قيمة قصوى افتراضية
        return Math.min((volume / maxVolume) * 100, 100);
    }

    async connectWebSocket() {
        try {
            // تعديل طريقة الاتصال بـ WebSocket
            const wsUrl = 'wss://stream.binance.com:9443/ws';
            this.socket = new WebSocket(wsUrl);
            
            this.socket.onopen = () => {
                console.log('WebSocket connected');
                // الاشتراك في تحديثات الأسعار
                const subscribeMessage = {
                    method: "SUBSCRIBE",
                    params: ["!ticker@arr"],
                    id: 1
                };
                this.socket.send(JSON.stringify(subscribeMessage));
            };

            this.socket.onmessage = (event) => {
                this.handleWebSocketMessage(event);
            };

            this.socket.onerror = (error) => {
                console.error('WebSocket error:', error);
                // في حالة الخطأ، نبدأ تحديث البيانات بشكل دوري
                this.startPeriodicUpdate();
            };

        } catch (error) {
            console.error('WebSocket connection error:', error);
            this.startPeriodicUpdate();
        }
    }

    // إضافة تحديث دوري في حالة فشل WebSocket
    startPeriodicUpdate() {
        setInterval(() => {
            this.loadInitialData();
        }, 5000); // تحديث كل 5 ثواني
    }
}

// تحديث طريقة تهيئة التطبيق
document.addEventListener('DOMContentLoaded', () => {
    try {
        const analyzer = new CryptoPatternAnalyzer();
    } catch (error) {
        console.error('Application initialization error:', error);
    }
});
