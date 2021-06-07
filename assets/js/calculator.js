var O = {
        STANDARD_SMALL_0_TO_H: 1,
        STANDARD_SMALL_H_TO_1: 2,
        STANDARD_LARGE_0_TO_H: 3,
        STANDARD_LARGE_H_TO_1: 4,
        STANDARD_LARGE_1_TO_2: 5,
        STANDARD_LARGE_2_TO_3: 6,
        STANDARD_LARGE_3_PLUS: 7,
        OVERSIZE_SMALL: 8,
        OVERSIZE_MEDIUM: 9,
        OVERSIZE_LARGE: 10,
        OVERSIZE_SPECIAL: 11
    },
    P = {},
    C = {},
    L = [
        O.STANDARD_SMALL_0_TO_H,
        O.STANDARD_SMALL_H_TO_1,
        O.STANDARD_LARGE_0_TO_H,
        O.STANDARD_LARGE_H_TO_1,
        O.STANDARD_LARGE_1_TO_2,
        O.STANDARD_LARGE_2_TO_3,
        O.STANDARD_LARGE_3_PLUS,
        O.OVERSIZE_SMALL,
        O.OVERSIZE_MEDIUM,
        O.OVERSIZE_LARGE,
        O.OVERSIZE_SPECIAL
    ],
    E = [
        {min: null, max: .5, cost: 4.4}, {min: .5, max: 1, cost: 5.46}, {
            min: 1, max: 2, cost: 9.95
        }, {min: 2, max: 3, cost: 11.03}, {min: 3, max: 4, cost: 13.99}, {min: 4, max: 5, cost: 14.26}, {
            min: 5, max: 6, cost: 14.54
        }, {min: 6, max: 7, cost: 14.54}, {min: 7, max: 8, cost: 15.35}, {min: 8, max: 9, cost: 15.35}, {
            min: 9, max: 10, cost: 16.15
        }, {min: 10, max: 11, cost: 16.43}, {min: 11, max: 12, cost: 16.96}, {min: 12, max: 13, cost: 17.23}, {
            min: 13, max: 14, cost: 17.77
        }, {min: 14, max: 15, cost: 18.04}, {min: 15, max: 16, cost: 18.85}, {min: 16, max: 17, cost: 18.85}, {
            min: 17, max: 18, cost: 19.12
        }, {min: 18, max: 19, cost: 20.3}, {min: 19, max: 20, cost: 21.33}, {min: 20, max: null, cost: null}
    ],
    T = {
        PER_POUND_THRESHOLD_COST: .38,
        PER_POUND_THRESHOLD: 2,
        FulfillmentFees: {
            STANDARD: 4.4,
            HALF_POUND_MAX: 5.46,
            ONE_TO_TWO_POUNDS: 9.95,
            TWO_OR_MORE_POUNDS: 11.03
        },
        StorageFees: .83,
        PlatformFees: {
            SHOPIFY: {monthly: 79, perTransactionPercent: .026, perTransactionDollar: .3},
            ADVANCED_SHOPIFY: {monthly: 299, perTransactionPercent: .024, perTransactionDollar: .3}
        },
        FulfillmentCostByWeight: E
    };


function init() {
    setPValue();
    setCValue();
}

function setPValue() {

    P[O.STANDARD_SMALL_0_TO_H] = {
        Short: .75,
        Median: 12,
        Long: 15,
        LongPlusGirth: null,
        Weight: .625
    };
    P[O.STANDARD_SMALL_H_TO_1] = {
        Short: .75,
        Median: 12,
        Long: 15,
        LongPlusGirth: null,
        Weight: 1
    };
    P[O.STANDARD_LARGE_0_TO_H] = {
        Short: 8,
        Median: 14,
        Long: 18,
        LongPlusGirth: null,
        Weight: .625
    };
    P[O.STANDARD_LARGE_H_TO_1] = {
        Short: 8,
        Median: 14,
        Long: 18,
        LongPlusGirth: null,
        Weight: 1
    };
    P[O.STANDARD_LARGE_1_TO_2] = {
        Short: 8,
        Median: 14,
        Long: 18,
        LongPlusGirth: null,
        Weight: 2
    };
    P[O.STANDARD_LARGE_2_TO_3] = {
        Short: 8,
        Median: 14,
        Long: 18,
        LongPlusGirth: null,
        Weight: 3
    };
    P[O.STANDARD_LARGE_3_PLUS] = {
        Short: 8,
        Median: 14,
        Long: 18,
        LongPlusGirth: null,
        Weight: 21
    };
    P[O.OVERSIZE_SMALL] = {
        Short: null,
        Median: 30,
        Long: 60,
        LongPlusGirth: 130,
        Weight: 71
    };
    P[O.OVERSIZE_MEDIUM] = {
        Short: null,
        Median: null,
        Long: 108,
        LongPlusGirth: 130,
        Weight: 151
    };
    P[O.OVERSIZE_LARGE] = {
        Short: null,
        Median: null,
        Long: 108,
        LongPlusGirth: 165,
        Weight: 151
    };
    P[O.OVERSIZE_SPECIAL] = {
        Short: null,
        Median: null,
        Long: null,
        LongPlusGirth: null,
        Weight: null
    };
}

function setCValue() {
    C['PER_POUND_THRESHOLD_COST'] = 0.38;
    C['PER_POUND_THRESHOLD'] = 2;
    C['FulfillmentFees'] = {};
    C['FulfillmentFees'][O.STANDARD_SMALL_0_TO_H] = 2.41;
    C['FulfillmentFees'][O.STANDARD_SMALL_H_TO_1] = 2.48;
    C['FulfillmentFees'][O.STANDARD_LARGE_0_TO_H] = 3.19;
    C['FulfillmentFees'][O.STANDARD_LARGE_H_TO_1] = 3.28;
    C['FulfillmentFees'][O.STANDARD_LARGE_1_TO_2] = 4.76;
    C['FulfillmentFees'][O.STANDARD_LARGE_2_TO_3] = 5.26;
    C['FulfillmentFees'][O.STANDARD_LARGE_3_PLUS] = 5.26;
    C['FulfillmentFees'][O.OVERSIZE_SMALL] = 8.26;
    C['FulfillmentFees'][O.OVERSIZE_MEDIUM] = 9.79;
    C['FulfillmentFees'][O.OVERSIZE_LARGE] = 75.78;
    C['FulfillmentFees'][O.OVERSIZE_SPECIAL] = 137.32;


    C['FulfillmentPlusFees'] = {};
    C['FulfillmentPlusFees'][O.STANDARD_SMALL_0_TO_H] = 0;
    C['FulfillmentPlusFees'][O.STANDARD_SMALL_H_TO_1] = 0;
    C['FulfillmentPlusFees'][O.STANDARD_LARGE_0_TO_H] = 0;
    C['FulfillmentPlusFees'][O.STANDARD_LARGE_H_TO_1] = 0;
    C['FulfillmentPlusFees'][O.STANDARD_LARGE_1_TO_2] = 0;
    C['FulfillmentPlusFees'][O.STANDARD_LARGE_2_TO_3] = 0;
    C['FulfillmentPlusFees'][O.STANDARD_LARGE_3_PLUS] = .38;
    C['FulfillmentPlusFees'][O.OVERSIZE_SMALL] = .38;
    C['FulfillmentPlusFees'][O.OVERSIZE_MEDIUM] = .39;
    C['FulfillmentPlusFees'][O.OVERSIZE_LARGE] = .79;
    C['FulfillmentPlusFees'][O.OVERSIZE_SPECIAL] = .91;

    C['FulfillmentPlusBorder'] = {};

    C['FulfillmentPlusBorder'][O.STANDARD_SMALL_0_TO_H] = 0;
    C['FulfillmentPlusBorder'][O.STANDARD_SMALL_H_TO_1] = 0;
    C['FulfillmentPlusBorder'][O.STANDARD_LARGE_0_TO_H] = 0;
    C['FulfillmentPlusBorder'][O.STANDARD_LARGE_H_TO_1] = 0;
    C['FulfillmentPlusBorder'][O.STANDARD_LARGE_1_TO_2] = 0;
    C['FulfillmentPlusBorder'][O.STANDARD_LARGE_2_TO_3] = 0;
    C['FulfillmentPlusBorder'][O.STANDARD_LARGE_3_PLUS] = 3;
    C['FulfillmentPlusBorder'][O.OVERSIZE_SMALL] = 2;
    C['FulfillmentPlusBorder'][O.OVERSIZE_MEDIUM] = 2;
    C['FulfillmentPlusBorder'][O.OVERSIZE_LARGE] = 90;
    C['FulfillmentPlusBorder'][O.OVERSIZE_SPECIAL] = 90;

    C['StorageFees'] = {};
    C['StorageFees'][O.STANDARD_SMALL_0_TO_H] = .69;
    C['StorageFees'][O.STANDARD_SMALL_H_TO_1] = .69;
    C['StorageFees'][O.STANDARD_LARGE_0_TO_H] = .69;
    C['StorageFees'][O.STANDARD_LARGE_H_TO_1] = .69;
    C['StorageFees'][O.STANDARD_LARGE_1_TO_2] = .69;
    C['StorageFees'][O.STANDARD_LARGE_2_TO_3] = .69;
    C['StorageFees'][O.STANDARD_LARGE_3_PLUS] = .69;
    C['StorageFees'][O.OVERSIZE_SMALL] = .48;
    C['StorageFees'][O.OVERSIZE_MEDIUM] = .48;
    C['StorageFees'][O.OVERSIZE_LARGE] = .48;
    C['StorageFees'][O.OVERSIZE_SPECIAL] = .48;
}


function getFBAData() {
    var data = {};
    data['numberOfOrders'] = parseInt($(fbaCalculator.formFields.numberOfOrders).val());
    data['width'] = parseFloat($(fbaCalculator.formFields.width).val());
    data['height'] = parseFloat($(fbaCalculator.formFields.height).val());
    data['length'] = parseFloat($(fbaCalculator.formFields.length).val());
    data['averageSalePricePerItem'] = parseFloat($(fbaCalculator.formFields.averageSalePricePerItem).val());
    data['averageItemsPerOrder'] = parseInt($(fbaCalculator.formFields.averageItemsPerOrder).val());
    data['averageItemWeight'] = parseFloat($(fbaCalculator.formFields.averageItemWeight).val());
    data['averageProductionCost'] = parseFloat($(fbaCalculator.formFields.averageProductionCost).val());

    return data;
}

$(fbaCalculator.formId).submit(function (e) {
    e.preventDefault();
    var data = getFBAData();

    var results = getInitialResults(data);
    results = fbaCalculatorP1(data, results);
    displayResults(results);



});

function getInitialResults(data) {
    var results = {};
    results.averageVolumeInCubicFeet = data.length * data.width * data.height / Math.pow(12, 3);
    results.storageCost = data.numberOfOrders;
    results.revenue = {};
    results.revenue.orderRevenue = data.averageSalePricePerItem * data.numberOfOrders * data.averageItemsPerOrder;
    results.revenue.sellerFees = 0;
    results.costs = {};
    results.costs.productionCost = data.averageProductionCost * data.numberOfOrders * data.averageItemsPerOrder
    results.costs.storage = 0;
    results.costs.monthlyPlatformCost = 0;
    results.costs.fulfillment = 0;
    results.profit = {};

    return results;
}

function calculateNetRevenue(results) {
    return results.revenue.orderRevenue - results.revenue.sellerFees || 0
}

function calculateFulfillmentCost(results) {
    return results.costs.storage + results.costs.fulfillment || 0
}

function calculateTotalCost(results) {
    return results.costs.monthlyPlatformCost + calculateFulfillmentCost(results) + results.costs.productionCost || 0
}

function calculateTotalProfit(results) {
    return calculateNetRevenue(results) - calculateTotalCost(results) || 0
}

function calculateProfitMargin(results) {
    return calculateTotalProfit(results) / results.revenue.orderRevenue * 100;
}

function fbaCalculatorP1(data, results) {
    var n = [data.length, data.width, data.height];

    if (n.includes(null) || n.includes(0)) {
        alert('All Dimensions Must be Greater than 0');
    } else {

        n.sort();

        for (var i = parseFloat(n[0]), o = parseFloat(n[1]), r = parseFloat(n[2]), s = r + 2 * (o + i), l = data.averageItemWeight, u = 0; u < L.length; u++) {

            var c = L[u], d = P[c];
            if (!(d.Short && i > d.Short) && (!(d.Medium && o > d.Medium) && !(d.Long && r > d.Long) && !(d.LongPlusGirth && s > d.LongPlusGirth) && !(d.Weight && l > d.Weight))) {
                results.stdWeightCategory = c;
                break
            }
        }

        results.costs.storage = results.storageCost * results.averageVolumeInCubicFeet * C.StorageFees[results.stdWeightCategory];

        var v = C.FulfillmentFees[results.stdWeightCategory];
        if (C.FulfillmentPlusFees[results.stdWeightCategory] > 0 && l > C.FulfillmentPlusBorder[results.stdWeightCategory]) {
            write_console("plus fee", C.FulfillmentPlusFees[results.stdWeightCategory]);
            write_console("plus border", C.FulfillmentPlusBorder[results.stdWeightCategory]);
            write_console("add amount", l - C.FulfillmentPlusBorder[results.stdWeightCategory]);
            v += (l - C.FulfillmentPlusBorder[a.stdWeightCategory]) * C.FulfillmentPlusFees[a.stdWeightCategory];
        }

        results.costs.fulfillment = data.averageItemsPerOrder * data.numberOfOrders * v;
        results.revenue.sellerFees = .15 * results.revenue.orderRevenue;

        results.fulfillmentCost = calculateFulfillmentCost(results);
        results.netRevinue = calculateNetRevenue(results);
        results.totalCost = calculateTotalCost(results);
        results.totalProfit = calculateTotalProfit(results);
        results.profitMargin = calculateProfitMargin(results);
        write_console(results);
        return results;
    }
}

function fbaCalculatorP2(data, results) {

    //////////////////////
    results.revenue.sellerFees = results.revenue.orderRevenue * T.PlatformFees.SHOPIFY.perTransactionPercent + data.numberOfOrders * T.PlatformFees.SHOPIFY.perTransactionDollar;
    results.costs.storage = results.storageCost * results.averageVolumeInCubicFeet * T.StorageFees;

    n = data.averageItemWeight;
    i = data.length * data.width * data.height / 166;

    o = Math.max(i, n);
    write_console(results);

    r = T.FulfillmentCostByWeight.find(function (results) {
        return (null === results.min || o > results.min) && (null === results.max || o <= results.max)
    });
    write_console('---- r ----');
    write_console(r);

    results.costs.fulfillment = r ? t.countOrders.value * r.cost : 0;
    results.costs.monthlyPlatformCost = T.PlatformFees.SHOPIFY.monthly;
    return results;
}

function displayResults(results){
    // Display Revenue
    $(fbaCalculator.resultFields.revenue.orderRevenue).html(results.revenue.orderRevenue.toFixed(2));
    $(fbaCalculator.resultFields.revenue.sellerFee).html(results.revenue.sellerFees.toFixed(2));
    $(fbaCalculator.resultFields.revenue.netRevenue).html(results.netRevinue.toFixed(2));

    // Display Costs
    $(fbaCalculator.resultFields.costs.productionCost).html(results.costs.productionCost.toFixed(2));
    $(fbaCalculator.resultFields.costs.fulfillmentCost).html(results.fulfillmentCost.toFixed(2));
    $(fbaCalculator.resultFields.costs.storage).html(results.costs.storage.toFixed(2));
    $(fbaCalculator.resultFields.costs.fulfillment).html(results.costs.fulfillment.toFixed(2));
    $(fbaCalculator.resultFields.costs.monthlyPlatformCost).html(results.costs.monthlyPlatformCost.toFixed(2));
    $(fbaCalculator.resultFields.costs.totalCost).html(results.totalCost.toFixed(2));

    // Display Profits
    $(fbaCalculator.resultFields.profit.totalProfit).html(results.totalProfit.toFixed(2));
    $(fbaCalculator.resultFields.profit.profitMargin).html(results.profitMargin.toFixed(2));

}
function write_console(variable) {
    var debug = true;
    if (debug) {
        console.log(variable);
    }
}

$(document).ready(function () {
    init();
});
