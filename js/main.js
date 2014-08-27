function BillingForm( container, inputs, submit ) {
	this.container = container;
	this.inputs = inputs;
	this.submit = submit;

	this.customerInfo = {};
	this.validation = {
		firstName: false,
		lastName: false,
		streetAddress1: false,
		city: false,
		state: false,
		zip: false
	};
}

BillingForm.prototype.validateField = function( input ){
	var val = input.val(),
		name = input.data('name');

	if ( val ) {
		this.validation[name] = true;

		if ( input.hasClass("cap") ) {
			// Capitalize val
			val = val.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    			return letter.toUpperCase();
			});
			// Replace input val with capitalized value
			input.val(val);
		} else if ( input.hasClass("upper") ) {
			input.val(input.val().toUpperCase());
		}

	} else {
		this.validation[name] = false;
	}
};

BillingForm.prototype.activateSubmit = function(  ){
	// When all fields are properly filled, activate the submit button
	var bfv = this.validation;

	if (bfv.firstName === true && bfv.lastName === true && bfv.streetAddress1 === true && bfv.city === true && bfv.state === true && bfv.zip === true ) {
		
		this.submit.prop('disabled', false);

	} else {
		this.submit.prop('disabled', true);
	}
};

BillingForm.prototype.setInfo = function( obj ){
	// Set info in customerInfo object
	this.customerInfo.firstName = obj.firstName;
	this.customerInfo.lastName = obj.lastName;
	this.customerInfo.email = obj.email;
	this.customerInfo.streetAddress1 = obj.streetAddress1;
	this.customerInfo.streetAddress2 = obj.streetAddress2;
	this.customerInfo.city = obj.city;
	this.customerInfo.state = obj.state;
	this.customerInfo.zip = obj.zip;
};

BillingForm.prototype.displayConfirmation = function( info, confirmation, obj ){
	// Pull info from customerInfo object and display
	obj.firstName.text(this.customerInfo.firstName);
	obj.lastName.text(this.customerInfo.lastName);
	obj.email.text(this.customerInfo.email);
	obj.streetAddress1.text(this.customerInfo.streetAddress1);
	obj.streetAddress2.text(this.customerInfo.streetAddress2);
	obj.city.text(this.customerInfo.city);
	obj.state.text(this.customerInfo.state);
	obj.zip.text(this.customerInfo.zip);

	info.hide();
	confirmation.show();
};


(function(){
// BILLING FORM
var $info = $("#info"),
	 $confirmation = $("#confirmation"),
	 $form = $("#customer-info"),
	 $inputs = $form.find("input.field"),
	 $submit = $form.find("#submit");

var billingForm = new BillingForm( $form, $inputs, $submit );

$confirmation.hide();

$inputs.on( "keyup", function(){
	// Check for all fields to be filled out and activate submit button when they are
	billingForm.validateField( $(this) );
	billingForm.activateSubmit( $submit );
});

$form.on("submit", function(e){
	// Set customer info
	e.preventDefault();
	billingForm.setInfo({
		firstName: $("#first-name").val(),
		lastName: $("#last-name").val(),
		email: $("#email").val(),
		streetAddress1: $("#street-address-1").val(),
		streetAddress2: $("#street-address-2").val(),
		city: $("#city").val(),
		state: $("#state").val(),
		zip: $("#zip").val()
	});
	// Display customer info
	billingForm.displayConfirmation( $info, $confirmation, {
		firstName: $(".info .first-name"),
		lastName: $(".info .last-name"),
		email: $(".info .email"),
		streetAddress1: $(".info .street-address-1"),
		streetAddress2: $(".info .street-address-2"),
		city: $(".info .city"),
		state: $(".info .state"),
		zip: $(".info .zip")
	});
});

// NAVIGATION TOGGLE
var $toggle = $(".nav-toggle"),
	$menu = $(".nav-main ul");

$toggle.on("click", function(){
	$menu.toggle();
});



})();