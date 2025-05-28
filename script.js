class CryptoPatternAnalyzer {
    constructor() {
        this.socket = null;
        this.cryptoData = new Map();
        this.currentTimeframe = '1d';
        this.selectedPattern = 'all';
        this.initializeUI();
        this.connectWebSocket();
    }
 detectPatterns(priceData, timeframe) {
        return {
            doubleBottom: this.detectDoubleBottom(priceData),
            tripleTop: this.detectTripleTop(priceData),
            tripleBottom: this.detectTripleBottom(priceData),
            headAndShoulders: this.detectHeadAndShoulders(priceData),
            invertedHeadAndShoulders: this.detectInvertedHeadAndShoulders(priceData),
            symmetricalTriangle: this.detectSymmetricalTriangle(priceData),
            ascendingTriangle: this.detectAscendingTriangle(priceData),
            descendingTriangle: this.detectDescendingTriangle(priceData),
            boardingPattern: this.detectBoardingPattern(priceData),
            rectangle: this.detectRectangle(priceData),
            flagsAndPennants: this.detectFlagsAndPennants(priceData),
            risingWedge: this.detectRisingWedge(priceData),
            fallingWedge: this.detectFallingWedge(priceData),
            roundingTops: this.detectRoundingTops(priceData),
            roundingBottoms: this.detectRoundingBottoms(priceData),
            vTopPattern: this.detectVTopPattern(priceData),
            vBottomPattern: this.detectVBottomPattern(priceData)
        };
    }

    // 1. نموذج القاع الثنائي
    detectDoubleBottom(priceData) {
        // تنفيذ خوارزمية اكتشاف القاع الثنائي
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            breakoutLevel: 0
        };
    }

    // 2. نموذج القمة الثلاثية
    detectTripleTop(priceData) {
        // تنفيذ خوارزمية اكتشاف القمة الثلاثية
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            breakoutLevel: 0
        };
    }

    // 3. نموذج القاع الثلاثي
    detectTripleBottom(priceData) {
        // تنفيذ خوارزمية اكتشاف القاع الثلاثي
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            breakoutLevel: 0
        };
    }

    // 4. نموذج الرأس والكتفين
    detectHeadAndShoulders(priceData) {
        // تنفيذ خوارزمية اكتشاف الرأس والكتفين
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            necklineLevel: 0
        };
    }

    // 5. نموذج الرأس والكتفين المقلوب
    detectInvertedHeadAndShoulders(priceData) {
        // تنفيذ خوارزمية اكتشاف الرأس والكتفين المقلوب
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            necklineLevel: 0
        };
    }

    // 6. نموذج المثلث المتماثل
    detectSymmetricalTriangle(priceData) {
        // تنفيذ خوارزمية اكتشاف المثلث المتماثل
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            breakoutLevel: 0
        };
    }

    // 7. المثلث الصاعد
    detectAscendingTriangle(priceData) {
        // تنفيذ خوارزمية اكتشاف المثلث الصاعد
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            resistanceLevel: 0
        };
    }

    // 8. المثلث الهابط
    detectDescendingTriangle(priceData) {
        // تنفيذ خوارزمية اكتشاف المثلث الهابط
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            supportLevel: 0
        };
    }

    // 9. النموذج المتباعد
    detectBoardingPattern(priceData) {
        // تنفيذ خوارزمية اكتشاف النموذج المتباعد
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            breakoutLevel: 0
        };
    }

    // 10. نموذج المستطيل
    detectRectangle(priceData) {
        // تنفيذ خوارزمية اكتشاف المستطيل
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            resistanceLevel: 0,
            supportLevel: 0
        };
    }

    // 11. الأعلام والأعلام المثلثة
    detectFlagsAndPennants(priceData) {
        // تنفيذ خوارزمية اكتشاف الأعلام والأعلام المثلثة
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            breakoutLevel: 0
        };
    }

    // 12. نموذج الوتد الصاعد
    detectRisingWedge(priceData) {
        // تنفيذ خوارزمية اكتشاف الوتد الصاعد
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            breakoutLevel: 0
        };
    }

    // 13. نموذج الوتد الهابط
    detectFallingWedge(priceData) {
        // تنفيذ خوارزمية اكتشاف الوتد الهابط
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            breakoutLevel: 0
        };
    }

    // 14. نموذج القمم المستديرة
    detectRoundingTops(priceData) {
        // تنفيذ خوارزمية اكتشاف القمم المستديرة
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            breakoutLevel: 0
        };
    }

    // 15. نموذج القيعان المستديرة
    detectRoundingBottoms(priceData) {
        // تنفيذ خوارزمية اكتشاف القيعان المستديرة
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            breakoutLevel: 0
        };
    }

    // 16. نموذج القمة V
    detectVTopPattern(priceData) {
        // تنفيذ خوارزمية اكتشاف قمة V
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            breakoutLevel: 0
        };
    }

    // 17. نموذج القاع V
    detectVBottomPattern(priceData) {
        // تنفيذ خوارزمية اكتشاف قاع V
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            breakoutLevel: 0
        };
    }

    // دالة حساب الأهداف
    calculateTargets(currentPrice) {
        return {
            target1: currentPrice * 1.05, // هدف أول 5%
            target2: currentPrice * 1.08  // هدف ثاني 8%
        };
    }

    // تحديث قائمة النماذج في واجهة المستخدم
    getPatternName(patternKey) {
        const patterns = {
            doubleBottom: 'القاع الثنائي',
            tripleTop: 'القمة الثلاثية',
            tripleBottom: 'القاع الثلاثي',
            headAndShoulders: 'الرأس والكتفين',
            invertedHeadAndShoulders: 'الرأس والكتفين المقلوب',
            symmetricalTriangle: 'المثلث المتماثل',
            ascendingTriangle: 'المثلث الصاعد',
            descendingTriangle: 'المثلث الهابط',
            boardingPattern: 'النموذج المتباعد',
            rectangle: 'المستطيل',
            flagsAndPennants: 'الأعلام والأعلام المثلثة',
            risingWedge: 'الوتد الصاعد',
            fallingWedge: 'الوتد الهابط',
            roundingTops: 'القمم المستديرة',
            roundingBottoms: 'القيعان المستديرة',
            vTopPattern: 'قمة V',
            vBottomPattern: 'قاع V'
        };
        return patterns[patternKey] || patternKey;
    }
}
    initializeUI() {
        // تهيئة عناصر واجهة المستخدم
        this.timeframeSelect = document.getElementById('timeframeSelect');
        this.patternSelect = document.getElementById('patternSelect');
        this.searchInput = document.getElementById('searchInput');
        this.cryptoGrid = document.getElementById('cryptoGrid');
        this.modal = document.getElementById('detailsModal');

        // إضافة مستمعي الأحداث
        this.timeframeSelect.addEventListener('change', () => this.updateTimeframe());
        this.patternSelect.addEventListener('change', () => this.updatePatternFilter());
        this.searchInput.addEventListener('input', () => this.handleSearch());
        document.querySelector('.close-button').addEventListener('click', () => this.closeModal());
    }

    connectWebSocket() {
        const wsUrl = 'wss://stream.binance.com:9443/ws/!ticker@arr';
        this.socket = new WebSocket(wsUrl);
        
        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.processTickerData(data);
        };

        this.socket.onopen = () => {
            console.log('WebSocket Connected');
            this.loadInitialData();
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };
    }

    async loadInitialData() {
        try {
            const response = await fetch('https://api.binance.com/api/v3/ticker/24h');
            const data = await response.json();
            
            // تصفية العملات حسب الشروط المطلوبة
            const filteredData = data.filter(item => 
                item.symbol.endsWith('USDT') && 
                !this.isStableCoin(item.symbol) &&
                parseFloat(item.volume) > 0
            );

            filteredData.forEach(item => this.initializeCryptoData(item));
            this.updateUI();
        } catch (error) {
            console.error('Error loading initial data:', error);
        }
    }

    isStableCoin(symbol) {
        const stableCoins = ['USDTUSDT', 'BUSDUSDT', 'USDCUSDT', 'DAIUSDT'];
        return stableCoins.includes(symbol);
    }

    processTickerData(data) {
        data.forEach(ticker => {
            if (this.cryptoData.has(ticker.s)) {
                this.updateCryptoData(ticker);
            }
        });
        this.updateUI();
    }

    detectPattern(priceData, timeframe) {
        // تنفيذ خوارزميات اكتشاف الأنماط
        const patterns = {
            doubleBottom: this.detectDoubleBottom(priceData),
            tripleTop: this.detectTripleTop(priceData),
            // ... باقي الأنماط
        };

        return Object.entries(patterns)
            .filter(([_, detected]) => detected)
            .map(([pattern, _]) => pattern);
    }

    detectDoubleBottom(priceData) {
        // خوارزمية اكتشاف القاع الثنائي
        // تنفيذ المنطق الخاص بالنمط
        return {
            detected: false,
            confidence: 0,
            targets: {
                first: 0,
                second: 0
            }
        };
    }

    calculatePatternTargets(pattern, currentPrice) {
        const targets = {
            first: currentPrice * 1.05,  // هدف أول 5%
            second: currentPrice * 1.08   // هدف ثاني 8%
        };

        return targets;
    }

    createCryptoCard(cryptoData) {
        const card = document.createElement('div');
        card.className = 'crypto-card';
        
        const pattern = cryptoData.patterns[0] || null;
        const priceChange = parseFloat(cryptoData.priceChange24h);
        
        card.innerHTML = `
            <div class="coin-header">
                <div class="coin-logo">${cryptoData.symbol[0]}</div>
                <div class="coin-name">${cryptoData.symbol}</div>
            </div>
            <div class="price-info">
                <span class="current-price">$${parseFloat(cryptoData.price).toFixed(4)}</span>
                <span class="price-change ${priceChange >= 0 ? 'positive' : 'negative'}">
                    ${priceChange >= 0 ? '▲' : '▼'} ${Math.abs(priceChange).toFixed(2)}%
                </span>
            </div>
            <div class="volume-bar">
                <div class="volume-fill" style="width: ${cryptoData.volumePercentage}%"></div>
            </div>
            <div class="volume-text">
                حجم التداول: $${this.formatNumber(cryptoData.volume)}
            </div>
            <div class="pattern-info">
                ${pattern ? `
                    <span class="pattern-name">${this.getPatternName(pattern)}</span>
                    <span class="pattern-status">${cryptoData.patternStatus}</span>
                ` : '<span class="no-pattern">لا يتوفر نموذج فني حالياً</span>'}
            </div>
        `;

        card.addEventListener('click', () => this.showPatternDetails(cryptoData));
        return card;
    }

    showPatternDetails(cryptoData) {
        if (!cryptoData.patterns.length) return;

        const modal = document.getElementById('detailsModal');
        const pattern = cryptoData.patterns[0];
        const targets = this.calculatePatternTargets(pattern, cryptoData.price);

        document.getElementById('modalTitle').textContent = 
            `${cryptoData.symbol} - ${this.getPatternName(pattern)}`;
        document.getElementById('target1').textContent = 
            `الهدف الأول: $${targets.first.toFixed(4)} (5%)`;
        document.getElementById('target2').textContent = 
            `الهدف الثاني: $${targets.second.toFixed(4)} (8%)`;
        document.getElementById('patternStatus').textContent = cryptoData.patternStatus;

        this.renderChart(cryptoData);
        modal.style.display = 'block';
    }

    formatNumber(num) {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(num);
    }

    getPatternName(patternKey) {
        const patterns = {
            doubleBottom: 'القاع الثنائي',
            tripleTop: 'القمة الثلاثية',
            // ... باقي الأنماط
        };
        return patterns[patternKey] || patternKey;
    }

    updateUI() {
        this.cryptoGrid.innerHTML = '';
        
        // فرز وفلترة البيانات
        const sortedData = Array.from(this.cryptoData.values())
            .filter(crypto => {
                if (this.selectedPattern === 'all') return true;
                return crypto.patterns.includes(this.selectedPattern);
            })
            .sort((a, b) => b.volume - a.volume);

        sortedData.forEach(crypto => {
            this.cryptoGrid.appendChild(this.createCryptoCard(crypto));
        });
    }

    closeModal() {
        this.modal.style.display = 'none';
    }
}

// تهيئة المحلل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const analyzer = new CryptoPatternAnalyzer();
});
