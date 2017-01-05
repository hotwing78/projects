$(function() {
    //This is the Morphii data to send with 'POST'
    let morphiiInfo = {
        media: null,
        question: '',
        title: '',
        description: '',
        morphiiSelect: [],
    };

    //Set up the morphii widget options
    let options = {
        div_id: 'morphiiWidget',
        client_key: '47941407-64f1-4ca2-a895-1aeb136ac04d',
        account_id: '15553530',
        morphii: {
            ids: []
        },
        user: {
            anonymous: true
        },
        target: {
            id: 'target_id',
        },
        comment: {
            show: true,
            required: false,
            label: 'Leave a comment:'
        },
        submit_button: {
            show: false
        },
        options: {
            stage: 'test'
        },
        error_callback: function(err) {
            console.log('Error callback: ' + JSON.stringify(err, null, 2));
        },
        submit_callback: function(data) {
            console.log('Submit callback: ' + JSON.stringify(data, null, 2));
        }
    };

    let baseURL = 'https://api-dev.morphii.com/morphii/v1/groups/Core%20Morphiis';
    let media = document.getElementsByName('media');
    let isTextArea = false;

    //Set up the preview button to render the preview page

    let previewButton = document.getElementsByClassName('finish');
    previewButton[0].addEventListener('click', previewRender);
    $('#previewSubmit').hide();

    //Initialize the bootstrapWizard
    $('#rootwizard').bootstrapWizard({
        onTabShow: function(tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index + 1;
            var $percent = ($current / $total) * 100;
            $('#rootwizard .progress-bar').css({
                width: $percent + '%'
            });
        }
    }); //End of Initialization

    $.ajax({
        type: "GET",
        url: baseURL,
        dataType: 'json',
        contentType: 'application/json',

        success: function(morphiis) {
            // Sort the morphii records by name.
            morphiis.records.sort(function(a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });

            let morphiiList = document.getElementById('morphii-list');
            //Page set up for Morphii select
            morphiiList.innerHTML = '';
            for (let i = 0; i < morphiis.records.length; i++) {

                // load morphiis into options
                options.morphii.ids.push({
                    id: morphiis.records[i].id,
                    name: morphiis.records[i].name
                });

                // Create the div for the morphii image and add to the morphii container.
                let col = document.createElement('div');
                let choice = document.createElement('div');
                let input = document.createElement('input');
                let icon = document.createElement('div');
                let morphiiImage = document.createElement('img');
                let h6 = document.createElement('span');

                //set the attributes for the containers
                col.setAttribute('class', "col-sm-4");
                choice.setAttribute('class', 'choice active');
                choice.setAttribute('data-toggle', 'wizard-checkbox');
                icon.setAttribute('class', 'icon');
                input.setAttribute('type', 'checkbox');
                input.setAttribute('data-type-id', morphiis.records[i].id);
                input.setAttribute('value', morphiis.records[i].name);
                input.setAttribute('checked', 'checked');
                morphiiImage.setAttribute('src', morphiis.records[i].staticUrl);
                h6.innerHTML = morphiis.records[i].name;
                choice.addEventListener('click', morphiiSelected);

                //append the containers to morhpiilist
                icon.appendChild(morphiiImage);
                choice.appendChild(input);
                choice.appendChild(icon);
                choice.appendChild(h6);
                col.appendChild(choice);
                morphiiList.appendChild(col);
            }

        }

    }); //End of morphii ajax call

    //set up for step 2
    let title = document.getElementById('tab2').querySelector('h3');
    let step2 = document.getElementById('tab2').querySelector('div');
    let input = document.createElement('input');
    let h3 = document.createElement('h4');
    let pic = document.createElement('div');
    let preImage = document.createElement('img');

    input.setAttribute('class', 'form-control pane2Input');
    pic.setAttribute('class', 'picture');


    //Loop of radio button media choices
    for (var i = 0; i < media.length; i++) {
        media[i].onclick = function() {
                console.log(step2);
                step2.innerHTML = '';
                //input.unbind('change', handleImage);
                //Handle the image select render
                if (this.value === 'image') {
                    isTextArea = false;
                    console.log('image');
                    let drop = document.createElement('div');
                    let img = document.createElement('img');
                    drop.setAttribute('class', 'uploader');
                    drop.setAttribute('onclick', "$('#media').click()");
                    img.setAttribute('src', ' ');
                    title.innerHTML = 'What image would you like to use?'
                    h3.innerHTML = 'Click here or drag your image here'
                    input.setAttribute('type', 'file');
                    input.setAttribute('id', 'media');
                    input.setAttribute('accept', 'image/*');
                    input.addEventListener('change', handleImage, false);
                    drop.appendChild(h3);
                    drop.appendChild(img);
                    drop.appendChild(input);
                    step2.appendChild(drop);


                    //Handle the video select render
                } else if (this.value === 'video') {
                    isTextArea = false;
                    title.innerHTML = 'Which YouTube video would you like to use?';
                    h3.innerHTML = 'YouTube URL';
                    input.setAttribute('type', 'text');
                    input.setAttribute('id', 'media');
                    input.setAttribute('placeholder', 'http//...');
                    pic.appendChild(h3);
                    pic.appendChild(input);
                    step2.appendChild(pic);

                    //Handle the text select render
                } else if (this.value === 'text') {
                    isTextArea = true;
                    title.innerHTML = 'What text would you like people to react to?'
                    let text = document.createElement('textarea');
                    text.setAttribute('id', 'media');
                    step2.appendChild(text);

                    //Handle the Web page select render
                } else {
                    isTextArea = false;
                    title.innerHTML = 'Which web page would you like to use?';
                    h3.innerHTML = 'Web Page URL';
                    input.setAttribute('type', 'text');
                    input.setAttribute('id', 'media');
                    input.setAttribute('placeholder', 'http//...');
                    pic.appendChild(h3);
                    pic.appendChild(input);
                    step2.appendChild(pic);
                }
            } //End of onclick function
    } //End of for loop to handle render

    //Drag and drop methods and variables

    function handleImage(e) {
        event.preventDefault();
        event.stopPropagation();
        console.log(e.target.files[0]);
        console.log(event.target.result);

        var reader = new FileReader();
        reader.onload = function(event) {
            console.log('The files ' + e.target.files);
            console.log(event.target);
            event.preventDefault();
            event.stopPropagation();
            morphiiInfo.media = event.target.result;
            let previewPanel = document.getElementById('previewContainment');
            $('.uploader img').attr('src', event.target.result);
            $('#preImage').attr('src', event.target.result);
            preImage.setAttribute('src', event.target.result);
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    //Video URL breakdown
    function getId(url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);

        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return 'error';
        }
    }
    //handles the morphii selection
    function morphiiSelected() {
        event.preventDefault();
        //Removes Morphii from selection
        if ($(this).hasClass('active')) {
            //find the index of the morphii to remove
            let info = this.childNodes[2].childNodes[0].data;

            $(this).removeClass('active');
            $(this).find('[type="checkbox"]').removeAttr('checked');
            options.morphii.ids = options.morphii.ids.filter(function(element, index, array) {
                return element.name !== info;
            });
            console.log(options.morphii.ids);
            //Selects the Morphii
        } else {
            let checkboxId = this.querySelector('input').getAttribute('data-type-id');
            $(this).addClass('active');
            $(this).find('[type="checkbox"]').attr('checked', 'true');
            options.morphii.ids.push({
                id: checkboxId,
                name: this.childNodes[2].childNodes[0].data
            });
            console.log(options.morphii.ids);

        }
    } //End of morphiiSelect()

    //Handle render of preview panel
    function previewRender() {
        event.preventDefault();
        $('#previewSubmit').show();
        let selectedMedia = null;
        let mediaContainer = document.createElement('div');
        let h3 = document.createElement('h3');
        let morphiiContainer = document.createElement('div');
        let description = document.createElement('h4');
        let title = document.createElement('h1');
        //Grab the container
        let previewPanel = document.getElementById('previewContainment');
        previewPanel.innerHTML = '';
        //Gather the data to render
        morphiiInfo.question = document.getElementById('morphiiQuestion').value;
        morphiiInfo.media = document.getElementById('media').value;

        morphiiInfo.title = document.getElementById('title').value;
        morphiiInfo.description = document.getElementById('description').value;

        //Create container dependent on tab1 radio selection
        if ($("input:radio[name='media']:checked").val() === 'image') {
            // selectedMedia = document.createElement('img');
            // selectedMedia.setAttribute('src', morphiiInfo.media);
            preImage.style = 'display:block; align-self:center;';
            options.target.type = 'image';
        } else if ($("input:radio[name='media']:checked").val() === 'text') {
            selectedMedia = document.createElement('p');
            selectedMedia.innerHTML = morphiiInfo.media;
            options.target.type = 'text';
        } else {
            let videoId = getId(morphiiInfo.media);
            selectedMedia = document.createElement('iFrame');
            selectedMedia.setAttribute('class',"embed-responsive-item");
            selectedMedia.setAttribute('src', 'https://www.youtube.com/embed/' + videoId);
            options.target.type = 'video';
        }


        morphiiContainer.setAttribute('id', 'morphiiWidget')

        h3.style = 'display: flex; justify-content:center;';
        mediaContainer.style = 'display:flex; justify-content:center;'

        h3.innerHTML = morphiiInfo.question;
        options.target.metadata = {
            question: morphiiInfo.question,
            media: morphiiInfo.media,
            title: morphiiInfo.title,
            description: morphiiInfo.description
        };


        title.style = 'display: flex; justify-content:center;';
        title.innerHTML = morphiiInfo.title;
        description.style = 'display: flex; justify-content:center';
        description.innerHTML = morphiiInfo.description;

        if ($("input:radio[name='media']:checked").val() === 'image') {
            mediaContainer.appendChild(preImage);
        } else {
            mediaContainer.appendChild(selectedMedia);
        }
        previewPanel.appendChild(title);
        previewPanel.appendChild(description);
        previewPanel.appendChild(mediaContainer);
        previewPanel.appendChild(h3);
        previewPanel.appendChild(morphiiContainer);

        let widget = MorphiiWidgets.BasicWidget();
        widget.init(options, function(error, results) {
            if (error) {
                console.log('Error intializing: ' + JSON.stringify(error, null, 2));
            } else {
                console.log('Initialized:' + JSON.stringify(results, null, 2));
            }
        });



    }; //End of previewRender()

    function resizePanels() {
        var maxHeight = 0;
        $('.panelContainer').each(function() {
            maxHeight = Math.max(maxHeight, $(this).height());
        });
        $('.panelContainer').css({
            height: maxHeight + 10 + 'px'
        });
    }


    /*
     $( window ).resize(function() {
        resizePanels();
    });

    $(document).ready(function() {
        resizePanels();
    })

    $('li.finish').click(function() {
        resizePanels();
    })
    */



}); //End of app.js
