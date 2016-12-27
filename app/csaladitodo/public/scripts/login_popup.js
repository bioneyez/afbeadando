$('#btnLogin').on('click', function(e)
{
    e.preventDefault();

    let $modal = $('.modal');
    var hasModal = $modal.length;

    if(hasModal)
    {
        //Felhozzuk
        $modal.modal('show');

        return;
    }
    else
    {
        //Letrehozzuk
        $modal = $(`<div class="modal fade confirm-modal" tabindex="-1" role="dialog" id="loginModal">
                <div class="modal-dialog modal-md" role="document">
                    <div class="modal-content">
                    <div class="modal-header">Belépés</div>
                    <div class="modal-body">
                        <div class="alert alert-danger"></div>
                        <div class="form-area"></div>
                    </div>
                    </div>
                </div>
                </div>`);
    }

    var $formArea = $modal.find('.form-area');
    var $alertArea = $modal.find('.alert');
    $alertArea.hide();

    $formArea.load('/login #loginForm', function(e)
    {
        $modal.modal('show');

        var $loginForm = $modal.find('form');

        $loginForm.on('submit', function(e)
        {
            e.preventDefault();

            //AJAX
            console.log('AJAX kliensnel')

            const data = $(this).serializeArray();

            Promise.resolve(
                $.ajax(
                {
                    url: '/ajax/login',
                    method: 'POST',
                    data,
                    dataType: 'json',
                    headers: { 'csrf-token': $('[name="_csrf"]').val() }
                })
            ).then(j => 
            {
                if (j.success)
                {
                    $modal.hide('hide');
                    location.assign('/');
                }
                else
                {
                    //Hibauzenet
                }
            })
        })
    });
});
