"use strict";

$(document).ready(function () {

    $("#CircleForm").validate();

    $("#btnSubmitCalculate").click(function () {
        circleCalculations();
    });

    $("#btnSubmitClear").click(function () {
        ClearForm();
    });

});

function circleCalculations() {
    if ($("#CircleForm").valid()) {

        let radius = document.getElementById("radius").value;
        let radiusfp = parseFloat(radius);

        let diameter = calculateDiameter(radiusfp);
        document.getElementById("diameter").innerHTML = diameter.toFixed(2);

        let circumference = calculateCirumference(radiusfp);
        document.getElementById("circumference").innerHTML = circumference.toFixed(2);

        let area = calculateArea(radiusfp);
        document.getElementById("area").innerHTML = area.toFixed(2);
    }
}

function calculateDiameter(radius) {
    return (2 * radius);
}

function calculateCirumference(radius) {
    return (2 * Math.PI * radius);
}

function calculateArea(radius) {
    return (Math.PI * radius * radius);
}

function ClearForm() {
    document.getElementById("CircleForm").reset();
    document.getElementById("diameter").innerHTML = "";
    document.getElementById("circumference").innerHTML = "";
    document.getElementById("area").innerHTML = "";
}