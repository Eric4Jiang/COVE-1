cove.controller('New_dataset', function ($scope, $http, $compile, $rootScope, $routeParams) {
    $scope.suffix = '';
    $scope.target_id;
    $scope.dst_id;
    $scope.allTasksList;
    $scope.allTopicsList;
    $scope.allTypesList;
    $scope.allAnnotationsList;
    $scope.name = '';
    $scope.url = '';
    $scope.thumbnail = '';
    $scope.year = '';
    $scope.creator = '';
    $scope.description = '';
    $scope.size = '';
    $scope.num_cat = '';
    $scope.paper = '';
    $scope.keywords = [];
    $scope.topics = [];
    $scope.tasks = [];
    $scope.types = [];
    $scope.citations = [];
    $scope.conferences = [];
    $scope.annotations = [];
    $scope.institutions = [];
    $scope.$on('$viewContentLoaded', function(event){
        if($routeParams.identifier){
            $("#email_valid").modal('show');
        }
    });

    getallAttributes = function(){
        return ($http.get(HOME_URL).then(function(results) {
            $scope.allTasksList = results.data.tasks;
            $scope.allTopicsList = results.data.topics;
            $scope.allTypesList = results.data.types;
            $scope.allAnnotationsList = results.data.annotations;
        }))
    }

    $scope.initializeObj = function (allElems, selectedElems) {
        attrObj = [];
        for (var i = 0; i < allElems.length; i++){
            if (selectedElems.indexOf(allElems[i]) != -1){
                 attrObj.push({Element: allElems[i], Selected: true})   
            }
            else {
                attrObj.push({Element: allElems[i], Selected: false})         
            }                            
        }
        return attrObj;
    }

    $scope.name = '';
    $scope.url = '';
    $scope.thumbnail = '';
    $scope.year = '';
    $scope.creator = '';
    $scope.description = '';
    $scope.size = '';
    $scope.num_cat = '';
    $scope.paper = '';               
    $scope.keywords = [];
    $scope.topics = [];
    $scope.tasks = [];
    $scope.types = [];
    $scope.citations = [];
    $scope.conferences = [];
    $scope.annotations = [];
    $scope.institutions = [];   
    
    if($scope.r_type == 'edit') {        
        $http.get(DATASET_URL+'?id='+$scope.target_id).
            then(function(results) {
                $scope.name = results.data.name;
                $scope.url = results.data.url;
                $scope.thumbnail = results.data.thumbnail;
                $scope.year = results.data.year;
                $scope.creator = results.data.creator;
                $scope.description = results.data.description;
                $scope.size = results.data.size;
                $scope.num_cat = results.data.num_cat;
                $scope.paper = results.data.paper;
                                   
                if (results.data.keywords != '') {
                    $scope.keywords = results.data.keywords.split(', ');  
                }

                if (results.data.conferences != '') {
                     $scope.conferences = results.data.conferences.split(', ');                       
                }

               
                if (results.data.tasks != '') {
                    $scope.tasks = results.data.tasks.split(', ');          
                }

                if (results.data.topics != '') {
                     $scope.topics = results.data.topics.split(', ');                       
                }

                if (results.data.types != '') {
                     $scope.types = results.data.types.split(', ');                       
                }

                if (results.data.annotations != '') {
                     $scope.annotations = results.data.annotations.split(', ');                       
                }

                if (results.data.citations != []) {
                     $scope.citations = results.data.citations;                       
                }
  
                if (results.data.institutions != '') {
                     $scope.institutions = results.data.institutions.split(', ');                       
                }
                   
            })

        }
        
    getallAttributes().then(function(results) {
        $scope.allTasks = $scope.initializeObj($scope.allTasksList, $scope.tasks);
        $scope.allTopics = $scope.initializeObj($scope.allTopicsList, $scope.topics);
        $scope.allTypes = $scope.initializeObj($scope.allTypesList, $scope.types);
        $scope.allAnnotations = $scope.initializeObj($scope.allAnnotationsList, $scope.annotations);
    })          
                           
    $scope.add = function (attr, entry, id) {  
        var flag = false;
        if (id == 'new_task') {
            elements = $scope.allTasksList;  
            flag = true;
                            
        }
        else if (id == 'new_topic') {
            elements = $scope.allTopicsList;  
            flag = true;
        }
        
        else if (id == 'new_type') {
            elements = $scope.allTypesList;   
            flag = true;
        }
        
        else if (id == 'new_annot') {
            elements = $scope.allAnnotationsList; 
            flag = true;
        }
        
        else {
            elements = attr;        
        }
        
        if(entry == '' || entry == null){
            $("#messagegoeshere_"+id).empty();
            $("<p>Entry cannot be blank.</p>"
              ).addClass("text-warning").appendTo("#messagegoeshere_"+id);
            $('#'+id).val('');
            $('#'+id).trigger('input');
        }

        else if(elements.indexOf(entry) != -1){
            $("#messagegoeshere_"+id).empty()
            $("<p>Duplicate entry.</p>"
              ).addClass("text-warning").appendTo("#messagegoeshere_"+id);       
            $('#'+id).val('');
            $('#'+id).trigger('input');
        }
        
        else {
            $("#messagegoeshere_"+id).empty()
            if (flag) {
                elements.push(entry);                 
                attr.push({Element: entry, Selected: true});                      
            }
            else{
                attr.push(entry);
            }
            $('#'+id).val('');
            $('#'+id).trigger('input');
        }
    };
                
    $scope.del = function(attr,i){
        attr.splice(i,1);
    };

    $scope.setChecked = function (attr, entry) {
        if (attr.indexOf(entry) == -1) {
            return false;    
        }    
        else{
            return true;    
        }
    };

    $scope.validate = function(){
        $("#messagegoeshere_validate").empty();
        var email = $('#email').val();
        var hashed_str = $routeParams.identifier.split("$");
        $scope.target_id = hashed_str[0];
        $scope.suffix = hashed_str[1];
        if (/add_dataset/.test(window.location.href)){
            $scope.r_type = 'add';          
        }
        else{
            $scope.r_type = 'edit';        
        }
        var target_url = NEW_DATASET_URL + '?email=' + email + '&rqst_id=' + $scope.target_id +'&suffix=' + $scope.suffix;
        $http.get(target_url)
                .success(function(results){
                    $('#email_input').val(email);           
                    $("#email_valid").modal('hide');
                    $('#new_dst_form').show();
                    $scope.load_data(results);
                })
                .error(function(error){
                     $("<p>Please enter a valid email.</p>"
                        ).addClass("text-warning").appendTo("#messagegoeshere_validate");
                })
    };
        
    $scope.load_data = function(results){
        $scope.dst_id = results.data.id;
        $scope.name = results.data.name;
        $scope.url = results.data.url;
        $scope.thumbnail = results.data.thumbnail;
        $scope.year = results.data.year;
        $scope.creator = results.data.creator;
        $scope.description = results.data.description;
        $scope.size = results.data.size;
        $scope.num_cat = results.data.num_cat;
        $scope.paper = results.data.paper;
                           
        if (results.data.keywords != '') {
            $scope.keywords = results.data.keywords.split(', ');  
        }

        if (results.data.conferences != '') {
             $scope.conferences = results.data.conferences.split(', ');                       
        }
        if (results.data.tasks != '') {
            $scope.tasks = results.data.tasks.split(', ');          
        }

        if (results.data.topics != '') {
             $scope.topics = results.data.topics.split(', ');                       
        }

        if (results.data.types != '') {
             $scope.types = results.data.types.split(', ');                       
        }

        if (results.data.annotations != '') {
             $scope.annotations = results.data.annotations.split(', ');                       
        }

        if (results.data.citations != []) {
             $scope.citations = results.data.citations;                       
        }

        if (results.data.institutions != '') {
             $scope.institutions = results.data.institutions.split(', ');                       
        }

        getallAttributes().then(function(results) {
            $scope.allTasks = $scope.initializeObj($scope.allTasksList, $scope.tasks);
            $scope.allTopics = $scope.initializeObj($scope.allTopicsList, $scope.topics);
            $scope.allTypes = $scope.initializeObj($scope.allTypesList, $scope.types);
            $scope.allAnnotations = $scope.initializeObj($scope.allAnnotationsList, $scope.annotations);
        })
    };

    $scope.submit_new_dst = function(){
        $("#messagegoeshere_submit").empty();
        var dict = {};
        var contactor = $('#email_input').val();
        var dst_name = $('#dst_name').val();
        var url = $('#dst_url').val();
        var year = $('#dst_year').val();
        var description = $('#dst_description').val();
        if(!contactor || !dst_name || !url || !description || !year){
            $("<p>Please Enter All Required Fields.</p>"
                        ).addClass("text-warning").appendTo("#messagegoeshere_submit");
            return;
        }
        
        getCheckedElems = function(attrList) {
            checkedElems = [];
            for (var i = 0; i < attrList.length; i++) {
                if (attrList[i].Selected){
                    checkedElems.push(attrList[i].Element);
                 }
            }
            return checkedElems;
        }
        $scope.tasks = getCheckedElems($scope.allTasks);
        $scope.topics = getCheckedElems($scope.allTopics);
        $scope.types = getCheckedElems($scope.allTypes);
        $scope.annotations = getCheckedElems($scope.allAnnotations);
        var dict = {
            "email" : contactor,
            "target_id" : $scope.target_id,
            "dst_id" : $scope.dst_id,
            "suffix" : $scope.suffix,
            "name" : dst_name,
            "url" : $('#dst_url').val(),
            "thumbnail" : $('#dst_thumbnail').val(),
            "description" : $('#dst_description').val(),
            "license" : "",
            "is_local" : false,
            "creator" : $('#dst_author').val(),
            "year" : $('#dst_year').val(),
            "size" : $('#dst_size').val(),
            "num_cat" : $('#dst_numcat').val(),
            "contact_name" : "",
            "contact_email" : contactor,
            "related_paper" : $('#dst_paper').val(),
            "tasks" : $scope.tasks,
            "topics" : $scope.topics,
            "datatypes" : $scope.types,
            "annotations" : $scope.annotations,
            "keywords" : $scope.keywords,
            "citations" : $scope.citations,
            "conferences" : $scope.conferences,
            "institutions" : $scope.institutions
        };
        var displayMessage = '';
        if ($scope.r_type == 'add'){
            console.log('here1');
            displayMessage += "<p>Your dataset has been successfully submitted. We will review it and add it to COVE. Thank you!</p>";
        }
        else {
            console.log('here2');
            displayMessage += "<p>Your edits have been successfully submitted. We will review them and modify the dataset on COVE. Thank you!</p>";
        } 
        console.log(displayMessage);
        var r = confirm("Are you sure you want to submit this dataset? Once successfully submitted, this link will be invalidated.");
        if(r){
            $http({
                url : NEW_DATASET_URL,
                method : "POST",
                data : JSON.stringify(dict),
                headers: {'Content-Type':'application/json; charset=UTF-8'}
            }).success(function(data){
                $(displayMessage).addClass("text-success").appendTo("#messagegoeshere_submit");
                $('#dst_description').val('');
                $('input[id^="dst_"]').each(function(){
                    $(this).val('');
                })
                $('#send_new_dst').attr("disabled", true);
            }).error(function(error){
                $("<p>" + error['error'] +"</p>"
                            ).addClass("text-warning").appendTo("#messagegoeshere_submit");
            })
        }
    };
})