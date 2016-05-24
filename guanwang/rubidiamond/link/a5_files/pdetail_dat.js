// JavaScript Document
var baseUrl	= "http://dubaigoldanddiamonds.com/";
function pdetail_dat(det_id,ptype_id){
	$.ajax({
		url:baseUrl+"home/productDet",
		type:"POST",
		data:"pdet_id="+det_id,		
		success:function(msg){
			pdetail = msg.split('|');			
			$('#gtype').text(pdetail[1]);
			$('#gdtype').text(pdetail[1]);
			$('#mtype').text(pdetail[3]);
			$('#mttype').text(pdetail[3]);
			$('#ptype').text(pdetail[2]);
			$('#pdtype').text(pdetail[2]);
			$('#modelNo').text(pdetail[0]);			
		},
		error:function(){
			alert('Server Busy');
		}
	});
	setTimeout(function() {
		prand_det(ptype_id);
	}, 1000);	
}

function prand_det(ptype_id){
	var pdct_id	= $('#pdct_id').val();
	var dataVals	= pdct_id+'||'+ptype_id;	
	$.ajax({
		url:baseUrl+"home/relatedPdct",
		type:"POST",
		data:"pdats="+dataVals,
		success:function(msg){
			$('#relProducts').html(msg);
			//alert(msg);
		},
		error:function(){
			alert('Server Busy');	
		}
	});
}