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

// ===================================================================
// 🌐 GLOBAL RULES & ARRAYS STATE
// ===================================================================

// Hotel Global Scope Identifier
let hotelGlobalScopeID = localStorage.getItem('restaurantHotelClassificationID') || "Default_HQ_Arena";
if (hotelGlobalScopeID !== "Default_HQ_Arena" && hotelGlobalScopeID.length < 5) {
    hotelGlobalScopeID = "Default_HQ_Arena";
    localStorage.setItem('restaurantHotelClassificationID', "Default_HQ_Arena");
}
window.hotelGlobalScopeID = hotelGlobalScopeID;

// Global Rules Matrix
window.rules = [
    { target: "Brick Breaker", desc: "Clear 3 Levels to win 10% Discount" },
    { target: "Flappy Bird", desc: "Score 10 Points to win 15% Discount" },
    { target: "Space Shooter", desc: "Destroy 20 Alien Ships for 15% Discount" },
    { target: "Snake Game", desc: "Eat 15 Apples for 10% Discount" },
    { target: "Tower Bloxx", desc: "Stack 10 Floors perfectly for 20% Discount" }
];
window.rulesConfig = window.rules;

// Dynamic SaaS Pricing Fallback Defaults
window.dynamicGlobalSaaSDefaults = window.dynamicGlobalSaaSDefaults || { monthly: 499, yearly: 4999 };

// Default Fallback Menu Array
window.fallbackMenu = [
    {
        categoryName: "Starters & Appetizers",
        category: "Starters & Appetizers",
        items: [
            { id: "p1", name: "Paneer Tikka", s: 180, m: 240, l: 320, sActive: true, mActive: true, lActive: true, inStock: true, photo: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300" },
            { id: "p2", name: "Veg Crispy", s: 150, m: 200, l: 260, sActive: true, mActive: true, lActive: true, inStock: true, photo: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300" }
        ]
    },
    {
        categoryName: "Main Course",
        category: "Main Course",
        items: [
            { id: "p3", name: "Butter Paneer Masala", s: 220, m: 290, l: 380, sActive: true, mActive: true, lActive: true, inStock: true, photo: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300" },
            { id: "p4", name: "Dal Tadka", s: 140, m: 180, l: 240, sActive: true, mActive: true, lActive: true, inStock: true, photo: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300" }
        ]
    }
];

// Default Layout & Tax State Data
window.defaultFloors = [
    { name: "Ground Floor", tables: ["T1", "T2", "T3", "T4"] },
    { name: "First Floor / Terrace", tables: ["T5", "T6", "T7", "T8"] }
];

window.defaultTaxes = {
    cgstActive: true, cgstRate: 2.5,
    sgstActive: true, sgstRate: 2.5,
    serviceActive: false, serviceRate: 5
};

window.menuCategories = JSON.parse(localStorage.getItem('restroflow_menu_' + window.hotelGlobalScopeID)) || window.fallbackMenu;
window.floorData = JSON.parse(localStorage.getItem('restroflow_floors_' + window.hotelGlobalScopeID)) || window.defaultFloors;
window.taxConfig = JSON.parse(localStorage.getItem('restroflow_taxes_' + window.hotelGlobalScopeID)) || window.defaultTaxes;
window.customPaymentQRData = localStorage.getItem('restaurantCustomPaymentQR') || localStorage.getItem('customPaymentQRKey') || "";

// ===================================================================
// 🎯 ATOMIC RESET POINTERS & STATE MONITORS
// ===================================================================
window.clientCurrentActiveTable = localStorage.getItem('restroflow_active_table') || "T1";
window.localLiveRunningBill = JSON.parse(localStorage.getItem('restroflow_live_bill')) || [];
window.maximumClaimedDisc = parseInt(localStorage.getItem('restroflow_max_discount')) || 0;
window.globalRunningInvoiceSumTotal = 0;

console.log("⚙️ Config.js loaded successfully. Global Scope ID:", window.hotelGlobalScopeID);
