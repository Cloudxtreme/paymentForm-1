function BillingForm( container, inputs, submit ) {
	this.container = container;
	this.inputs = inputs;
	this.submit = submit;

	this.billingInfo = {};
	this.shippingInfo = {};
	this.validation = {
		firstName:      false,
		lastName:       false,
		email:          false,
		streetAddress1: false,
		city:           false,
		state:          false,
		zip:            false,
		CCNumber:       false,
		CCCVS:          false,
		CCMonth:        false,
		CCYear:         false
	};
}

BillingForm.prototype.validateField = function( input ){
	var val = input.val(),
		name = input.data("name");

	if ( val ) {
		if ( name === "firstName" || name ===  "lastName" || name ===  "email" || name ===  "streetAddress1" || name ===  "city" ) {
			this.validation[name] = true;
			console.log(this.validation);
		}

		if ( input.hasClass("cap") ) {
			// Capitalize val
			val = val.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    			return letter.toUpperCase();
			});
			// Replace input val with capitalized value
			input.val(val);
		} 
		if ( input.hasClass("upper") ) {
			input.val(input.val().toUpperCase());
		}
		// if name = zip || CCNumber || CCmonth || CCyear
		switch(name) {
			case "zip":
				if( val.length === 5 ) {
					this.validation[name] = true;
				}
				break;
			case "state":
				if( val.length === 2 ) {
					this.validation[name] = true;
				}
				break;
			case "CCNumber":
				if( val.length === 16 ) {
					this.validation[name] = true;
				}
				break;
			case "CCMonth":
				if( val.length === 2 ) {
					this.validation[name] = true;
				}
				break;
			case "CCYear":
				if( val.length === 4 ) {
					this.validation[name] = true;
				}
				break;
			default:
				return;
		}
	} else {
		this.validation[name] = false;
	}
};

BillingForm.prototype.cloneInfo = function( input, shippingInfo ){
	if ( input.checked === true ) {
		console.log("is true");
	} else {
		console.log("is false");
	}
};

BillingForm.prototype.activateSubmit = function(  ){
	// When all fields are properly filled, activate the submit button
	var bfv = this.validation;

	if (bfv.firstName === true && bfv.lastName === true && bfv.streetAddress1 === true && bfv.city === true && bfv.state === true && bfv.zip === true && bfv.CCNumber === true && bfv.CCCVS === true  && bfv.CCMonth === true && bfv.CCYear === true) {
		
		this.submit.prop('disabled', false);

	} else {
		this.submit.prop('disabled', true);
	}
};

BillingForm.prototype.setInfo = function( billingInfo, shippingInfo ){
	// Set info in billingInfo object
	this.billingInfo.firstName =       billingInfo.firstName;
	this.billingInfo.lastName =        billingInfo.lastName;
	this.billingInfo.email =           billingInfo.email;
	this.billingInfo.streetAddress1 =  billingInfo.streetAddress1;
	this.billingInfo.streetAddress2 =  billingInfo.streetAddress2;
	this.billingInfo.city =            billingInfo.city;
	this.billingInfo.state =           billingInfo.state;
	this.billingInfo.zip =             billingInfo.zip;
	this.billingInfo.CCNumber =        billingInfo.CCNumber;
	this.billingInfo.CCCVS =           billingInfo.CCCVS;
	this.billingInfo.CCMonth =         billingInfo.CCMonth;
	this.billingInfo.CCYear =          billingInfo.CCYear;

	// Set info in shippingInfo object
	this.shippingInfo.firstName =      shippingInfo.firstName;
	this.shippingInfo.lastName =       shippingInfo.lastName;
	this.shippingInfo.streetAddress1 = shippingInfo.streetAddress1;
	this.shippingInfo.streetAddress2 = shippingInfo.streetAddress2;
	this.shippingInfo.city =           shippingInfo.city;
	this.shippingInfo.state =          shippingInfo.state;
	this.shippingInfo.zip =            shippingInfo.zip;
};

BillingForm.prototype.displayConfirmation = function( info, confirmation, billingInfo, shippingInfo ){
	// Set info from billingInfo object and display
	billingInfo.firstName.text(this.billingInfo.firstName);
	billingInfo.lastName.text(this.billingInfo.lastName);
	billingInfo.email.text(this.billingInfo.email);
	billingInfo.streetAddress1.text(this.billingInfo.streetAddress1);
	billingInfo.streetAddress2.text(this.billingInfo.streetAddress2);
	billingInfo.city.text(this.billingInfo.city);
	billingInfo.state.text(this.billingInfo.state);
	billingInfo.zip.text(this.billingInfo.zip);
	billingInfo.CCNumber.text("XXXX-XXXX-XXXX-" + this.billingInfo.CCNumber.substring(12,16));
	billingInfo.CCCVS.text(this.billingInfo.CCCVS);
	billingInfo.CCMonth.text(this.billingInfo.CCMonth);
	billingInfo.CCYear.text(this.billingInfo.CCYear);

	shippingInfo.firstName.text(this.shippingInfo.firstName);
	shippingInfo.lastName.text(this.shippingInfo.lastName);
	shippingInfo.streetAddress1.text(this.shippingInfo.streetAddress1);
	shippingInfo.streetAddress2.text(this.shippingInfo.streetAddress2);
	shippingInfo.city.text(this.shippingInfo.city);
	shippingInfo.state.text(this.shippingInfo.state);
	shippingInfo.zip.text(this.shippingInfo.zip);

	info.hide();
	confirmation.show();
};


(function(){
// BILLING FORM /////////////////////////////////////
var $info =         $("#info"),
	 $confirmation = $("#confirmation"),
	 $billingForm =  $("#billing-info"),
	 $inputs =       $billingForm.find("input.field"),
	 $clone =        $billingForm.find("#clone"),
	 $submit =       $billingForm.find("#submit");

var billingForm = new BillingForm( $billingForm, $inputs, $submit );

// $confirmation.hide();

$inputs.on( "keyup", function(){
	// Check for all fields to be filled out and activate submit button when they are
	billingForm.validateField( $(this) );
	billingForm.activateSubmit( $submit );
});

// Clone shipping address from billing address
$clone.change(function(){
	billingForm.cloneInfo(this)
});

$billingForm.on("submit", function(e){
	// Set customer info
	e.preventDefault();
	billingForm.setInfo({
		firstName:      $("#first-name").val(),
		lastName:       $("#last-name").val(),
		email:          $("#email").val(),
		streetAddress1: $("#street-address-1").val(),
		streetAddress2: $("#street-address-2").val(),
		city:           $("#city").val(),
		state:          $("#state").val(),
		zip:            $("#zip").val(),
		CCNumber:       $("#CC-number").val(),
		CCCVS:          $("#CC-CVS").val(),
		CCMonth:        $("#CC-month").val(),
		CCYear:         $("#CC-year").val()
	});
	// Display customer info
	billingForm.displayConfirmation( $info, $confirmation, {
		firstName:      $(".info .first-name"),
		lastName:       $(".info .last-name"),
		email:          $(".info .email"),
		streetAddress1: $(".info .street-address-1"),
		streetAddress2: $(".info .street-address-2"),
		city:           $(".info .city"),
		state:          $(".info .state"),
		zip:            $(".info .zip"),
		CCNumber:       $(".info .CC-number"),
		CCCVS:          $(".info .CC-CVS"),
		CCMonth:        $(".info .CC-month"),
		CCYear:         $(".info .CC-year")
	},{
		firstName:      $(".info .shipping-first-name"),
		lastName:       $(".info .shipping-last-name"),
		email:          $(".info .shipping-email"),
		streetAddress1: $(".info .shipping-street-address-1"),
		streetAddress2: $(".info .shipping-street-address-2"),
		city:           $(".info .shipping-city"),
		state:          $(".info .shipping-state"),
		zip:            $(".info .shipping-zip")
	});
});

// NAVIGATION TOGGLE ////////////////////////////////
var $toggle = $(".nav-toggle"),
	$menu = $(".nav-main ul");

$toggle.on("click", function(){
	$menu.toggle();
});



})();