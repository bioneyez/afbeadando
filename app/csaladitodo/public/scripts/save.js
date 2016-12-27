function confirm_modal(str)
{
    let _resolve, _reject;
    const $cmodal = $('.confirm-modal');

    $cmodal.modal('show');

    $cmodal.find('.modal-ok').on('click', function(e)
    {
        _resolve(true);
    });

    $cmodal.find('.modal-cancel').on('click', function(e)
    {
        _resolve(false);
    });

    return new Promise(function(resolve, reject)
    {
        _resolve = resolve;
        _reject = reject;
    });
}

$('#btnSave').on('click', function(e)
{
    e.preventDefault();

    var delUrl = $(this).attr('href');

    confirm_modal('Biztos törlöd a teendot?')
        .then(response =>
            {
                if (response)
                {
                  $('#editForm').unbind('submit').submit();
                }
            })
        .catch(reject => console.log('Sikertelen'));
});
