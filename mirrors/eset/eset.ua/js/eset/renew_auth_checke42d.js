var isShowControlMark = false,
	showLastBlockVar = false,
	formValid = false,
	globalKeyLength = 24, // with prefixes(4)
	localKeyLength = 15, // with prefix(1)
	markMinLength = 6,
	markMaxLength = 10,
	disabledControlMark = true,
	reg_prefix,
	reg_key;
			
function checkRegKey(data, formId) {
	var regKey = formId + '#registration_key',
		markKey = formId + '#mark_key';

	jQuery(regKey).addClass("progress").prop( "disabled", true );
	jQuery(markKey).addClass("progress").prop( "disabled", true );
	jQuery(formId + '#prefixControlNumber').prop( "disabled", true );
	jQuery(formId + '#suffixControlNumber').prop( "disabled", true );
			
	jQuery.ajax({
			    url : "/main/boxAjax/checkBox",
			    type: "POST",
			    data : data,
			    dataType: "json",
			    success: function(data) {
			    	jQuery(regKey).removeClass("progress").prop( "disabled", false );
			    	jQuery(markKey).removeClass("progress").prop( "disabled", false );
			    	jQuery(formId + '#prefixControlNumber').prop( "disabled", false );
					jQuery(formId + '#suffixControlNumber').prop( "disabled", false );
			    	
			    	if (data != null) {
			    		if (data.regKeyMess == null) {
			    			// reg key valid, set галочку
			    			if (disabledControlMark == 'true') {
			    				showValidRegKey(formId);
			    			} else {
			    				showValidMark(formId);
			    			}
			    			
			    			// show cases of box prolongation
			    			if (formId == '#activation_old ') {
			    				showLastBlock(data.listFutureLicenseData);
			    			}
			    			
			    			if (formId == '#extendLicenseForm' && data.variantsNewLicense) {
			    				showVariantsLicenseNew(data.variantsNewLicense);
			    				jQuery('#questionMultiKeyBlock').show();
			    			}
			    		} else {
			    			// invalid reg key - show message
			    			jQuery(formId + ".error-mess").show();
			    			jQuery(formId + ".error-mess").html(data.regKeyMess)
					    	formValid = false;
					    	lastError = data.regKeyMess;
			    		}
			    	} else {
			    		console.log('returned data is null from server!!!');
			    	}
			    	
			    },
			    error: function (jqXHR, textStatus, errorThrown) {
			    	console.log('error');
			    	console.log(jqXHR);
			    }
	});
}

function removeErrorStyle(input) {
	var tooltip = input.siblings('div.form_tooltip');
	input.removeClass('errorInput');
	tooltip.removeClass('errorTooltip');
}

function addErrorStyle(input) {
	var tooltip = input.siblings('div.form_tooltip');
	input.addClass('errorInput');
	tooltip.addClass('errorTooltip');
}

function checkAccessed(valueRegKey, useGlobalKey, formId){
	hideMarkBlock(formId);
	if(valueRegKey.length == localKeyLength) {
		var pattern = /^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{10}$/; 
		if(pattern.test(valueRegKey)) {
			reg_prefix = valueRegKey.split('-')[0];
	 		reg_key = valueRegKey.split('-')[1];

	 		//check show or not mark
	 		for (i in prefixesArr) {
				var el = prefixesArr[i];

				if (el.indexOf(reg_prefix) != -1) {
					console.log('prefix valid');
					
					// check show mark or not
					disabledControlMark = eval(el.split('_')[1]);

					globalKey = false;
					if (disabledControlMark == false) {
						//show cnotrol mark
						showMarkBlock(formId);
					} else {
						// check reg code
						jQuery(formId + ' #globalKey').val(false);
						jQuery(formId + ' #disabledControlMark').val(disabledControlMark);
						jQuery(formId + ' #keyPrefix').val(reg_prefix);
						var data = 'reg_prefix=' + reg_prefix +'&reg_key=' + reg_key + '&disabledControlMark=' + disabledControlMark + '&globalKey=false' + '&newLicense=true';

						checkRegKey(data, formId);
					}

					break;
				}

				if (i == prefixesArr.length-1) {
					// there is no prefix match, show error message
					console.log('there is no prefix match, wrong prefix');
				}
			}
		} else {
			console.log('invalid local key');
		}
	} else if (valueRegKey.length == globalKeyLength && useGlobalKey) {
		//global key
		//check reg key
		var pattern = /^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}$/; 
		if(pattern.test(valueRegKey)) {
			globalKey = true;
			var data = 'reg_key=' + valueRegKey + '&disabledControlMark=true' + '&globalKey=true';
			checkRegKey(data, '#extendLicenseForm');

			jQuery(formId + ' #globalKey').val(true);
			jQuery(formId + ' #disabledControlMark').val(true);
		} else {
			//invalid global key, show message
			console.log('invalid global key format');
		}
	}
}

function hideValidMark(formId) {
	jQuery(formId + '#reg-key-info').css("display","inline-block");
	jQuery(formId + '#reg-key-success').css("display","none");
	jQuery(formId + '#mark-info').css("display","inline-block");
	jQuery(formId + '#mark-success').css("display","none");
	formValid = false;
}

function checkMark(formId) {
	jQuery(formId + " .error-mess").hide();

	if (jQuery(formId + " #prefixControlNumber").val() != 'notSelect' 
			&& jQuery(formId + " #suffixControlNumber").val() != 'notSelect'
			&& jQuery(formId + " #mark_key").val().trim().length >=6 && jQuery(formId + " #mark_key").val().trim().length <= 10) {

		var data;
		jQuery(formId + ' #globalKey').val(false);
		jQuery(formId + ' #disabledControlMark').val(disabledControlMark);
		jQuery(formId + ' #keyPrefix').val(reg_prefix);
		data = 'reg_prefix=' + reg_prefix +'&reg_key=' + reg_key +  '&disabledControlMark=' + disabledControlMark + '&prefixControlNumber=' + jQuery(formId+ " #prefixControlNumber").val() +
					'&suffixControlNumber=' + jQuery(formId + " #suffixControlNumber").val() + '&mark_key=' + jQuery(formId + " #mark_key").val().trim()  + '&globalKey=false';

		checkRegKey(data,formId);
	}
}

function showValidMark(formId) {
	jQuery(formId + ' #reg-key-info').css("display","none");
	jQuery(formId + ' #reg-key-success').css("display","inline-block");
	jQuery(formId + ' #mark-info').css("display","none");
	jQuery(formId + ' #mark-success').css("display","inline-block");
	
	removeErrorStyle(jQuery(formId + ' #mark_key'));
	removeErrorStyle(jQuery(formId + ' #registration_key'));
	formValid = true;
	lastError = null;
}

function hideMarkBlock(formId) {
	jQuery(formId + ' #mark input').val('');
	var markPanel = jQuery(formId + ' #mark');
	markPanel.css("display","none");
	isShowControlMark = false;
	showLastBlockVar = false;
	
	var markInput = jQuery(formId + ' #mark_key');
	markInput.off("input");
}

function showMarkBlock(formId) {
	var markPanel = jQuery(formId + ' #mark');
	markPanel.css("display","block");
	isShowControlMark = true;
			
	var markInput = jQuery(formId + ' #mark_key');
	markInput.on("input", function() {
		checkMark(formId);
	});
}

function enableTooltip() {
	jQuery('.form_section, .form_section_chbox').each(function() {
			var elToolA = jQuery(this).children('span.info-icon'),
				elToolD = jQuery(this).children('div.form_tooltip'),
				elToolIn = jQuery(this).children('input, select');

			if (elToolA.length>0 && elToolD.length>0 && elToolIn.length>0){
				jQuery(elToolA)
						.click(function(){return false;})
						.mouseenter(function(){elToolD.fadeIn();})
						.mouseleave(function(){elToolD.fadeOut();});
				jQuery(elToolIn)
						.focus(function(){elToolD.fadeIn();})
						.blur(function(){
									elToolD.fadeOut();
									removeErrorStyle(elToolIn, elToolD);
						});
			}
	});
}