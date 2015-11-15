
jQuery(document).ready(function() {
	initHelperDialogs();
	initHelperSliders();
});

var helperSliderPC;
var helperSliderMobile;
function initHelperSliders(){
	helperSliderPC = jQuery("#helperSliderPC").slippry({
		transition: 'fade',
		useCSS: false,
		speed: 500,
		pause: 2000,
		auto: true,
		controls: false,
		preload: 'visible'
	});
	helperSliderMobile = jQuery("#helperSliderMobile").slippry({
		transition: 'fade',
		useCSS: false,
		speed: 500,
		pause: 2000,
		auto: true,
		controls: false,
		preload: 'visible'
	});
}

function initHelperDialogs(){
	jQuery('#showHelperDialogButton').click(function() {
		jQuery('.helperSliderBlockPC').css('display','none');
		jQuery('.helperSliderBlockMobile').css('display','block');
		jQuery('#helperProductTypeBlock input:first').prop('checked', true);
		jQuery('#helperDialogStep1,#helperDialogStep2,#helperDialogStep3').css('display','block');
		jQuery('#helperSearchEmailInfoBlock, #helperSearchPhoneInfoBlock, #helperRequestInfoBlock').empty();
		jQuery('#helperDialogStep1').dialog('open');
		helperSliderMobile.reloadSlider();
	});
	initHelperDialogStep1();
	initHelperDialogStep2();
	initHelperDialogStep3();
	jQuery('#helperSearchPhone, #helperRequestPhone').mask("+38 (999) 999-99-99");
}

function initHelperDialogStep1() {
	jQuery('#helperDialogStep1').dialog({
		autoOpen : false,
		height : 'auto',
		width : 655,
		modal : true,
		position: 'center',
		minHeight: 550,
		resizable : false
	});
	jQuery('#helperDialogStep1ButtonYes').click(function(){
		jQuery('#helperDialogStep1').dialog('close');
	});
	jQuery('#helperDialogStep1ButtonNo').click(function(){
		jQuery('#helperSearchPhone, #helperSearchEmail').val('');
		jQuery('#helperSearchPhone, #helperSearchEmail').show();
		jQuery('#helperSearchPhoneButton, #helperSearchEmailButton').show();
		jQuery('#helperSearchPhoneInfoBlockSuccess, #helperSearchEmailInfoBlockSuccess').hide();
		jQuery('#helperDialogStep1').dialog('close');
		jQuery('#helperDialogStep2').dialog('open');
	});
	
	jQuery('input[type=radio][name=helperProductType]').change(function() {
        if (this.value == 'PC') {
        	jQuery('.helperSliderBlockMobile').css('display','none');
        	jQuery('.helperSliderBlockPC').css('display','block');
        	helperSliderPC.reloadSlider();
        } else {
        	jQuery('.helperSliderBlockMobile').css('display','block');
        	jQuery('.helperSliderBlockPC').css('display','none');
        	helperSliderMobile.reloadSlider();
        } 
    });
}

function initHelperDialogStep2() {
	jQuery('#helperDialogStep2').dialog({
		autoOpen : false,
		height : 'auto',
		width : 600,
		modal : true,
		resizable : false
	});
	jQuery('#helperDialogStep2ButtonYes').click(function(){
		jQuery('#helperDialogStep2').dialog('close');
	});
	jQuery('#helperDialogStep2ButtonNo').click(function(){
		jQuery('#helperDialogStep2').dialog('close');
		jQuery('#helperRequestSendButton').show();
		jQuery('#helperRequestForm').trigger("reset");
		jQuery('#helperDialogStep3').dialog('open');
	});
	jQuery('#helperSearchPhoneButton').click(function(){
		sendLicenseByPhoneOrEmail('#helperSearchPhone', 'helperSearchPhone', '#helperSearchPhoneButton',
								  'sendLicenseByPhone', '#helperSearchPhoneInfoBlock', '#helperSearchPhoneInfoBlockSuccess');
	}); 
	jQuery('#helperSearchEmailButton').click(function(){
		sendLicenseByPhoneOrEmail('#helperSearchEmail', 'helperSearchEmail', '#helperSearchEmailButton', 
								  'sendLicenseByEmail', '#helperSearchEmailInfoBlock', '#helperSearchEmailInfoBlockSuccess');
	});
}

function sendLicenseByPhoneOrEmail(inputId, paramName, buttonId, serviceMethod, infoBlockErrorId, infoBlockSuccessId) {
	var inputValue = jQuery(inputId).val();
	var data = paramName + '=' + inputValue;
	jQuery(buttonId).prop('disabled', true);
	jQuery(infoBlockErrorId).empty();
	jQuery(infoBlockSuccessId).empty();
	jQuery.ajax({
	    url : '/main/helperProlongation/' + serviceMethod,
	    type: 'POST',
	    data : data,
	    dataType: 'json',
	    success: function(data) {
	    	if (data != null && data.error) {
	    		jQuery(infoBlockErrorId).html(data.error);
	    	} else {
	    		jQuery(buttonId).hide();
	    		jQuery(inputId).val('');
	    		jQuery(inputId).hide();
	    		jQuery(infoBlockErrorId).empty();
	    		jQuery(infoBlockSuccessId).html(data.success);
	    		jQuery(infoBlockSuccessId).show();
	    	}
	    	jQuery(buttonId).prop('disabled', false);			    	
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	    	jQuery(buttonId).prop('disabled', false);
	    	console.log('error request');
	    	console.log(jqXHR);
	    }
	});
}

function initHelperDialogStep3() {
	jQuery('#helperDialogStep3').dialog({
		autoOpen : false,
		height : 'auto',
		width : 600,
		modal : true,
		resizable : false
	});
	jQuery('#helperRequestSendButton').click(function(){
		createRequestPhoneCall();
	});
	jQuery('#helperRequestCloseButton').click(function(){
		jQuery('#helperDialogStep3').dialog('close');
	});
}

function createRequestPhoneCall() {
	var buttonId = '#helperRequestSendButton';
	var infoBlockId = '#helperRequestInfoBlock';
	var formId = '#helperRequestForm';
	jQuery(buttonId).prop('disabled', true );
	jQuery(infoBlockId).empty();
	jQuery.ajax({
	    url : '/main/helperProlongation/createRequestPhoneCall',
	    type: 'POST',
	    data : jQuery(formId).serialize(),
	    dataType: 'json',
	    success: function(data) {
	    	if (data != null && data.error) {
	    		jQuery(infoBlockId).removeClass('helperRequestInfoSuccessStyle');
	    		jQuery(infoBlockId).addClass('helperRequestInfoStyleError');
	    		jQuery(infoBlockId).html(data.error);
	    	} else {
	    		jQuery(formId).trigger("reset");
	    		jQuery(infoBlockId).removeClass('helperRequestInfoStyleError');
	    		jQuery(infoBlockId).addClass('helperRequestInfoSuccessStyle');
	    		jQuery(infoBlockId).html(data.success);
	    	}
	    	jQuery(buttonId).prop('disabled', false);			    	
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	    	jQuery(buttonId).prop('disabled', false);
	    	console.log('error request');
	    	console.log(jqXHR);
	    }
	});
}