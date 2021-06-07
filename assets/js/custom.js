var api_config = {
        api_url: 'https://api.rainforestapi.com/request?',
        key: 'DCB3BF6BB3AA413FB526F0736361B321',
        type: 'product',
        amazonDomain: 'amazon.com'
    },
    fbaCalculator = {
        formId: '#fba-calculator-form',
        formFields: {
            numberOfOrders: '#fba-avg-count-orders',
            width: '#fba-width',
            height: '#fba-height',
            length: '#fba-length',
            averageSalePricePerItem: '#fba-avg-price',
            averageItemsPerOrder: '#fba-avg-count-units',
            averageItemWeight: '#fba-avg-weight',
            averageProductionCost: '#fba-avg-production-cost'
        },
        resultFields: {
            revenue: {
                orderRevenue: '#fba-result-order-revenue',
                sellerFee: '#fba-result-seller-fee',
                netRevenue: '#fba-result-net-revenue'
            },
            costs: {
                productionCost: '#fba-result-production-cost',
                fulfillmentCost: '#fba-result-fulfillment-cost',
                storage: '#fba-result-storage',
                fulfillment: '#fba-result-fulfillment',
                monthlyPlatformCost: '#fba-result-monthly-platform-cost',
                totalCost: '#fba-result-total-cost'
            },
            profit: {
                profitMargin: '#fba-result-profit-margin',
                totalProfit: '#fba-result-total-profit'
            }

        }
    };

$('#asinForm').submit(function (e) {
    e.preventDefault();
    var asinNumber = $('#asinNumber').val();

    loadAPIProductData(asinNumber);
    // loadJSONProductData();

});

function loadAPIProductData(asinNumber) {
    var url = api_config.api_url;
    url += "api_key=" + api_config.key;
    url += "&type=" + api_config.type;
    url += "&amazon_domain=" + api_config.amazonDomain;
    url += "&asin=" + asinNumber;

    startProgressBar();
    $.ajax({    //create an ajax request to product data
        url: url,
        type: "GET",
        dataType: "JSON",   //expect html to be returned
        success: function (response) {
            if (response.success === false) {
                alert("An error occurred: " & response.errorMessage);

            } else if (response.product) {
                progress.innerHTML = "100%";
                document.documentElement.style.setProperty("--percentage", '100%');
                loadProductData(response.product);
            } else if (response.request_info) {
                var errorMessage = '<div class="alert alert-danger" role="alert">';
                errorMessage += response.request_info.message;
                errorMessage += '</div>';
                $('#formError').html(errorMessage);

                $('#formError').css("display", "block");
                $("#product-data").css("display", "none");
                
                stopProgressBar();
            }


            // $("#productCode").html(response.message);

            //alert(response);

        },
        error: function (error) {
            $('#formError').css("display", "block");
            var errorMessage = '<div class="alert alert-danger" role="alert">';
            if (error.responseJSON && error.responseJSON.request_info && error.responseJSON.request_info.message) {
                $('#formError').css("display", "block");
                errorMessage += error.responseJSON.request_info.message;
                console.log(error.responseJSON.request_info.message);
            }

            errorMessage += '</div>';
            $('#formError').html(errorMessage);
            $("#product-data").css("display", "none");
            stopProgressBar();

        }
    });
}

function loadJSONProductData() {
    startProgressBar();
    $.getJSON("assets/json/product.json", function (data) {
        loadProductData(data);
        setTimeout(function () {
            $("#product-data").css("display", "block");
            stopProgressBar();
        }, 1000);

    });
}

function loadProductData(product) {
    $("#productCode").html("ASIN: " + product.asin);
    var mainImg = product.main_image.link;
    $("#productImg").html('<img class="fba-product-image" alt="' + product.asin + '" src="' + mainImg + '" >');
    $("#productImg2").html('<img class="fba-product-image" alt="' + product.asin + '" src="' + mainImg + '" >');

    $("#Ptitle").html("<strong>Product Title:</strong> " + (product.title || "No title found."));
    product.description = product.description.replace('PRODUCT DESCRIPTION', '');
    $("#Pdescription").html("<strong>Product Description:</strong> " + (product.description || "No description found."));
    
    $("#brand").html(product.brand);
    $("#ASIN").html(product.asin);
    $("#fbaProfitAsin").html("ASIN: " + product.asin);

    $("#raing").html(product.rating);
    $("#tRating").html(product.ratings_total);
    $("#manu").html(product.manufacturer);
    $("#rDate").html(product.release_date);


    fillFormData(product);
    $("#formError").css("display", "none");
    $("#product-data").css("display", "block");
    stopProgressBar();
}

function fillFormData(product) {
    var dimensionsObj = product.specifications.find(elem => elem.name == 'Product Dimensions');
    if (dimensionsObj) {
        var dimensions = dimensionsObj.value,
            dimensionsArr = dimensions.split(';');
        $("#dimension").html(dimensionsArr[0]);
        $("#weight").html(dimensionsArr[1]);

        dimensions = dimensionsArr[0].replace(' inches', '');

        dimensions = dimensions.split(' x ');
        var height = dimensions[0],
            width = dimensions[1],
            length = dimensions[2],
            weight = dimensionsArr[1].replace(' Pounds', '');
        weight = weight.replace(' ', '');

        $(fbaCalculator.formFields.averageItemWeight).val(weight);
        $(fbaCalculator.formFields.width).val(width);
        $(fbaCalculator.formFields.height).val(height);
        $(fbaCalculator.formFields.length).val(length);

    } else if (dimensionsObj = product.specifications.find(elem => elem.name == 'Package Dimensions')) {
        var dimensions = dimensionsObj.value,
            dimensionsArr = dimensions.split(';');
        $("#dimension").html(dimensionsArr[0]);

        dimensions = dimensionsArr[0].replace(' inches', '');
        dimensions = dimensions.split(' x ');
        var height = dimensions[0],
            width = dimensions[1],
            length = dimensions[2];

        $(fbaCalculator.formFields.width).val(width);
        $(fbaCalculator.formFields.height).val(height);
        $(fbaCalculator.formFields.length).val(length);
        var weightObj = product.specifications.find(elem => elem.name == 'Item Weight');
        if (weightObj) {

            var weight = weightObj.value;
            $("#weight").html(weight);
            weight = weight.replace(' ounces', '');
            weight = weight * 0.0625;
            $("#weight").html(weight + ' Pounds');
            $(fbaCalculator.formFields.averageItemWeight).val(weight);
        } else {
            $(fbaCalculator.formFields.averageItemWeight).val('');
        }
    } else {
        $(fbaCalculator.formFields.averageItemWeight).val('');
        $(fbaCalculator.formFields.width).val('');
        $(fbaCalculator.formFields.height).val('');
        $(fbaCalculator.formFields.length).val('');
    }
}

var progressBarInterval = [],
    percentage = 0;
    progress = document.getElementById("fba-progress-bar");



function startProgressBar() {
    clearInterval(progressBarInterval);
    percentage = 0;
    progress.innerHTML = percentage + "%";
    
    document.documentElement.style.setProperty("--percentage", `${percentage}%`);
    $("#data-loader").css("display", "block");
    startProgressBarInterval();
}

function stopProgressBar() {
    $("#data-loader").css("display", "none");
    clearInterval(progressBarInterval);
}

// Progress bar code start


function startProgressBarInterval() {
    progressBarInterval = setInterval(function () {
        percentage = percentage + 10;
        document.documentElement.style.setProperty("--percentage", `${percentage}%`);
        progress.innerHTML = percentage + "%";

        if (percentage === 100) {
            clearInterval(progressBarInterval);
        }

    }, 1000);
}

