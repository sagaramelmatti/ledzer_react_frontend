
function get_taxable_amt(rateval, quantityval) {
	var taxableamount = parseFloat(rateval) * parseFloat(quantityval);
	return taxableamount;
}

function get_item_total(taxableamount, taxableamountpre) {
	var item_total_val = ((parseFloat($('#item_total').val()) - taxableamountpre) + parseFloat(taxableamount));
	return item_total_val;
}

function get_single_item_tax(taxableamount, gst_rate) {
	var single_item_tax_value = (parseFloat(taxableamount) / 100) * parseFloat(gst_rate);
	return single_item_tax_value;
}

function get_item_tax(single_item_tax_value, old_single_item_tax_value) {
	var item_tax_val = ((parseFloat($('#item_tax').val()) - old_single_item_tax_value) + parseFloat(single_item_tax_value));
	return item_tax_val;
}

function get_bill_total(item_total_value , item_tax_value) {
	var bill_total_val = 0.00;
	//var gst_included_value = $('#is_gst_included').val();
	var gst_included_value = $("input[type='radio'][name='is_gst_included']:checked").val();
	if (gst_included_value == 'N') {
		bill_total_val = parseFloat(item_total_value) + parseFloat(item_tax_value);
	} else {
		bill_total_val = parseFloat(item_total_value);
	}
	return bill_total_val;
}

function set_previous_values(rateval, gstval, invoiceDetails) {
	invoiceDetails['ratePre'].val(rateval);
	invoiceDetails['gstPre'].val(gstval);
}

function get_item_total_cancel(taxableamount) {
	var item_total_val = parseFloat($('#item_total').val()) - parseFloat(taxableamount);
	return item_total_val;
}

function get_item_tax_cancel(gstAmt) {
	var item_tax_val = parseFloat($('#item_tax').val()) - parseFloat(gstAmt);
	return item_tax_val;
}

function click_add_button() {

    var currentRowCount = $('#currentRowCount').val();
	$('.items').select2("destroy"); 
	/*
	if(currentRowCount == 1)       
	{
		$tr =$('#editable-sample').find('tbody').first();// $(this).closest('.tr_clone');
	}
	else{
		$tr =$('#editable-sample').find('tr').last();// $(this).closest('.tr_clone');
	}*/

	$tr =$('#editable-sample').find('tr').last();// $(this).closest('.tr_clone');
	//var clone = $tr.clone().appendTo("#editable-sample");
	
	return clone;
}

function clone_pre_row(tr) {

	var totalRows = $('#totalRows').val();
	var currentRowCount = $('#currentRowCount').val();

	var clone = tr.clone().appendTo("#editable-sample");

	var rowcounter = ++ currentRowCount;
	$('.items').select2();
	//clone.find('#productId').select2('val', '-1');
	clone.find('input').val('');
	clone.find('#rate').val('0.00');
	clone.find('#ratePre').val('0.00');
	clone.find('#quantity').val('1.00');
	clone.find('#quantityPre').val('0.00');
	clone.find('#taxable').val('0.00');
	clone.find('#taxablePre').val('0.00');
	clone.find('#gst').val('0.00');
	clone.find('#gstPre').val('0.00');
	clone.find('#gstAmt').val('0.00');
	clone.find('#gstAmtPre').val('0.00');
	clone.find('#rowCounter').val(rowcounter);
	clone.find('#hiddenCountVal').val(rowcounter);
	clone.find('#actionFlag').val('A');
	clone.find('.cancelBtn').attr('id', 'cancelBtn' + rowcounter);

	$('#totalRows').val(++totalRows);
	$('#currentRowCount').val(rowcounter);

	return clone;
}

function getInvoiceDetailsColumn(jrow)
{
	var invoiceDetails = {

		productId		: jrow.find('#productId'),
		item			: jrow.find('#item'),
		hsncode			: jrow.find('#hsncode'),
		preProductId	: jrow.find('#preProductId'),
		description		: jrow.find('#description'),
		rate			: jrow.find('#rate'),
		ratePre			: jrow.find('#ratePre'),
		quantity		: jrow.find('#quantity'),
		quantityPre		: jrow.find('#quantityPre'),
		taxable			: jrow.find('#taxable'),
		taxablePre		: jrow.find('#taxablePre'),
		gst				: jrow.find('#gst'),
		gstPre			: jrow.find('#gstPre'),
		gstAmt			: jrow.find('#gstAmt'),
		gstAmtPre		: jrow.find('#gstAmtPre'),
		rowCounter		: jrow.find('#rowCounter'),
		actionFlag		: jrow.find('#actionFlag'),
	};

	return invoiceDetails;
}