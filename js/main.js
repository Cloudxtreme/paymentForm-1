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
BillingForm.prototype.validateField = function( input, errorMessage ){
	
};
BillingForm.prototype.validateForm = function( inputs ){
	
};
BillingForm.prototype.activateSubmit = function(){

};
BillingForm.prototype.pushInfo = function(){
	
};
BillingForm.prototype.displayConfirmation = function(){

};


(function(){

var $info = $("#info"),
	 $confirmation = $("#confirmation"),
	 $form = $("#customer-info"),
	 $inputs = $form.find("input[type='text']");

var billingForm = new BillingForm( $form, $inputs );

$form.on( "change", function(){

});

$form.on( "submit", function( $inputs ){

});


})();