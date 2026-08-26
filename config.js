// ===================================================================
// 🌐 CONFIG.JS - DATABASE & GLOBAL STATE MANAGEMENT
// ===================================================================

// 🔥 1. SUPABASE CLIENT GLOBAL INITIALIZATION & BINDING
var SUPABASE_URL = window.SUPABASE_URL || "https://dintuoiiaynpcxzwjxhf.supabase.co"; 
var SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpbnR1b2lpYXlucGN4endqeGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMzAwNzAsImV4cCI6MjA5NTcwNjA3MH0.C3SSyuVl303mt77c3ZU57HPTZMAcDZGorXBe3Ep99Yw"; 

window.SUPABASE_URL = SUPABASE_URL;
window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;

if (!window.supabaseClient) {
    if (window.parent && window.parent !== window && window.parent.supabaseClient) {
        window.supabaseClient = window.parent.supabaseClient;
    } else if (typeof supabase !== 'undefined' && supabase.createClient) {
        window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
}

// =================================================================
// ⚙️ GLOBAL RULES & ARRAYS STATE (Absolute Zero-Conflict Version)
// =================================================================
window.adminMasterRealtimeChannel = window.adminMasterRealtimeChannel || null;

// 🛡️ FIX 1: Bina kisi var/let/const ke seedhe window par register karo
if (typeof window.hotelGlobalScopeID === 'undefined') {
    window.hotelGlobalScopeID = localStorage.getItem('restaurantHotelClassificationID') || "Default_HQ_Arena";
}

// 🔥 CRITICAL CHANGE: Global execution scope clash hatane ke liye hamesha window property use hogi
if (window.hotelGlobalScopeID !== "Default_HQ_Arena" && window.hotelGlobalScopeID.length < 5) {
    window.hotelGlobalScopeID = "Default_HQ_Arena";
    localStorage.setItem('restaurantHotelClassificationID', "Default_HQ_Arena");
}

// purane code se compatibility ke liye bina var/let ke direct assign karo (agar pehle let se defined hai toh crash nahi karega)
hotelGlobalScopeID = window.hotelGlobalScopeID;

// 🛡️ FIX 2: rules redeclaration shield
if (typeof window.rules === 'undefined') {
    window.rules = JSON.parse(localStorage.getItem('gameRulesConfig')) || {
        flappyTar: 5, flappyDisc: 10, spaceTar: 3, spaceDisc: 15, snakeTar: 10, snakeDisc: 12, brickTar: 3, brickDisc: 8,
        towerTar: 3, towerDisc: 15 // Seeded baseline default rules
    };
}
rules = window.rules;

// 🛡️ FIX 3: dynamicGlobalSaaSDefaults double-counting block
if (typeof window.dynamicGlobalSaaSDefaults === 'undefined') {
    window.dynamicGlobalSaaSDefaults = { monthly: 499, yearly: 4999 };
}
dynamicGlobalSaaSDefaults = window.dynamicGlobalSaaSDefaults;

// 🛡️ FIX 4: Core fallback setups
if (typeof window.fallbackMenu === 'undefined') {
    window.fallbackMenu = [
        { categoryName: "Pizzas & Fast Food", items: [{ name: "Farmhouse Pizza", s: 140, m: 240, l: 320, sActive: true, mActive: true, lActive: true, image: "" }, { name: "Burger Combo Crunch", s: 70, m: 120, l: 0, sActive: true, mActive: true, lActive: false, image: "" }] },
        { categoryName: "Beverages & Addons", items: [{ name: "Chilled Cold Drink", s: 30, m: 50, l: 80, sActive: true, mActive: true, lActive: true, image: "" }] }
    ];
}
fallbackMenu = window.fallbackMenu;

if (typeof window.defaultFloors === 'undefined') {
    window.defaultFloors = [{ floorName: "Ground Dining Hall", tables: [{ id: "T1", state: 0, waiterBell: false }, { id: "T2", state: 1, waiterBell: false }, { id: "T3", state: 0, waiterBell: false }] }];
}
defaultFloors = window.defaultFloors;

if (typeof window.defaultTaxes === 'undefined') {
    window.defaultTaxes = { cgstActive: true, cgstRate: 2.5, sgstActive: true, sgstRate: 2.5, serviceActive: false, serviceRate: 5 };
}
defaultTaxes = window.defaultTaxes;

// 🛡️ FIX 5: Main running states
if (typeof window.menuCategories === 'undefined') {
    window.menuCategories = fallbackMenu;
}
menuCategories = window.menuCategories;

try {
    let localMenuRawData = localStorage.getItem('restaurantMenuCat_' + hotelGlobalScopeID);
    if (localMenuRawData) {
        let parsedMenu = JSON.parse(localMenuRawData);
        if (Array.isArray(parsedMenu) && parsedMenu.length > 0 && parsedMenu[0].items) {
            menuCategories = parsedMenu;
            window.menuCategories = parsedMenu;
        }
    }
} catch (e) {
    console.log("Local menu parsing fallback active:", e);
}

if (typeof window.floorData === 'undefined') {
    window.floorData = defaultFloors;
}
floorData = window.floorData;

try {
    let localTablesRawData = localStorage.getItem('restaurantFloors');
    if (localTablesRawData) {
        let parsedFloors = JSON.parse(localTablesRawData);
        if (Array.isArray(parsedFloors) && parsedFloors.length > 0 && parsedFloors[0].tables) {
            floorData = parsedFloors;
            window.floorData = parsedFloors;
        }
    }
} catch (e) { localStorage.setItem('restaurantFloors', JSON.stringify(defaultFloors)); }

if (typeof window.taxConfig === 'undefined') {
    window.taxConfig = defaultTaxes;
}
taxConfig = window.taxConfig;

try {
    let localTaxRawData = localStorage.getItem('restaurantTaxSettings');
    if (localTaxRawData) {
        let parsedTax = JSON.parse(localTaxRawData);
        if (parsedTax && parsedTax.cgstRate !== undefined) {
            taxConfig = parsedTax;
            window.taxConfig = parsedTax;
        }
    }
} catch (e) { localStorage.setItem('restaurantTaxSettings', JSON.stringify(defaultTaxes)); }

if (typeof window.customPaymentQRData === 'undefined') {
    window.customPaymentQRData = localStorage.getItem('restaurantCustomPaymentQR') || "";
}
customPaymentQRData = window.customPaymentQRData;

// 🔥 SYSTEM ATOMIC RESET POINTERS (Zeba-crossing variables for manual wipe tracking)
var clientCurrentActiveTable = localStorage.getItem('restroflow_active_table') || "T1";
var localLiveRunningBill = JSON.parse(localStorage.getItem('restroflow_live_bill')) || [];
var maximumClaimedDisc = parseInt(localStorage.getItem('restroflow_max_discount')) || 0;
var globalRunningInvoiceSumTotal = 0;

// Canvas context initialization pointers explicitly binded
var flappyCanvasElement = document.getElementById('flappyCanvas');
var flCtx = flappyCanvasElement ? flappyCanvasElement.getContext('2d') : null;
var spCanvasElement = document.getElementById('spaceCanvas');
var spCtx = spCanvasElement ? spCanvasElement.getContext('2d') : null;
var snakeCanvasElement = document.getElementById('snakeCanvas');
var snCtx = snakeCanvasElement ? snakeCanvasElement.getContext('2d') : null;

// Game Configuration Properties Scope Declarations Assemblies
var spaceMoveDir = 0, spaceFrameTracker = 0, spaceTransitionCount = 0, currentLevelState = 1;
var pShipObj = null, alienInvaderObj = null, spaceBullets = [], enemyLasers = [], powerUps = [], sShieldTimer = 0, sMultiTimer = 0;
var snakeArr = [], snakeFoodUnit = {}, snakeScoreCounter = 0, currentSnakeVector = { x: 20, y: 0 };
var fBird = {}, fPipes = [], flappyScoreTracker = 0;
var cosmicBackgroundStars = [];

console.log("⚙️ Config.js loaded successfully. Global Scope ID:", window.hotelGlobalScopeID);
