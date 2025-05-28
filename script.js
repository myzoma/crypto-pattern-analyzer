"use strict";

class CryptoPatternAnalyzer {
    constructor() {
        this.socket = null;
        this.cryptoData = new Map();
        this.currentTimeframe = '1d';
        this.selectedPattern = 'all';
        this.init();
    }

    async init() {
        try {
            this.initializeUI();
            await this.connectWebSocket();
            await this.loadInitialData();
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    initializeUI() {
        try {
            this.timeframeSelect = document.getElementById('timeframeSelect');
            this.patternSelect = document.getElementById('patternSelect');
            this.searchInput = document.getElementById('searchInput');
            this.cryptoGrid = document.getElementById('cryptoGrid');
            this.modal = document.getElementById('detailsModal');

            if (!this.timeframeSelect || !this.patternSelect || !this.cryptoGrid) {
                throw new Error('Required UI elements not found');
            }

            this.setupEventListeners();
        } catch (error) {
            console.error('UI initialization error:', error);
        }
    }

    setupEventListeners() {
        this.timeframeSelect.addEventListener('change', () => this.updateTimeframe());
        this.patternSelect.addEventListener('change', () => this.updatePatternFilter());
        this.searchInput.addEventListener('input', () => this.handleSearch());
        document.querySelector('.close-button')?.addEventListener('click', () => this.closeModal());
    }

    async loadInitialData() {
        try {
            const response = await fetch('https://api.binance.com/api/v3/ticker/24h');
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
        }
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

    // دوال اكتشاف الأنماط
    detectDoubleBottom(priceData) {
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            breakoutLevel: 0
        };
    }

    detectTripleTop(priceData) {
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            breakoutLevel: 0
        };
    }

    detectTripleBottom(priceData) {
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            breakoutLevel: 0
        };
    }

    detectHeadAndShoulders(priceData) {
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            necklineLevel: 0
        };
    }

    detectInvertedHeadAndShoulders(priceData) {
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            necklineLevel: 0
        };
    }

    detectSymmetricalTriangle(priceData) {
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            breakoutLevel: 0
        };
    }

    detectAscendingTriangle(priceData) {
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            resistanceLevel: 0
        };
    }

    detectDescendingTriangle(priceData) {
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            supportLevel: 0
        };
    }

    detectBoardingPattern(priceData) {
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            breakoutLevel: 0
        };
    }

    detectRectangle(priceData) {
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            resistanceLevel: 0,
            supportLevel: 0
        };
    }

    detectFlagsAndPennants(priceData) {
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            breakoutLevel: 0
        };
    }

    detectRisingWedge(priceData) {
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            breakoutLevel: 0
        };
    }

    detectFallingWedge(priceData) {
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            breakoutLevel: 0
        };
    }

    detectRoundingTops(priceData) {
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            breakoutLevel: 0
        };
    }

    detectRoundingBottoms(priceData) {
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            breakoutLevel: 0
        };
    }

    detectVTopPattern(priceData) {
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            breakoutLevel: 0
        };
    }

    detectVBottomPattern(priceData) {
        return {
            detected: false,
            confidence: 0,
            targets: this.calculateTargets(priceData.currentPrice),
            breakoutLevel: 0
        };
    }

    calculateTargets(currentPrice) {
        return {
            target1: currentPrice * 1.05, // هدف أول 5%
            target2: currentPrice * 1.08  // هدف ثاني 8%
        };
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

        const pattern = cryptoData.patterns[0];
        const targets = this.calculateTargets(cryptoData.price);

        this.modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <h2>${cryptoData.symbol} - ${this.getPatternName(pattern)}</h2>
                <div class="pattern-details">
                    <div class="targets">
                        <h3>الأهداف السعرية:</h3>
                        <p>الهدف الأول: $${targets.target1.toFixed(4)} (5%)</p>
                        <p>الهدف الثاني: $${targets.target2.toFixed(4)} (8%)</p>
                    </div>
                    <div class="pattern-status">
                        <h3>حالة النموذج:</h3>
                        <p>${cryptoData.patternStatus}</p>
                    </div>
                </div>
            </div>
        `;

        this.modal.style.display = 'block';
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

    isStableCoin(symbol) {
        const stableCoins = ['USDTUSDT', 'BUSDUSDT', 'USDCUSDT', 'DAIUSDT'];
        return stableCoins.includes(symbol);
    }

    updateTimeframe() {
        this.currentTimeframe = this.timeframeSelect.value;
        this.updateUI();
    }

    updatePatternFilter() {
        this.selectedPattern = this.patternSelect.value;
        this.updateUI();
    }

    handleSearch() {
        const searchTerm = this.searchInput.value.toLowerCase();
        // تنفيذ البحث وتحديث UI
        this.updateUI(searchTerm);
    }

    closeModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
        }
    }

    async connectWebSocket() {
        try {
            const wsUrl = 'wss://stream.binance.com:9443/ws/!ticker@arr';
            this.socket = new WebSocket(wsUrl);
            
            this.socket.onopen = () => {
                console.log('WebSocket connected');
            };

            this.socket.onmessage = (event) => {
                this.handleWebSocketMessage(event);
            };

            this.socket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

        } catch (error) {
            console.error('WebSocket connection error:', error);
        }
    }

    handleWebSocketMessage(event) {
        try {
            const data = JSON.parse(event.data);
            this.processTickerData(data);
        } catch (error) {
            console.error('Error processing WebSocket message:', error);
        }
    }

    processTickerData(data) {
        data.forEach(ticker => {
            if (this.cryptoData.has(ticker.s)) {
                this.updateCryptoData(ticker);
            }
        });
        this.updateUI();
    }

    updateUI(searchTerm = '') {
        if (!this.cryptoGrid) return;

        this.cryptoGrid.innerHTML = '';
        
        const filteredData = Array.from(this.cryptoData.values())
            .filter(crypto => {
                const matchesSearch = crypto.symbol.toLowerCase().includes(searchTerm);
                const matchesPattern = this.selectedPattern === 'all' || 
                                     crypto.patterns.includes(this.selectedPattern);
                return matchesSearch && matchesPattern;
            })
            .sort((a, b) => b.volume - a.volume);

        filteredData.forEach(crypto => {
            this.cryptoGrid.appendChild(this.createCryptoCard(crypto));
        });
    }
}

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', () => {
    try {
        const analyzer = new CryptoPatternAnalyzer();
    } catch (error) {
        console.error('Application initialization error:', error);
    }
});
