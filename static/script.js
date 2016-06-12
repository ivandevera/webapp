$(function(){
	var counter = 0;

	function ajax(loc, val, rval){
		$.ajax({
			url: loc,
			data: "input=" + val + "&replace=" + rval,
			type: 'POST',
			success: function(response){
				repsonse = JSON.stringify(response);
					var read = response.replace(/ObjectId/g, "")
									.replace(/\(|\)/g, "")
									.replace(/'/g, '"');
					var data = JSON.parse(read);
					for(i=0;i<data.length;i++)
					{
						var val = data[i]['input']
						$('#outputTable').append('<tr id="trow'+i+'"><td><h3 id="label'+i+'">'+val+'</h3><input type="text" class="text" id="text'+i+'" style="display:none" value="'+val+'"><input type="hidden" value="'+val+'" id="tdvar'+i+'"></td><td><input type="button" class="edtbtn" id="edt'+i+'" value="Edit"><input type="button" class="delbtn" id="del'+i+'" value="Delete"></td></tr>' )
					}
			},
			error: function(error){
				console.log(error)
			}
		});
	};

	ajax('/get', '0', '0');

	$('#submit').click(function(){
		var val = $('#input').val();
		if (val === 0){
			alert("Text field should not be empty.");
		}
		else
		{
		$('#outputTable').append('<tr id="trow'+counter+'"><td><h3 id="label'+counter+'">'+val+'</h3><input type="text" class="text" id="text'+counter+'" style="display:none" value="'+val+'"><input type="hidden" value="'+val+'" id="tdvar'+counter+'"></td><td><input type="button" class="edtbtn" id="edt'+counter+'" value="Edit"><input type="button" class="delbtn" id="del'+counter+'" value="Delete"></td></tr>')
		counter++;
		var val = $('#input').val();
		ajax('/add', val);
		} 	
	});

	$(document).on('click', '.edtbtn', function(){
		var id = $(this).attr('id')
		id = id.substring(3, id.length);
		btnval = $(this).val();
		if(btnval != 'Done')
		{
			$('#label' + id).hide();
			$('#text' + id).show();
			$('#edt' + id).val('Done');
		}
		else
		{
			var val  = $('#text' + id).val();
			var rval = $('#tdvar' + id).val();
			ajax('/edit', val, rval);
			$('#tdvar' + id).val(val);
			$('#label' + id).text(val);
			$('#label' + id).show();
			$('#text' + id).hide();
			$('#edt' + id).val('Edit');
		}
	});

	$(document).on('click', '.delbtn', function(){
		var id = $(this).attr('id');
		id = id.substring(3, id.length);
		var val = $('#tdvar' + id).val();
		ajax('/delete', val, '0');
		$('#trow' + id).remove();
	});

});