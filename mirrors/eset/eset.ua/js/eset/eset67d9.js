function changeLocale(locale) {
    var location = encodeURIComponent(window.location.href);
    window.location.href = '/main/locale?locale=' + locale + '&backUrl=' + location;
}
function setAdminLocale() {
	window.location.href = '/main/locale?backUrl=&locale=ru';
}
function hideCategory(category) {
	jq('#close-category-' + category).hide();
	jq('#open-category-' + category).show();
	jq('#sub-list-' + category).hide();
}

function showCategory(category) {
	jq('#close-category-' + category).show();
	jq('#open-category-' + category).hide();
	jq('#sub-list-' + category).show();
}

jQuery(document).ready(function(){
	/*
	 * initialize tabs
	 */
	jQuery('.tabs_block').each(function(){
			jQuery(this).find('.tabs a, .sub_tab a').click(function(){
						var links = jQuery(this).parents('ul').find('a'),
							target = jQuery(this).attr('href');
						
						for(var i=0; i<links.length;i++){
							var elem = jQuery(links[i]).attr('href');
							if(elem == target)
								jQuery('.tabs_block '+elem).show();
							else
								jQuery('.tabs_block '+elem).hide();
							
							jQuery(links[i]).removeClass('current');
						}
						jQuery(this).addClass('current');
						
						return false;
			});
	});
	
	jQuery('form#editProfile [data-rel="dep_field"] input:checkbox').change(function(){
		if(jQuery(this).is(':checked')){
			jQuery('form#editProfile [data-rel="rel_field"]').slideDown("slow");
		}else{
			jQuery('form#editProfile [data-rel="rel_field"]').slideUp("slow");
		}
	});
	
	var elem = jQuery('form#editProfile [data-rel="dep_field"] input:checkbox');
	if(elem.is(':checked')) {
		jQuery('form#editProfile [data-rel="rel_field"]').show();
	} 
	
	jQuery('form#editProfile [data-rel="fio_uk_field"] input').focus(function(){
		transcodeUkrToEng(jQuery('form#editProfile [data-rel="fio_ua_field"] input'), this);
	});
	jQuery('form#editProfile [data-res="company_uk_field"] input').focus(function(){
		transcodeUkrToEng(jQuery('form#editProfile [data-res="company_ua_field"] input'), this);
	});
	
	/*jQuery('form#editProfile [data-rel="phone_field"] input').mask("+38 (999) 999-99-99");*/
	
	jQuery('.greyform [data-rel="phone_field"] input').mask("+38 (999) 999-99-99");
	
});

function transcodeUkrToEng(field1,field2){
	if(!field2.value && field1.val()){
		field2.value = field1.val().translit();
	}
}

String.prototype.translit = (function(){
    var L = {
'А':'A','а':'a','Б':'B','б':'b','В':'V','в':'v','Г':'H','г':'h',
'Ґ':'G','ґ':'g',
'Д':'D','д':'d','Е':'E','е':'e','Ж':'Zh','ж':'zh','З':'Z','з':'z',
'И':'Y','и':'y','Й':'Y','й':'i','К':'K','к':'k','І':'I','і':'i',
'Ї':'Yi','ї':'i','Л':'L','л':'l','М':'M','м':'m','Н':'N','н':'n','О':'O','о':'o',
'П':'P','п':'p','Р':'R','р':'r','С':'S','с':'s','Т':'T','т':'t',
'У':'U','у':'u','Ф':'F','ф':'f','Х':'Kh','х':'kh','Ц':'Ts','ц':'ts',
'Ч':'Ch','ч':'ch','Ш':'Sh','ш':'sh','Щ':'Shch','щ':'shch','Ь':'','ь':'','Ъ':'','Ъ':'','Є':'Ye','є':'ie','Ю':'Yu','ю':'iu',
'Я':'Ya','я':'ia',"'":'', '`':'', '’':'','Ы':'', 'ы':''
        },
        r = '',
        k;
    for (k in L) r += k;
    r = new RegExp('[' + r + ']', 'g');
    k = function(a){
        return a in L ? L[a] : '';
    };
    return function(){
        return this.replace('Зг','Zgh').replace('зг','zgh').replace(r, k);
    };
})();

function showAjaxDetailsDialogNew(URL, title, submitButName, closeButname){
	jQuery.get(URL, {
	}, function(data){
		var dialog = jQuery('#details_dialog');
		if(dialog.length == 0)
			jQuery('body').append('<div id="details_dialog"></div>');
		dialog = jQuery('#details_dialog');
		dialog.html(data);
		var dialogButtons = {};
		dialogButtons[submitButName] = function() {
			dialog.dialog('close');
			 jQuery('form#downloadFileForm').ajaxSubmit({
				 success: function(response, status, xhr, el){
					 dialog.dialog('open');
					 dialog.html(response);
				 },
				 error : function(data) {
						alert('Error');
			}
		});
		};
		dialogButtons[closeButname] = function() { 
			jQuery(this).dialog('close'); 
		};
		
		dialog.dialog({
					modal : true,
					resizable: false,
					width: '350px',
					title: title,
					buttons: dialogButtons
		});
		dialog.dialog('open');	
});
};

function ajaxFormSubmit(formId, responseCallback, errorProcessing) {
	jQuery('form#' + formId +' .errormsg >span').hide();

	jQuery('form#'+formId).ajaxSubmit({
		success: function(response, status, xhr, el){
			if (responseCallback != null && (typeof responseCallback == "function")) {
				responseCallback(response);
			}
		},
		error: function(response) {
			if(response.status == 422) {
				var jsonResponse = jQuery.parseJSON(response.responseText);		
				if (errorProcessing && (typeof errorProcessing == "function")) {				
					errorProcessing(formId, jsonResponse);
				} else {				
					for(var i=0; i<jsonResponse.length; i++) {
						var error = jsonResponse[i];

						var elem = jQuery('form#'+formId+' #'+generateSelector(error.code)+' > span');
						if(elem.length == 0) {
							jQuery('form#'+formId+' #'+generateSelector(error.code)).append('<span></span>');
							elem = jQuery('form#'+formId+' #'+generateSelector(error.code)+' > span');
						}

						elem.html(error.message);
						elem.show();
					}				

					var captchaField = jQuery('form#'+formId+' .form_captcha');
					if(captchaField.length > 0) {
						captchaField.find('img').attr('src', '/simpleCaptcha?rnd'+Math.random());
					}
				}				
			}
		}
	});
}

function generateSelector( myid ) {
	return myid.replace( /(:|\.|\[|\])/g, "\\$1" );
}