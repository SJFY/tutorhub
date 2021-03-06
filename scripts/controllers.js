'use strict';
angular.module('confusionApp')  
.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
  $scope.tab = 1;
  $scope.filtText = '';
  $scope.showMenu = false;
            $scope.message = "Loading ...";
     $scope.dishes= menuFactory.getDishes().query(
      function(response){
        $scope.dishes = response;
        $scope.showMenu = true;
      },
      function(response){
        $scope.message = "error:" + response.status +""+response.statusText;
      });
   
    

  
  //$scope.dishes = dishes;

  $scope.select = function(setTab) {
    $scope.tab = setTab;
    
    if (setTab === 2) {
      $scope.filtText = "appetizer";
    } 
    else if (setTab === 3) {
      $scope.filtText = "mains";
    }
    else if (setTab === 4) {
      $scope.filtText = "dessert";
    }
    else {
      $scope.filtText = "";
    }
  };
  
  $scope.isSelected = function (checkTab) {
    return ($scope.tab === checkTab);
  };


  $scope.showDetails = false;


$scope.toggleDetails = function() {
    $scope.showDetails = !$scope.showDetails;
};
}])

.controller('ContactController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                        var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
                        $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                                }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
                        $scope.sendFeedback = function() {
                                console.log($scope.feedback);
                                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")&& !$scope.feedback.mychannel) {
                                   $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;

                    feedbackFactory.getfeed().save($scope.feedback);
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                       agree:false, email:"" };
                    $scope.feedback.mychannel="";

                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

      //  .controller('DishDetailController', ['$scope', function($scope) {
        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
          $scope.sort='';
          $scope.showDish = true;
            $scope.message="Loading ...";
                        $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)});

        }])

         .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            //Step 1: Create a JavaScript object to hold the comment from the form
            $scope.customer = {author:"", rating:5, comment:"", date:""};
            
             $scope.submitComment = function () {
                 $scope.customer.date = new Date().toISOString();
                 console.log($scope.customer);
                         //Step 2: This is how you record the date
             
                
                // Step 3: Push your comment into the dish's comment array
               $scope.dish.comments.push($scope.customer);
               menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish)               
                //Step 4: reset your form to pristine
                 $scope.customer = {author:"", rating:5, comment:"",date:""};
                $scope.commentForm.$setPristine();
                
                //Step 5: reset your JavaScript object that holds your comment
           
            }

        }])

         .controller('IndexController',['$scope', 'menuFactory','corporateFactory', function($scope,menuFactory,corporateFactory){
             $scope.showDish = true;
                        $scope.message="Loading ...";
                        $scope.dish = menuFactory.getDishes().get({id:0});
                        $scope.promo = menuFactory.getPromotion().get({id:0});
                        $scope.chef = corporateFactory.getLeaders().get({id:0});
         }])

         .controller('AboutController',['$scope','corporateFactory',function($scope, corporateFactory){
            $scope.lead = corporateFactory.getLeaders().query();
         }])
;