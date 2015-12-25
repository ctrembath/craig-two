$(document).ready(function () {

	// AUdio Play
$('#one').on('mouseenter', function(){
		$('#audio2').get(0).play();
		$(audio).volume = 0.2;
	});

	$('#four').on('mouseenter', function(){
		$('#audio2').get(0).pause();
	});

	$('#seven').on('mouseenter', function(){
		$('#audio2').get(0).pause();
	});


	// Video Play + Pause
	

	$(function (){
		$('#four').hover(function() {
			$('#videoFour').get(0).play();
		})
	});

	$(function (){
		$('#six').on('mouseenter', function() {
			$('.video4').each(function() {
		    $(this).get(0).pause();
			});
		})
	});

	$(function (){
		$('#three').on('mouseenter', function() {
			$('.video4').each(function() {
		    $(this).get(0).pause();
			});
		})
	});


	$(function (){
		$('#nine').on('mouseenter', function() {
	    $('#videoNine').get(0).play();
		})
	});

	$(function (){
		$('#eight').on('mouseenter', function() {
			$('.video9').each(function() {
		    $(this).get(0).pause();
			});
		})
	});

	$('#six').on('mouseenter', function(){
		$('#audio2').get(0).play();
		$('#audio2').volume = 0.2;
	});

	$('#five').on('mouseenter', function(){
		$('#audio2').get(0).pause();
	});

	$('#seven').on('mouseenter', function(){
		$('#audio2').get(0).pause();
	});

	$("#owl-example").owlCarousel({
		singleItem : true,
		navigation : true
	});

	function play(){
   var audio = document.getElementByTagName("audio");
	   audio.play();
   }
});
