/*global $*/
//****** Globals ******//

/* Keeps track of what was the last element that was selected for displaying
 * the admin sections on button click
 */ var lastDisplayedAdminElement = false;
 
/* Number of items displayed on load of pages via AJAX
 */ var itemsPerPage = 12;
	
	var months = new Array();
	months[0] = "Jan";
	months[1] = "Feb";
	months[2] = "Mar";
	months[3] = "Apr";
	months[4] = "May";
	months[5] = "Jun";
	months[6] = "Jul";
	months[7] = "Aug";
	months[8] = "Sep";
	months[9] = "Ocr";
	months[10]= "Nov";
	months[11]= "Dec";

//****** END Globals ******//
$(document).ready(function(event){
	//remove alerts
	$('.alert-close').click(function(event) {
		$(this).parent().slideUp("slow",function(){
			$(this).parent().remove();
		});
	});
	
	$('.more-static-parent').click(function(event){
		$('#more-'+$(this).parent().attr('id')).slideToggle( "slow", function() {});
	});
	$('.more-static').click(function(event){
		$('#more-static-'+$(this).attr('id')).slideToggle("slow", function() {});
	});
});

function resetOnClick(){
	// $('.btn').click(function(event){
	// 	var id = $(this).attr('id');
	// 	if(id == "createElection-button" || id == "editElection-button"
	// 		|| id == "restartElection-button" || id == "deleteElection-button"
	// 		|| id == "startElection-button" || id == "pauseElection-button"
	// 		|| id == "stopElection-button"){
	// 			id = id.split('-');
	// 			id = id[0];
				
	// 			if(lastDisplayedAdminElement){
	// 				$('#'+lastDisplayedAdminElement).slideUp('slow',function(){});
	// 			}
				
	// 			if(id ==  lastDisplayedAdminElement){
	// 				$('#'+id).slideUp('slow',function(){});
	// 				lastDisplayedAdminElement = false;
	// 			}
	// 			else{
	// 				$('#'+id).slideDown('slow',function(){});
	// 				lastDisplayedAdminElement = id;
	// 			}
	// 		}
	// });
	$('.more-dynamic-parent').click(function(event){
		$('#more-dynamic-'+$(this).parent().attr('id')).slideToggle( "slow", function() {});
	});
	$('.more-dynamic').click(function(event){
		$('#more-dynamic-'+$(this).attr('id')).slideToggle("slow", function() {});
	});
}

$(document).ready(function(){
	function z(n){return (n < 10? '0' : '') + n;}
	var date = new Date();
	date = new Date(date.getUTCFullYear() + '-' + z(date.getUTCMonth() + 1) + '-' + 
			z(date.getUTCDate()) + ' ' + z(date.getUTCHours()) + ':' +
			z(date.getUTCMinutes()) + ':' + z(date.getUTCSeconds()));
			
	var clock = $('.clock').FlipClock(date,{  
					clockFace: 'TwentyFourHourClock'
				});
	date = new Date();
	date = date.toUTCString();
	var clock2 = $('.clock2').FlipClock(date,{  
					clockFace: 'TwentyFourHourClock'
				});
	
	$('#election-type').change(function(event) {
		log($(this).val());
		var type = $(this).val();
		if(type == "General Election"){
			$('#squadron-vote-inputs').slideUp("slow",function(){});
			$('#special-election-inputs').slideUp("slow",function(){});
			$('#election-tags-input').slideUp("slow",function(){});
			$('#squadron-id').attr("required",false);
		}else if(type == "Special Election"){
			$('#election-tags-input').slideUp("slow",function(){});
			$('#squadron-vote-inputs').slideUp("slow",function(){});
			$('#special-election-inputs').slideDown("slow",function(){});
			$('#squadron-id').attr("required",false);
		}else if(type == "Squadron Vote"){
			$('#squadron-vote-inputs').slideDown("slow",function(){});
			$('#election-tags-input').slideDown("slow",function(){});
			$('#special-election-inputs').slideUp("slow",function(){});
			$('#squadron-id').attr("required",true);
		}else if(type == "Generic Election"){
			$('#election-tags-input').slideDown("slow",function(){});
			$('#squadron-vote-inputs').slideUp("slow",function(){});
			$('#special-election-inputs').slideUp("slow",function(){});
			$('#squadron-id').attr("required",false);
		}else{
			console.error("Undefined election type: "+type);
		}
	})
	
	
	
	//Colorboxes
	$('.lightbox-btn').colorbox({inline:true, maxWidth:"95%", maxHeight:"95%"});
});


function getTimeRemaining(endtime) {
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	var days = Math.floor(t / (1000 * 60 * 60 * 24));
	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}

function initializeClock(id, endtime) {
	var clock = document.getElementById(id);
	var daysSpan = clock.querySelector('.days');
	var hoursSpan = clock.querySelector('.hours');
	var minutesSpan = clock.querySelector('.minutes');
	var secondsSpan = clock.querySelector('.seconds');

	function updateClock() {
		var t = getTimeRemaining(endtime);

		daysSpan.innerHTML = t.days;
		hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
		minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
		secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

		if (t.total <= 0) {
			clearInterval(timeinterval);
		}
	}

	updateClock();
	var timeinterval = setInterval(updateClock, 1000);
}

function round(value, exp) {
	if (typeof exp === 'undefined' || +exp === 0)
		return Math.round(value);
	value = +value;
	exp = +exp;
	if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
		return NaN;
	// Shift
	value = value.toString().split('e');
	value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));
	// Shift back
	value = value.toString().split('e');
	return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}

function createAlert(type, message){
	return "<div class=\"alert alert-"+type+"\">"+message+"<span class=\"alert-close\"><i class=\"fa fa-times fa-lg\"></i></span></div>\n";
}


function echo(obj){
	alert(obj);
}
function log(obj){
	console.log(obj);
}
function err(obj){
	console.error(obj);
}