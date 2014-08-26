function BillingForm( container, inputs ) {
	this.container = container;
	this.inputs = inputs;

	this.customerInfo = {};
	this.validation = {
		firstName: false,
		lastName: false,
		streetAddress1: false,
		city: false,
		state: false,
		zip: false
	};
	this.validated = false;
}

BillingForm.prototype.validateForm = function( inputs ){
	// Iterate through each input and verify valid input
	inputs.each(function( i, input ){
		var name = $(this).data("name"),
			val = $(this).val();

		switch(name) {
			case 'first-name':
				if (val) {
					BillingForm.validation.firstName = true;
				}
				break;
			case 'last-name':
				if (val) {
					BillingForm.validation.lastName = true;
				}
				break;
			case 'street-address-1':
				if (val) {
					BillingForm.validation.streetAddress1 = true;
				}
				break;
			case 'city':
				if (val) {
					BillingForm.validation.city = true;
				}
				break;
			case 'state':
				if (val) {
					BillingForm.validation.state = true;
				}
				break;
			case 'zip':
				if (val) {
					BillingForm.validation.zip = true;
				}
				break;
			default:
				return;
		}
	});
};
BillingForm.prototype.activateSubmit = function(){
	// When all fields are properly filled, activate the submit button
};
BillingForm.prototype.pushInfo = function(){
	// Push info into customerInfo object
};
BillingForm.prototype.displayConfirmation = function(){
	// Pull info from customerInfo object and display
};


(function(){

var $info = $("#info"),
	 $confirmation = $("#confirmation"),
	 $form = $("#customer-info"),
	 $inputs = $form.find("input[type='text']");

var billingForm = new BillingForm( $form, $inputs );

$form.on( "change", function(){
	// Check for all fields to be filled out and activate submit button when they are
});

$form.on( "submit", function(){
	// Validate form

	// Hide form

	// Display confirmation of info
});


})();