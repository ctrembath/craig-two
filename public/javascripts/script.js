$(document).ready(function () {

	// Video Play + Pause
	

	$(function (){
		$('#four').hover(function() {
			$('#videoFour').get(0).play();
		})
	});

	$(function (){
		$('#five').on('mouseenter', function() {
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
		$('#ten').on('mouseenter', function() {
			$('.video9').each(function() {
		    $(this).get(0).pause();
			});
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
		$('#audio1').get(0).pause();
	});

	$('#six').on('mouseenter', function(){
		$('#audio1').get(0).pause();
	});

	$("#owl-example").owlCarousel({
	    singleItem : true,
	});

	function play(){
       var audio = document.getElementById("audio2");
       audio.play();
                 }

});
